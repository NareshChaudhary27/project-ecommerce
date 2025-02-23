const express = require('express');
const { createUser, loginUserCtrl, getallUser, getSingleUser } = require('../controller/userCtrl');
const router = express.Router();

// Register User
router.post('/register',createUser);

// Login User
router.post('/login', loginUserCtrl);

// Get all users
router.get('/all-users', getallUser);

// Get a single user
router.get('/:id', getSingleUser);

module.exports = router;