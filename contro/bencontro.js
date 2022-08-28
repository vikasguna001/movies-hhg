var Categoires = require("../Models/Categoires");
var subcategoires = require("../Models/subcategoires");
var movie_maker = require("../Models/movie_maker");
var language = require("../Models/language");
var video = require("../Models/video");
var Contract = require("../Models/Contract");
var User = require("../Models/User");
var geoip = require("geoip-lite");
var $ = require("jquery");
var Country = require("../Models/Countrycode");

var moment = require("moment");
var csv = require("csvtojson");

// var banner_schema = require("../Models/banner_video");
var nodemailer = require("nodemailer");
const fs = require("fs");
const formidable = require("formidable");
const { IncomingForm } = require("formidable");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
// import validator from 'validator';
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://HHG:HHG@cluster0.f2c5v.mongodb.net/HHG?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");
const { data } = require("jquery");
const { time } = require("console");
// const { token } = require("morgan");

const Razorpay = require("razorpay");
const crypto = require("crypto");

//jwt ...
const jwt = require("jsonwebtoken");
const { match } = require("assert");
const jwtkey = "movies-hhg";

exports.search_data = async function(req,res,next){

  let data = await video.find(
    {
      "$or":[
        {Title:{$regex:req.params.key}},
        // {Discription:{$regex:req.params.key}},
        // {Cast:{$regex:req.params.key}},
        // {Country:{$regex:req.params.key}},
        // {Categoires:{$regex:req.params.key}},
      ]
    }
  );
  res.send(data);
  console.log(data);

}


exports.findCountry = async function (req, res, next) {
  try {
    const tag = await Country.find();

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
    // console.log("not find data........!");
  }
};
exports.singlecountry = async function (req, res, next) {
  try {
    const tag = await Country.find({
      country: { $in: ["Afghanistan", "Austria", "Aruba"] },
    });

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
    // console.log("not find data........!");
  }
};
exports.get_join_data = async function (req, res, next) {
  // await csv()
  // .fromFile('./upload/a1.csv')
  // .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
  //   jsonArrayObj.map((item) => {
  //       Country.create({
  //         country_code:item.country_code,
  //         latitude:item.latitude,
  //         longitude:item.longitude,
  //         country:item.country,
  //         usa_state_code:item.usa_state_code,
  //         usa_state_latitude:item.usa_state_latitude,
  //         usa_state_longitude:item.usa_state_longitude,
  //         usa_state:item.usa_state,
  //       })
  //   })
  //    console.log(jsonArrayObj);
  //  })

  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;

    const dd = await movie_maker.aggregate([
      {
        $lookup: {
          from: "contracts",
          localField: "_id",
          foreignField: "User_Id",
          as: "contract",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "User_Id",
          as: "videos",
        },
      },
    ]);

    res.status(200).send({
      data: dd,
    });
  });
};

exports.getlocation = async function (req, res, next) {
  // var ip =  geoIp({ip:req.headers['x-forwarded-for']  || req.connection.remoteAddress})
  var ip = "27.57.162.145";
  // var ip = "106.205.227.72";
  var geo = geoip.lookup(ip);

  res.status(200).send({
    ip: geo,
  });
};

exports.insert_data = async function (req, res, next) {
  try {
    const data = {
      language: req.body.language,
    };
    const tag = await language.create(data);

    res.status(201).json({
      data: tag,
      status: "Data insert",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not  insert",
    });
    // console.log("not data insert........!");
  }
};

exports.find_data = async function (req, res, next) {
  try {
    const tag = await language.find();

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
    // console.log("not find data........!");
  }
};

exports.find_data_Id = async function (req, res, next) {
  try {
    const tag = await language.findById(req.params.id);
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find by id",
    });
    // console.log("Data not find by id........!");
  }
};

exports.Delete_data = async function (req, res, next) {
  try {
    await language.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "delete",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not delete",
    });
    // console.log("Data not delete........!");
  }
};

exports.Update_data = async function (req, res, next) {
  try {
    var BannerData = await language.findById(req.body.Id);
    BannerData.language = req.body.language;
    await language.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: req.file,
    });
  } catch (error) {}
};

// parth api end

// mukunj API start

exports.Minsert_data = async function (req, res, next) {
  try {
    var result = "";
    var characters =
      "ABCD34636755EFGH012345JKLMNOPQRSTUVWXYZ&abcdefghijkmnopqrstuvwxyz6789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    console.log(result);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hhgsoftechteam10@gmail.com",
        pass: "@Surat1234",
      },
    });

    var mailOptions = {
      from: "hhgsoftechteam10@gmail.com",
      to: req.body.Email,
      subject: "your password",
      html: "<h1>Don't share your Password....!!!</h1> <h2>" + result + "</h2>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // res.render("result");
    // console.log(result)
    var newpass = await bcrypt.hash(result, 12);
    // console.log(newpass);

    var sid = 2;

    const data = {
      sid: sid,
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      User_Name: req.body.User_Name,
      Mobile_no: req.body.Mobile_no,
      Email: req.body.Email,
      Password: newpass,
    };

    console.log(data.Password);
    // jwt.sign({ data }, jwtkey, (err, token) => {
    //   if (err) {
    //     res.send({ result: "wrong...." });
    //   }
    //   res.send({ data, auth: token });
    // });
    const tag = await movie_maker.create(data);

    res.status(201).json({
      data: tag,
      status: "Data insert",
    });
    // });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
  }
};

exports.Mlogin = async function (req, res, next) {
  const { User_Name, Password } = req.body;
  const User = await movie_maker.findOne({ User_Name });
  console.log(User);

  if (User != null) {
    jwt.sign({ User }, jwtkey, (err, token) => {
      if (err) {
        res.send({ result: "wrong...." });
      }
      res.send({ User, auth: token });

      const checkpass = bcrypt.compare(Password, User.Password);
      if (checkpass) {
        res.status(200).json({
          status: true,
          data: User,
        });
      }
    });
  } else {
    // res.status(200).json({
    //   status: false,
    //   message: "not valid username and password",
    // });
    res.send({ status: "flase", result: "not valid username and password" });
  }
};

exports.Mfind_data = async function (req, res, next) {
  try {
    const tag = await movie_maker.find();

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find",
    });
  }
};

exports.Mfind_data_Id = async function (req, res, next) {
  try {
    const tag = await movie_maker.findById(req.params.id);
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not finf by id",
    });
  }
};

exports.MDelete_data = async function (req, res, next) {
  try {
    await movie_maker.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "delete",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not delete",
    });
  }
};

exports.MUpdate_data = async function (req, res, next) {
  try {
    var BannerData = await movie_maker.findById(req.body.Id);
    (BannerData.First_Name = req.body.First_Name),
      (BannerData.Last_Name = req.body.Last_Name),
      (BannerData.User_Name = req.body.User_Name),
      (BannerData.Mobile_no = req.body.Mobile_no),
      (BannerData.Email = req.body.Email);

    await movie_maker.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: req.file,
    });
  } catch (error) {
    // console.log(error);
  }
};

// mukunj API end

//vikas api start
exports.vinsert_data = async function (req, res, next) {
  try {
    const data = {
      category: req.body.category,
      Description: req.body.Description,
      image_user: req.file.path,
    };
    const tag = await Categoires.create(data);

    res.status(201).json({
      data: tag,
      status: "Data insert",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
  }
};

exports.vfind_data = async function (req, res, next) {
  try {
    const tag = await Categoires.find();

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find",
    });
  }
};

exports.vfind_data_Id = async function (req, res, next) {
  try {
    const tag = await Categoires.findById(req.params.id);
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find by  id",
    });
  }
};

exports.vDelete_data = async function (req, res, next) {
  try {
    await Categoires.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "delete",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not delete",
    });
  }
};

exports.vUpdate_data = async function (req, res, next) {
  try {
    var BannerData = await Categoires.findById(req.body.Id);
    BannerData.category = req.body.category;
    BannerData.Description = req.body.Description;
    if (req.file != null) {
      await unlinkAsync(BannerData.image_user);
      BannerData.image_user = req.file.path;
    }
    await Categoires.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: req.file,
    });
  } catch (error) {
    // console.log(error);
  }
};

//keyur api start

exports.kinsert_data = async function (req, res, next) {
  try {
    const data = {
      category: req.body.category,
      subcategorie: req.body.subcategorie,
      description: req.body.description,
      image_user: req.file.path,
    };
    const tag = await subcategoires.create(data);

    res.status(201).json({
      data: tag,
      status: "Data insert",
    });
  } catch (error) {
    console.log("not data insert........!");
  }
};

// exports.find_category = async function (req, res, next)
// {

// }

exports.kfind_data = async function (req, res, next) {
  // console.log("res : " + req.query.category);
  // console.log("res1 : ", req);
  if (req.query.category != "null") {
    try {
      const tag = await subcategoires.find({ category: req.query.category });
      // console.log("filter :" + tag);
      res.status(200).json({
        status: "find data",
        data: tag,
      });
    } catch (error) {
      res.status(201).json({
        // data: tag,
        status: "Data not find",
      });
    }
  } else {
    try {
      const tag = await subcategoires.find();

      // console.log(tag);

      res.status(200).json({
        status: "find data",
        data: tag,
      });
    } catch (error) {
      // console.log("error :" + error);
      // console.log("not find data........!");
    }
  }

  // try {

  //       const tag = await subcategoires.find({category:req.query.category});
  //        console.log("filter :" + tag)
  //        res.status(200).json({
  //         status: "find data",
  //         data: tag,
  //       });
  //     } catch (error) {
  //       console.log("not find data........!")
  //     }
};

exports.kfind_data_Id = async function (req, res, next) {
  try {
    const tag = await subcategoires.findById(req.params.id);
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find by id",
    });
  }
};

exports.kfindone_data = async function (req, res, next) {
  try {
    const tag = await subcategoires.find();
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find by id",
    });
  }
};

exports.kDelete_data = async function (req, res, next) {
  try {
    await subcategoires.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "delete",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not delete",
    });
  }
};

exports.kUpdate_data = async function (req, res, next) {
  try {
    var BannerData = await subcategoires.findById(req.body.Id);
    BannerData.category = req.body.category;
    BannerData.subcategorie = req.body.subcategorie;
    BannerData.description = req.body.description;
    if (req.file != null) {
      await unlinkAsync(BannerData.image_user);
      BannerData.image_user = req.file.path;
    }
    await subcategoires.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: req.file,
    });
  } catch (error) {}
};

//video api
// exports.viinsert_data = async function (req, res, next) {

//   try {
// res.status(201).json({
// var time = moment(req.body.rdate)
//   .utc()
//   .format("YYYY-MM-DD dddd HH:mm:ss a");
// date:moment(req.body.rdate).format('YYYY-MM-DD dddd HH:mm:ss a')
// });

// const data = {
// v_id : video_id,
//   method: req.body.method,
//   rdate: time,
//   edate: req.body.edate,
//   status: req.body.status,
//   banner: req.body.banner,
//   title: req.body.title,
//   category: req.body.category,
//   subcategory: req.body.subcategory,
//   Description: req.body.Description,
//   language: req.body.language,
//   image_user: req.files[0].path,
//   banner_video: req.files[1].path,
//   Trailer_video: req.files[2].path,
//   User_Id: req.headers.userid,
// };

// const tag = await video.create(data);

// res.status(201).json({
//   data: tag,
//   status: "Data insert",
// });
// console.log(tag);
// } catch (error) {
//   res.status(201).json({ error });
// console.log(error);
// res.status(201).json({
// data: tag,
//       status: "Data not insret",
//     });
//   }
// };

// exports.viinsert_data = async function (req, res, next) {
// try {
//   console.log("tt");

//   const data = {

//     // v_id : video_id,
//     Title:req.body.Title,
//     Age: req.body.Age,
//     Rating: req.body.Rating,
//     Discription: req.body.Discription,
//     Trailer_time: req.body.Trailer_time,
//     Video_time: req.body.Video_time,
//     Country: req.body.Country,
//     Cast: req.body.Cast,
//     Contract: req.body.Contract,
//     User_Id: req.headers.userid,
//     Publish:req.body.Publish,
//     // banner_video: req.files[0].path,
//     // Trailer_video: req.files[1].path,
//     // image_user: req.files[2].path,
//   };

//   const tag = await video.create(data);

//   res.status(201).json({
//     data: tag,
//     status: "Data insert",
//   });
//   console.log(tag);
// }
//  catch (error) {
//   // res.status(201).json({ error });
//   console.log(error);
//   res.status(201).json({
//     // data: tag,
//     status: "Data not insret",
//   });
// }
// };

exports.viinsert_data = async function (req, res, next) {
  try {
    // console.log(req.headers);
    var data = {
      Title: req.body.Title,
      Rating: req.body.Rating,
      Subscribe: req.body.Subscribe,
      Categoires: req.body.Categoires,
      SubCategoires: req.body.SubCategoires,
      Discription: req.body.Discription,
      Contract: req.body.Contract,
      Trailer_time: req.body.Trailer_time,
      Video_time: req.body.Video_time,
      Country: req.body.Country,
      Cast: req.body.Cast,      
      Publish: req.body.Publish,
      image_user: req.files[0].path,
      Trailer_video: req.files[1].path,
      banner_video: req.files[2].path,
      // User_Id: req.headers.userid,
    };

    // console.log(data);
    var tag = await video.create(data);
    res.status(201).json({
      
      data: tag,
      status: "Data insert",
    });

  } catch(error) {
    console.log("hello ");
  }

};

exports.vifind_data = async function (req, res, next) {
  try {
    const tag = await video.find();

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find ",
    });
  }
};

exports.banner_find = async function (req, res, next) {
  // try {
  const tag = await video.find({
    banner: "Yes",
  });
  res.status(200).json({
    status: "find data",
    data: tag,
  });
  // } catch (error) {
  //   console.log("not find data........!");
  // }
};

exports.banner_find_id = async function (req, res, next) {
  try {
    const tag = await video.findById(req.params.id);
    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
    });
  }
};

// exports.video_find = async function (req, res, next) {
//   try {
//     // console.log(req.body)

//     const tag = await video.findById(req.body.id);

//     res.status(200).json({
//       status: "find data",
//       data: [tag],
//     });
//   } catch (error) {
//     res.status(200).json({
//       status: "find data",
//       data: [],
//     });
//   }
// };

exports.demo_data = async function (req, res, next) {
  const tag = await video.findById(req.params.id);
  var filePath = tag.banner_video;

  // var a = fs.statSync(filePath);

  // res.writeHead(200, {
  //   "Content-Type": "video/mp4",
  //   "Content-Length": a.size,
  //   "Accept-Ranges": "bytes",
  // });

  // var readStream = fs.createReadStream(filePath);
  // readStream.pipe(res);

  if (tag.Subscribe == "Free") {
    var a = fs.statSync(filePath);

    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": a.size,
      "Accept-Ranges": "bytes",
      status: true,
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } else {
    console.log("this is Paid...");
    res.json({
      status: false,
    });
  }
};

exports.latest_find = async function (req, res, next) {
  try {
    const tag = await video.find({
      rdate: {
        $gt: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date().getDate()
        )
          .toISOString()
          .replace(/T.*/, ""),
        $lt: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
          .toISOString()
          .replace(/T.*/, ""),
      },
    });
    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find ",
    });
  }
};

exports.Upcoming_find = async function (req, res, next) {
  try {
    const tag = await video.find({
      rdate: {
        $gt: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
          .toISOString()
          .replace(/T.*/, ""),
      },
    });
    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find ",
    });
  }
};

exports.vifind_data_Id = async function (req, res, next) {
  try {
    const tag = await video.findById(req.params.id);
    res.status(200).json({
      status: "find id",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find by id",
    });
  }
};

exports.viDelete_data = async function (req, res, next) {
  try {
    await video.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "delete",
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not delete",
    });
  }
};

exports.viUpdate_data = async function (req, res, next) {
  try {
    var BannerData = await video.findById(req.body.Id);
    (BannerData.method = req.body.method),
      (BannerData.rdate = req.body.rdate),
      (BannerData.edate = req.body.edate),
      (BannerData.status = req.body.status),
      (BannerData.category = req.body.category),
      (BannerData.title = req.body.title),
      (BannerData.language = req.body.language),
      (BannerData.subcategory = req.body.subcategory),
      (BannerData.Description = req.body.Description);

    for (let iv of req.files) {
      if (iv.fieldname == "image") {
        await unlinkAsync(BannerData.image_user);
        BannerData.image_user = iv.path;
      } else if (iv.fieldname == "banner_video") {
        await unlinkAsync(BannerData.banner_video);
        BannerData.banner_video = iv.path;
      } else if (iv.fieldname == "Trailer_video") {
        await unlinkAsync(BannerData.Trailer_video);
        BannerData.Trailer_video = iv.path;
      }
    }

    await video.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: req.files,
    });
  } catch (error) {}
};

exports.Contract_find_data = async function (req, res, next) {
  try {
    const tag = await Contract.find().limit(1).sort({ $natural: -1 });

    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    res.status(201).json({
      // data: tag,
      status: "Data not find ",
    });
  }
};

exports.Contract_data = async function (req, res, next) {
  try {
    const { jsPDF } = require("jspdf");
    var status = 2;
    const doc = new jsPDF();
    doc.text(
      "******************************* Contract *******************************",
      10,
      10
    );
    doc.text("Movie Name :- " + req.body.Movie_Name, 10, 20);
    doc.text("Provider Name :- " + req.body.Provider_Name, 10, 30);
    doc.text("Provider Phone :- " + req.body.Provider_Phone, 10, 40);
    doc.text("Period :- " + req.body.Period, 10, 50);
    doc.text("Provider Ratio :- " + req.body.Provider_Ratio + "%", 10, 60);
    doc.text("Paltform Ratio :- " + req.body.Paltform_Ratio + "%", 10, 70);
    doc.text("Fee :- " + req.body.Fee + "$", 10, 80);
    doc.text("Payment Charge :- " + req.body.Payment_Charge + "%", 10, 90);
    doc.text("Company Name :- " + req.body.Company_Name, 10, 100);
    doc.text("Adress :- " + req.body.Adress, 10, 110);
    doc.text("CIN :- " + req.body.CIN, 10, 120);
    doc.text("Director Name :- " + req.body.Director_Name, 10, 130);
    doc.text("DIN :- " + req.body.DIN, 10, 140);
    doc.text("User_Id :- " + req.headers.user_id, 10, 150);

    var name = "Contact pdf-" + Date.now();
    var pdf = `upload/pdf/${name}.pdf`;
    doc.save(pdf);
    // console.log(req.headers.user_id);
    const data = {
      Movie_Name: req.body.Movie_Name,
      Provider_Name: req.body.Provider_Name,
      Provider_Phone: req.body.Provider_Phone,
      Period: req.body.Period,
      Provider_Ratio: req.body.Provider_Ratio,
      Paltform_Ratio: req.body.Paltform_Ratio,
      Fee: req.body.Fee,
      Payment_Charge: req.body.Payment_Charge,
      Company_Name: req.body.Company_Name,
      Adress: req.body.Adress,
      CIN: req.body.CIN,
      Director_Name: req.body.Director_Name,
      DIN: req.body.DIN,
      Contract_pdf: pdf,
      User_Id: req.headers.user_id,
      Status: status,
    };

    const tag = await Contract.create(data);
    res.status(201).json({
      data: tag,
      status: "Data insert",
    });
    // console.log(tag);
  } catch (error) {
    // res.status(201).json({ error });
    res.status(201).json({
      // data: tag,
      status: "Data not insert",
    });
  }
};

exports.Status_data = async function (req, res, next) {
  try {
    var BannerData = await Contract.findById(req.body.Id);
    BannerData.Status = req.body.Status;
    console.log(req.body.Status);
    if (req.body.Status == 2) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hhgsoftechteam10@gmail.com",
          pass: "@Surat1234",
        },
      });

      var mailOptions = {
        from: "hhgsoftechteam10@gmail.com",
        to: "hhgsoftechteam10@gmail.com",
        subject: "Contract Detail",
        html: "<h1>Contract Detail......!!!</h1>",
        attachments: [
          {
            filename: "Contact pdf-1651295458648.pdf",
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      console.log("Email Send....!");
    } else {
      console.log("Email Not Send....!");
    }
    console.log(req.body.Id);
    var tag = await Contract.findByIdAndUpdate(req.body.Id, BannerData);
    res.status(201).json({
      status: "success",
      data: tag,
    });
  } catch (error) {}
};

//
exports.User_data = async function (req, res, next) {
  // try {

  const allemail = await User.findOne({ Email: req.body.Email });

  if (allemail && allemail.Email) {
    res.status(201).json({
      status: false,
      message: "Email Already Exists",
    });
  } else {
    let newpass = await bcrypt.hash(req.body.Password, 12);

    const data = {
      User_Name: req.body.User_Name,
      Mobile_No: req.body.Mobile_No,
      Email: req.body.Email,
      Password: newpass,
      Mobile_No: req.body.Mobile_No,
    };

    jwt.sign({ data }, jwtkey, async (err, token) => {
      if (err) {
        res.send({ result: "wrong...." });
      }

      const tag = await User.create(data);

      res.status(201).send({
        status: true,
        auth: token,
        data: tag,
      });
    });
  }
};

exports.client_login = async function (req, res, next) {
  const { User_Name, Password } = req.body;
  const User1 = await User.findOne({ User_Name });
  // console.log(User1);

  if (User1) {
    jwt.sign({ User1 }, jwtkey, async (err, token) => {
      if (err) {
        res.send({ status: false, message: "not valid username and password" });
      }

      const checkpass = await bcrypt.compare(Password, User1.Password);

      if (checkpass) {
        res.status(200).json({
          status: true,
          data: User1,
          auth: token,
          message: "1",
        });
      } else {
        res.send({ status: false, message: "not valid username and password" });
      }
    });
  } else {
    res.send({ status: false, message: "not valid username and password" });
  }
};

exports.new = async function (req, res, next) {
  try {
    const tag = await Country.find({});
  } catch (error) {}
};

exports.Subscribe_data = async function (req, res, next) {
  try {
    const tag = await video.find();
    res.status(200).json({
      status: "find data",
      data: tag,
    });
  } catch (error) {
    console.log("not find data........!");
  }
};

exports.orders = async function (req, res, next) {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_ii0W1QDV7ASF82",
      key_secret: "IT15QuqA3ITcGyygcZdogiPt",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

exports.verify = async function (req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", IT15QuqA3ITcGyygcZdogiPt)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};
