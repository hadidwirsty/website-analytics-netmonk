const express = require('express');

const router = express.Router();

router.get('/validate-token', (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
