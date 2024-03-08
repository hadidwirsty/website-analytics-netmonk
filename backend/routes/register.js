const express = require('express');

const router = express.Router();
const registerController = require('../controllers/registerController');

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registers a new user
 *     tags:
 *      - Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *               teamName:
 *                 type: string
 *                 description: Name of the user's team
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New user <username> created!
 *       400:
 *         description: Bad Request - Missing username or password
 *       409:
 *         description: Conflict - Username already exists
 */
router.post('/register', registerController.handleNewUser);

module.exports = router;
