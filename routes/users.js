var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('users' ,{tital:"welcoe user"});
// });
router.get('/', function (req, res, next) {
  res.render('users', { title: 'Wel come to Node Js server1' });
});

module.exports = router;
