const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const video1 = new mongoose.Schema({
  Title: {
    type: String,
  },
  Rating: {
    type: String,
  },
  Subscribe: {
    type: String,
  },
  Categoires: {
    type: String,
  },
  SubCategoires: {
    type: String,
  },
  Discription: {
    type: String,
  },
  Contract: {
    type: String,
  },
  Trailer_time: {
    type: String,
  },
  Video_time: {
    type: String,
  },
  Country: {
    type: String,
  },
  Cast: {
    type: String,
  },
  Publish: {
    type: String,
  },
  image_user: {
    type: String,
  },
  Trailer_video: {
    type: String,
  },
  banner_video: {
    type: String,
  },
  // User_Id: {
  //   type: Schema.ObjectId,
  // },
});
const video = new mongoose.model("video", video1);
module.exports = video;
