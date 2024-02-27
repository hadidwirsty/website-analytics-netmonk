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

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const metabase_key = process.env.METABASE_KEY;
    // Create JWTs
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
      { expiresIn: '7200' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');
        // Clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    console.log(result);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: false, // If in the development stage change it to false, after that it can be changed to true
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Construct the response body
    const responseBody = {
      id: foundUser._id.toString(),
      username: foundUser.username,
      role: foundUser.role,
      teamName: foundUser.teamName,
      metabase_key: metabase_key,
      accessToken: accessToken,
    };

    // Send authorization response body to user
    res.json(responseBody);
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
