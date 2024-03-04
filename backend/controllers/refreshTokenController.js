const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(401); // No refresh token cookie

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403); // Forbidden
      console.log('attempted refresh token reuse!');

      const hackedUser = await User.findOne({
        username: decoded.username
      }).exec();
      hackedUser.refreshToken = [];

      const result = await hackedUser.save();
      console.log(result);
    });
    return res.sendStatus(403); // Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log('expired refresh token');
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
      console.log(result);
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: false // Development secure it is false
      });
      return res.sendStatus(403);
    }

    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          username: foundUser.username,
          roles: foundUser.role,
          teamName: foundUser.teamName
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username, roles: foundUser.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = foundUser.refreshToken
      .filter((rt) => rt !== refreshToken)
      .concat(newRefreshToken);
    await foundUser.save();

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: false, // Development it is false
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      id: foundUser._id.toString(),
      username: foundUser.username,
      role: foundUser.role,
      teamName: foundUser.teamName,
      accessToken
    });
  });
};

module.exports = { handleRefreshToken };
