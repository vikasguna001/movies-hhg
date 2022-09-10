//vikas Schema start
const mongoose = require ("mongoose");

const category1 = new mongoose.Schema({
    category:{
        type:String
    },
    Description:{
        type:String
    },
    image_user:
    {
        type:String
    }


    
   
})
const Categoires = new mongoose.model("category",category1);
module.exports = Categoires;

