const mongoose = require('mongoose');
const validateMongodb_id = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error('This ID is not found');
    }
};

module.exports = {validateMongodb_id};