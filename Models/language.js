const mongoose = require ("mongoose");
const language1 = new mongoose.Schema({
    
    language:{
        type:String
    },
    
   
})
const language2 = new mongoose.model("Language",language1);
module.exports = language2;



