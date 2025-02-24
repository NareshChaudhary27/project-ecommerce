const { generateToken } = require('../config/jwtToken.js');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const { validateMongodb_id } = require('../utils/validateMongodb_id.js');

// Create a new user
 const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
        // res.send('User created successfully');
    }
    else{
        // User already exists
        throw new Error('User already exists');
    }
 });

// Login a user
 const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body; 
    // console.log(email, password);
    // check if user exists or not
    const findUser = await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.json({
            _id: findUser._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            role: findUser?.role,
            token: generateToken(findUser._id),
        });
    }
    else{
        throw new Error("Invaild Credentials");
    }
 });



 // update a user
 const updateUser = asyncHandler(async (req,res) => {
    const {_id} = req.user;
    validateMongodb_id(_id);
    try{
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,

        },{
            new : true,
        });
        res.json(updateUser);
    } catch(error){
        throw new Error(error);
    }
 })

 // get all users
 const getallUser = asyncHandler(async (req,res) => {
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }
    catch(error){
        throw new Error(error);
    }
 })

 // get a single user
 const getSingleUser = asyncHandler(async (req,res) => {
        const {id} = req.params;
        validateMongodb_id(id);
        try{
            const getaUser = await User.findById(id);
            res.json({
                getaUser
        });  
        } catch(error){
            throw new Error(error);
        }
});

// Delete a user
const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongodb_id(id);
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    } catch(error){
        throw new Error(error);
    }
});

// Block a user
const blockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongodb_id(id);
    try{
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, {
            new: true,
        });
        res.json({
            message: "User is blocked",
        });
    } catch(error){
        throw new Error(error);
    }
});


// Unblock a user
const unblockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongodb_id(id);
    try{
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, {
            new: true,
        });
        res.json({
            message: "User is unblocked",
        });
    } catch(error){
        throw new Error(error);
    }
});



 module.exports = {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getSingleUser, 
    deleteUser, 
    updateUser,
    blockUser,
    unblockUser
};