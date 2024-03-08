const express = require('express');

const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @openapi
 * /logout:
 *   get:
 *     summary: Logout the current user
 *     tags:
 *      - Logout
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized - User not logged in
 */
router.get('/logout', logoutController.handleLogout);

module.exports = router;
