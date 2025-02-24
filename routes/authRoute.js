const express = require('express');
const { createUser, loginUserCtrl, getallUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Register User
router.post('/register',createUser);

// Login User
router.post('/login', loginUserCtrl);

// Update User
router.put('/edit-user',authMiddleware, updateUser);

// Block a user
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser);

// Unblock a user
router.put('/unblock-user/:id',authMiddleware, isAdmin, unblockUser);

// Get all users
router.get('/all-users', getallUser);

router.get('/:id', authMiddleware, isAdmin, getSingleUser);

// Get a single user
router.get('/:id', getSingleUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;