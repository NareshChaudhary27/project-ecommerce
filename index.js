const express = require('express');
const dbconnect = require('./config/dbconnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute');

dbconnect();

app.use('/', (req,res) => {
    res.send('Hello World');
}); 

app.use('api/user', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});