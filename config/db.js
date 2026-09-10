const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("DATABASE CONNECTED SUCCESSFULLY");
    } 
    catch(error){
        console.log("DATABASE CONNECTION FAILED: ",error);
        process.exit(1);
    }
}

module.exports = connectDB;