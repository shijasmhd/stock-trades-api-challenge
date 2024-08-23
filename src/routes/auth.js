const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();
const validate = require('../middlewares/validator');
const { userSchema } = require('../validations/validations.js');

// New user signup
router.post('/signup', validate(userSchema), authController.signUp);

// Existing user login
router.post('/login', validate(userSchema), authController.logIn);

// For access token
router.post('/token', authController.validateToken);

module.exports = router;