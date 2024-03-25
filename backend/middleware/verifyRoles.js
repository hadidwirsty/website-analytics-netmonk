const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(403); // 403 Forbidden
    const userRole = req.roles;
    const isAllowed = allowedRoles.includes(userRole);
    if (!isAllowed) return res.sendStatus(403); // 403 Forbidden
    next();
  };
};

module.exports = verifyRoles;
