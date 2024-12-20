const mongoose = require('mongoose');
module.exports = function ConnectDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Successfully connect to MongoDB.");
        return true;
    })
    .catch(err => {
        console.error("Connection error", err);
        return false;
    });
}