var express = require('express');
var router = express.Router();
var passport = require("passport");
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var infoCompany = require("./infoCompany.js")
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.query.area!==""){
		mongo.connect(pathMongodb,(err, db)=>{
			try{
				db.collection("happy-real-Area").findOne({_id : ObjectId(req.query.area)}, (err, result)=>{
					db.close();
					if(!err){
						if(result){
							console.log(result);
							res.render("details",{"chatbox":chatbox, details: result, infoCompany:infoCompany})
						}else{
							res.redirect("/error")
						}
					}else{
						res.redirect("/error")
					}
				})
			}catch(e){
				res.redirect("/error")
			}
		})
	}else{
		res.redirect("/error")

	}
});

module.exports = router;