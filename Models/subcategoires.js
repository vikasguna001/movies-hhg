const mongoose = require ("mongoose");

const subcategoires1 = new mongoose.Schema({
    category:{
        type:String
    },
    subcategorie:{
        type:String
    },
    image_user:
    {
        type:String
    },
    description:{
        type:String
    }
})
const subcategoires = new mongoose.model("SubCategories",subcategoires1);
module.exports = subcategoires;
