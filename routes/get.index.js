var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query);
	mongo.connect(pathMongodb,(err, db)=>{
		db.collection("happy-real-Area").find().sort({_id:1}).limit(20).toArray((err, result)=>{
			res.render("index",{"chatbox":chatbox,"arrArea":result,"nameCompany":"happy-real"})
		})
	})
});

module.exports = router;
