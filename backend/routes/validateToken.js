const express = require('express');

const router = express.Router();

router.post('/validate-token', (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
