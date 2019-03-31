var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
var infoCompany = require("./infoCompany.js")
const pathMongodb = require("./mongodb.path.js");
var remove = `<div id="showmap" style="border-radius: .5em; background: #02344a; ">
							<div class="fa fa-globe" style="font-size: 29px; border: 1px solid #fff; border-radius: .4em; padding: .2em; color:#fff"></div>
						</div>`
/* GET home page. */
router.get('/', function(req, res, next) {
	var date 			= new Date();
	var beginDayNow 	= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
	var beginMonthNow 	= `${date.getMonth()+1}/${date.getFullYear()}`
	mongo.connect(pathMongodb,(err, db)=>{
		db.collection("connection").insertOne({time:Date.now(), day:beginDayNow, month:beginMonthNow},(err, re)=>{
			db.close();				
			res.render("ky-gui-happy-real", {chatbox:chatbox.split(remove).join(""), "infoCompany":infoCompany,href:`${req.protocol + '://' + req.get('host') + req.originalUrl}`})
		})
	})
});

module.exports = router;