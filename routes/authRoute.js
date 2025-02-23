const express = require('express');
const { createUser, loginUserCtrl } = require('../controller/userCtrl');
const router = express.Router();

// Register User
router.post('/register',createUser);

// Login User
router.post('/login', loginUserCtrl);


module.exports = router;