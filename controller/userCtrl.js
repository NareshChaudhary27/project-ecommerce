const { generateToken } = require('../config/jwtToken.js');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

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
            token: generateToken(findUser._id),
        });
    }
    else{
        throw new Error("Invaild Credentials");
    }
 });


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
        try{
            const getaUser = await User.findById(id);
            res.json({
                getaUser
        });  
        } catch(error){
            throw new Error(error);
        }
});



 module.exports = {createUser, loginUserCtrl, getallUser, getSingleUser};