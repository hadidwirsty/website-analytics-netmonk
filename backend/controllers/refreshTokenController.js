const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
  try {
    const { cookies } = req;
    if (!cookies?.jwt) return res.status(401).json({ error: 'No refresh token cookie' });

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const validRefreshTokenIndex = foundUser.refreshToken.indexOf(refreshToken);
    if (validRefreshTokenIndex === -1) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

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
        {
          id: foundUser._id,
          username: foundUser.username,
          roles: foundUser.role,
          teamName: foundUser.teamName
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken.splice(validRefreshTokenIndex, 1, newRefreshToken);
      await foundUser.save();

      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { handleRefreshToken };
