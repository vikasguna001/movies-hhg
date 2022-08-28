var express = require("express");
var router = express.Router();
const multer = require("multer");
// const formidable = require('formidable');
// const { IncomingForm } = require('formidable');
var BannerController = require("../contro/bencontro");



//jwt ...
const jwt = require("jsonwebtoken");
const jwtkey = "movies-hhg";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  // console.log("call...", token);

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide valid token" });
      } else {
        next()
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
};
 
// image multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    // const form = new IncomingForm(formidable);

    if (file.fieldname === "banner_video") {
      console.log(file, "ddd");
      cb(null, "./upload/banner_video/");
    } else 
    if (file.fieldname === "Trailer_video") {
      console.log(file, "ddd");
      cb(null, "./upload/Trailer_video/");
    } else 
    if (file.mimetype === ("image/jpeg" || "image/png" || "image/jpg")) {
      cb(null, "./upload/image/");
    } else {
      cb(null, "./upload/image/");
    }
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

router.get("/", function (req, res, next) {
  res.render("benner", { title: "Wel come to benner.js" });
});

//video api start
router.get("/vifinddata",verifyToken, BannerController.vifind_data);
router.get("/vifinddata/:id",verifyToken, BannerController.vifind_data_Id);
router.post("/viInsertBanner",verifyToken, upload.any(), BannerController.viinsert_data);
router.post("/viUpdateBanner",verifyToken, upload.any(), BannerController.viUpdate_data);
router.delete( "/viDeleteBanner/:id",verifyToken,upload.any(),BannerController.viDelete_data);
//video api end

module.exports = router;