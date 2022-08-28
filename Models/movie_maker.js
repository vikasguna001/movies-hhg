const mongoose = require ("mongoose");
// import validator from 'validator';
const validator = require('validator');

// Mukunj schema start
const movie_makers1 = new mongoose.Schema({
    sid:
    {
        type:Number
    },
    First_Name:{
        type:String,
        required:true
    },
    Last_Name:{
        type:String,
        required:true

    },
    User_Name:
    {
        type:String,
        unique:true,
        required:true
        
    },
    Mobile_no:{
        type:String,
        unique:true,
        required:true
    },
    Email:
    {
        type:String,
        index: {
            unique: true,
        },
        required:true,
        trim: true,
    },
    Password:
    {
        type:String,
        // unique:true

    }
   
})
const movie_makers = new mongoose.model("movie_maker",movie_makers1);
module.exports = movie_makers;

// mukunj schema end