const express = require('express');
const { registerUser, loginuser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginuser);

module.exports = router;