const express = require('express');

const router = express.Router();

/**
 * @openapi
 * /validate-token:
 *   get:
 *     summary: Validates the JWT token
 *     tags:
 *      - Test Token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *       401:
 *         description: Unauthorized - Token is invalid or missing
 */
router.get('/validate-token', (req, res) => {
  res.json({ message: 'Token is valid' });
});

module.exports = router;
