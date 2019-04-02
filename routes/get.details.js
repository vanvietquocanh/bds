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
	if(req.query.area!==""&&/^[0-9a-fA-F]{24}$/.test(req.query.area)){
		mongo.connect(pathMongodb,(err, db)=>{
			try{
				var date 			= new Date();
				var beginDayNow 	= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
				var beginMonthNow 	= `${date.getMonth()+1}/${date.getFullYear()}`
					db.collection("happy-real-Area").findOne({_id : ObjectId(req.query.area)}, (err, result)=>{
						if(result){
							db.collection("happy-real-Area").find({"Diện tích": result["Diện tích"],"Khu Vực":result["Khu Vực"],"Hướng":result["Hướng"]}).limit(7).toArray((err, relateTO)=>{
								if(relateTO.length!==0){
									db.collection("happy-real-Area").find().sort({'Giá':1}).limit(4).toArray((err, lowestPrice)=>{
										if(lowestPrice.length!==0){
											db.collection("connection").insertOne({time:Date.now(), day:beginDayNow, month:beginMonthNow},(err, re)=>{				
												db.close();
												res.render("details",{"chatbox":chatbox, details: result, lowestPrice:lowestPrice, arrArea:relateTO, infoCompany:infoCompany, href:req.protocol + '://' + req.get('host') + req.originalUrl})
											})
										}else{
											db.close();
											res.redirect("/")
										}
									})
								}else{
									db.close();
									res.redirect("/")
								}
							})
						}else{
							db.close();
							res.redirect("/")
						}
					})
			}catch(e){
				db.close();
				res.redirect("/")
			}
		})
	}else{
		res.redirect("/")

	}
});

module.exports = router;