const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);

  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  try {
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: 'Username not found!' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: 'Please enter the correct password!' });
    }

    const metabase_key = process.env.METABASE_KEY;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          username: foundUser.username,
          roles: foundUser.role,
          teamName: foundUser.teamName,
        },
        metabase_key: metabase_key,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    console.log(result);

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: false, // Development secure it is false
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const responseBody = {
      id: foundUser._id.toString(),
      username: foundUser.username,
      role: foundUser.role,
      teamName: foundUser.teamName,
      metabase_key: metabase_key,
      accessToken: accessToken,
    };

    res.json(responseBody);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { handleLogin };
