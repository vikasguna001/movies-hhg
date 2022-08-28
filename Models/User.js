const mongoose = require ("mongoose");
const user = new mongoose.Schema({
    
    User_Name:{
        type:String,
        require:true
    },
    Mobile_No:{
        type:Number,
        require:true
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
        require:true

    },

    Mobile_No:{
        type:String,
    }

})
const User = new mongoose.model("User",user);
module.exports = User;