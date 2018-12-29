var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	try{
		for (var i = 0; i < Object.keys(req.query).length; i++) {
			if(Object.values(req.query)[i].split(";").length>1&&Object.values(req.query)[i].split(";")){
				req.query[Object.keys(req.query)[i]] = {
					"$gt" : Math.min(Object.values(req.query)[i].split(";")),
					"$lt" : Math.max(Object.values(req.query)[i].split(";"))
				}
			}else{
				// if()
			}
		}
		mongo.connect(pathMongodb,(err, db)=>{
			db.collection("happy-real-Area").find().sort({_id:1}).limit(20).toArray((err, result)=>{
				// console.log(result);
				res.render("index",{"chatbox":chatbox,"arrArea":result,"nameCompany":"happy-real"})
			})
		})
	}catch(e){
		res.redirect("/")
	}
});

module.exports = router;
