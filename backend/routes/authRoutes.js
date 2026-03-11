const express = require('express');
const { validateLogin, validateRegister } = require('../middleware/validation');
const { login, register } = require('../controllers/authController');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;

