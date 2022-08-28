const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

const Countrycode = new mongoose.Schema({
  
    country_code:
    {
        type:String
    },
    latitude:
    {
        type:String
    },
    longitude:
    {
        type:String
    },
    country:
    {
        type:String
    },
    usa_state_code:
    {
        type:String
    },
    usa_state_latitude:
    {
        type:String
    },
    usa_state_longitude:
    {
        type:String
    },
    usa_state:
    {
        type:String
    }   
   
})
const Country = new mongoose.model("Countrycode",Countrycode);
module.exports = Country;