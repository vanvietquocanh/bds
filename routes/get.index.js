var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{chatbox:chatbox});
});

module.exports = router;
