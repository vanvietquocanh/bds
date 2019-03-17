var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
var chatbox = require("./chatbox.js");
var infoCompany = require("./infoCompany.js")

/* GET home page. */
router.get('/', function(req, res, next) {
	var query = {

	}
	var date 			= new Date();
	var beginDayNow 	= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
	var beginMonthNow 	= `${date.getMonth()+1}/${date.getFullYear()}`
	let nameFile = `video-${infoCompany.companyName.split(" ").join("-").toLowerCase()}`;
	mongo.connect(pathMongodb,(err, db)=>{
		db.collection("connection").insertOne({time:Date.now(), day:beginDayNow, month:beginMonthNow},(err, re)=>{				
			db.collection("video").find().sort({timezone: 1}).limit(20).toArray((err, result)=>{
				db.close();
				if(!err){
					res.render(nameFile ,{chatbox:chatbox, "infoCompany":infoCompany, result: result, href:`${req.protocol + '://' + req.get('host') + req.originalUrl}`})
				}else{
					res.redirect("/error")
				}
			})
		})
	})
});

module.exports = router;