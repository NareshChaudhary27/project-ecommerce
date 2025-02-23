const jwt = require('jsonwebtoken');


// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "3d" });
};

module.exports = {generateToken};