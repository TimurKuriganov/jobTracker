const express = require('express');
const { signupUser, login } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', login);

module.exports = router;
