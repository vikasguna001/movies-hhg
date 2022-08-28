var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer")

// var hello = require('../Models/image');
const multer = require('multer')
// import validator from 'validator';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


// router.post('/', async function (req, res, next) {
//   try {
//     const tag = await hello.create(req.body);
//     console.log(tag);
//     console.log(req.body);
//     res.status(201).json({
//       status: "success",
//       data: tag,
//     })
//     console.log(tag);
//   } catch (error) {

//   }
// });
// router.get('/data_user', async function (req, res, next) {
//   try {
//     const tag = await hello.find();
//     console.log(req.body);
//     res.status(200).json({
//       status: "success",
//       data: tag,
//     })
//   } catch (error) {

//   }
// });

// router.get('/data_user/:id', async function (req, res, next) {
//   try {
//     const tag = await hello.findById(req.params.id);
//     res.status(200).json({
//       status: "update",
//       data: tag
//     })
//   } catch (error) {

//   }
// });

// router.put('/data_user/:id', async function (req, res, next) {
//   try {
//     console.log(req.params.id);
//     console.log(req.body);
//     const tag = await hello.findByIdAndUpdate(req.params.id,req.body);
//     res.status(201).json({
//       status: "update",
//       data: tag
//     })
//   } catch (error) {

//   }
// });


// router.delete('/data_user/:id', async function (req, res, next) {
//   try {
//     const tag = await hello.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "delete",
//     })
//   } catch (error) {

//   }
// });
// var storage = multer.diskStorage({
//   destination: "./upload/image",
//   // destination: (req, file, callBack) => {
//   //     callBack(null, './upload/images/')
//   // },
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       Date.now() + '-' + file.originalname
//     );
//   },
// });
// // const filefilter = (req, file, cb) => {
// //   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
// //       || file.mimetype === 'image/jpeg'){
// //           cb(null, true);
// //       }else {
// //           cb(null, false);
// //       }
// // }
// var upload = multer({
//   storage: storage,
// });

// // router.post('/data_user', upload.single('image'), (req, res) => {
// //   try {        
// //       console.log(req.body.Title);
      
// //       res.status(201).json({
// //           status: "success",
// //           data: {"name":"sdassdf"}
// //       })
// //   } catch (error) {
// //   }
// // });

// router.post("/data_user", upload.single("image"), (req, res) => {  
//   try {

//     console.log(req.file);
//     var data = {
//       main:req.body.main,
//       subtit:req.body.subtit, 
//       image_user: req.file.path
//     }
//     console.log(data);
//     const tag = hello.create(data);

//     res.status(201).json({
//       status: "success",
//       data: tag,
//     });
//   } catch (error) {

//   }
// });
module.exports = router;
