var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");
var infoCompany = require("./infoCompany.js")

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("contact-happy-real",{chatbox:chatbox, "infoCompany":infoCompany})
});

module.exports = router;