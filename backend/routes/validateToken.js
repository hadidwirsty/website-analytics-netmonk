const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
