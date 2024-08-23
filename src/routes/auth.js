const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

// New user signup
router.post('/signup', authController.signUp);

module.exports = router;