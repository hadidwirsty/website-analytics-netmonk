const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Login user
 *     tags:
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 teamName:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/auth', authController.handleLogin);

module.exports = router;
