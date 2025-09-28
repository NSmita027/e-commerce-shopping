const express = require('express');
const {auth, isAdmin} = require('../middleware/authmiddleware');
const {getme, updateProfile, changePassword, getAllUsers} = require ('../controllers/userController');

const router = express.Router();


router.get("/me", auth, getme);                       // already worked
router.put("/me", auth, updateProfile);               // update name/email
router.put("/me/password", auth, changePassword);     // change password
router.get('/users', auth, isAdmin, getAllUsers);     // Admin-only route

module.exports = router;