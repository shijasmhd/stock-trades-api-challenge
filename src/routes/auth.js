const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

// New user signup
router.post('/signup', authController.signUp);

// Existing user login
router.post('/login', authController.logIn);

// For access token
router.post('/token', authController.validateToken);

module.exports = router;