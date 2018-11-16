var express = require('express');
var router = express.Router();
var passport = require("passport");
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("details",{"chatbox":chatbox})
});

module.exports = router;