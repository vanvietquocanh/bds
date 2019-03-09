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
	let nameFile = `video-${infoCompany.companyName.split(" ").join("-").toLowerCase()}`;
	mongo.connect(pathMongodb,(err, db)=>{
		db.collection("video").find().sort({timezone: 1}).limit(20).toArray((err, result)=>{
			db.close();
			if(!err){
				console.log(result);
				res.render(nameFile ,{chatbox:chatbox, "infoCompany":infoCompany, result: result})
			}else{
				res.redirect("/error")
			}
		})
	})
});

module.exports = router;