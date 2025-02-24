const mongoose = require('mongoose'); // Erase if already required
const bcrycpt = require('bcryptjs');


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart:{
        type:Array,
        default:[],
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    }],
    wishlist: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
},{
    timestamps:true,
});


// Hash the password before saving the user
userSchema.pre('save', async function(next){
    const salt = await bcrycpt.genSalt(10);
    this.password = await bcrycpt.hash(this.password, salt);
});

// Check if the password matches the hashed password
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrycpt.compare(enteredPassword, this.password);
}


//Export the model
module.exports = mongoose.model('User', userSchema);