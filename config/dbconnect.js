const { default: mongoose } = require("mongoose")

// Database Connection
const dbconnect = () => {
    try{
    const connect = mongoose.connect(process.env.MONGODB_URL);
    console.log('Database Connected Sucessfully');
    } catch (error) {
        console.log("Database Error",error);
    }
};

module.exports = dbconnect;