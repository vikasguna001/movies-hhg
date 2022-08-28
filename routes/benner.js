var express = require('express');
var router = express.Router();
const multer = require('multer');
var BannerController = require('../contro/bencontro');

// image multer

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/image/')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage,
})


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
        res.status(401).send({ result: "401 Unauthorized" });
      } else {
        next()
      }
    });
  } else {
    res.status(403).send({ result: "403 Forbidden" });
  }
};
router.get('/search/:key',BannerController.search_data);

router.get('/getjoindata',BannerController.get_join_data);
router.get('/findCountry',BannerController.findCountry);
router.get('/singlecountry',BannerController.singlecountry);


router.get('/getlocation', BannerController.getlocation)
//parth
router.get('/finddata',verifyToken,BannerController.find_data);
router.get('/finddata/:id',verifyToken,BannerController.find_data_Id);
router.post('/InsertBanner',verifyToken, upload.single('image'), BannerController.insert_data);
router.post('/UpdateBanner',verifyToken, upload.single('image'), BannerController.Update_data);
router.delete('/DeleteBanner/:id',verifyToken, upload.single('image'), BannerController.Delete_data);


//login api 
router.post('/Mlogin',BannerController.Mlogin);

// mukunj api start
router.get('/Mfinddata',verifyToken,BannerController.Mfind_data);
router.get('/Mfinddata/:id',verifyToken,BannerController.Mfind_data_Id);
router.post('/MInsertBanner',upload.single('image'), BannerController.Minsert_data);
router.post('/MUpdateBanner', verifyToken,upload.single('image'), BannerController.MUpdate_data);
router.delete('/MDeleteBanner/:id',verifyToken, upload.single('image'), BannerController.MDelete_data);
// mukunj api end

//vikas api start
router.get('/vfinddata',verifyToken,BannerController.vfind_data);
router.get('/vfinddata/:id',verifyToken,BannerController.vfind_data_Id);
router.post('/vInsertBanner',verifyToken, upload.single('image'), BannerController.vinsert_data);
router.post('/vUpdateBanner',verifyToken, upload.single('image'), BannerController.vUpdate_data);
router.delete('/vDeleteBanner/:id', verifyToken,upload.single('image'), BannerController.vDelete_data);
//vikas api end 

//keyur api start
router.get('/kfinddata',verifyToken,BannerController.kfind_data);
router.get('/kfindonedata',verifyToken,BannerController.kfindone_data);
router.get('/kfinddata/:id',verifyToken,BannerController.kfind_data_Id);
router.post('/kInsertBanner',verifyToken, upload.single('image'), BannerController.kinsert_data);
router.post('/kUpdateBanner',verifyToken, upload.single('image'), BannerController.kUpdate_data);
router.delete('/kDeleteBanner/:id', verifyToken,upload.single('image'), BannerController.kDelete_data);
//keyur api end

router.get('/bannerfind',verifyToken,BannerController.banner_find);
router.get('/bannerfind_id/:id',BannerController.banner_find_id);
router.get('/Latest',verifyToken,BannerController.latest_find);
router.get('/Upcoming',verifyToken,BannerController.Upcoming_find);

// Contract api
router.post('/Contract',verifyToken,upload.single('image'), BannerController.Contract_data);
router.get('/demo/:id',BannerController.demo_data);
router.get('/Contract_find_data',BannerController.Contract_find_data)
router.post('/Contract_update_data',upload.single('image'), BannerController.Status_data);  


//client panel login - registered
router.post('/User',upload.single('image'),BannerController.User_data);
router.post('/login',upload.single('image'),BannerController.client_login);
router.get('/Subscribe',BannerController.Subscribe_data);

//payment getway
router.post('/orders',BannerController.orders);
router.post('/verify',BannerController.verify);

module.exports = router;