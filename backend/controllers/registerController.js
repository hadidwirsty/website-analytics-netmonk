const User = require('../model/User');
const ROLES_LIST = require('../config/roles_list');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password, teamName, role } = req.body;

  if (!username || !password || !role)
    return res
      .status(400)
      .json({ message: 'Username, password, and role are required.' });

  const roleValue = ROLES_LIST[role];
  if (!roleValue) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      username: username,
      password: hashedPwd,
      teamName: teamName,
      role: roleValue,
    });

    console.log(result);

    res
      .status(201)
      .json({ success: `New user ${username} with role ${role} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
