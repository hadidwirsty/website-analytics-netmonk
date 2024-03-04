const User = require('../model/User');

const handleLogout = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false }); // Development secure it is false
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false }); // Development secure it is false
  res.sendStatus(204);
};

module.exports = { handleLogout };
