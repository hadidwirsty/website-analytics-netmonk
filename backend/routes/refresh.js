const express = require('express');

const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @openapi
 * /refresh:
 *   get:
 *     summary: Refreshes the access token using a refresh token
 *     tags:
 *      - Refresh
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 expiresIn:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid refresh token
 */
router.get('/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;
