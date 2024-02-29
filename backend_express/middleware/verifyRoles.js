const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const userRole = req.roles;
    const isAllowed = allowedRoles.includes(userRole);
    if (!isAllowed) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
