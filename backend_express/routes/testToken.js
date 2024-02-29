const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', verifyJWT, (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
