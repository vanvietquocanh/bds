var express = require('express');
var router = express.Router();
var chatbox = require("./chatbox.js");
const assert = require('assert');
var mongo = require("mongodb");
var infoCompany = require("./infoCompany.js")
const pathMongodb = require("./mongodb.path.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	try{
		var date 			= new Date();
		var beginDayNow 	= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
		var beginMonthNow 	= `${date.getMonth()+1}/${date.getFullYear()}`
		var query = {}
		for (var i = Object.keys(req.query).length - 1; i >= 0; i--) {
			if(Object.values(req.query)[i]!==""&&Object.values(req.query)[i]!=="Khác"){
				query[`${Object.keys(req.query)[i]}`] = Object.values(req.query)[i];
			}
		}
		if(Object.keys(req.query).length>0){
			if(query["Giá"]&&query["Giá"].indexOf(";")!==-1){
				let gt = Number(query["Giá"].split(";")[0]);
				let lt = Number(query["Giá"].split(";")[1]);
				query["Giá"] = {
					$gt : gt,
					$lt : lt
				}
			}
		}
		mongo.connect(pathMongodb,(err, db)=>{
			db.collection("happy-real-Area").find(query).sort({'Ngày':-1}).toArray((err, result)=>{
				db.collection("happy-real-Area").find().sort({'Giá':1}).limit(3).toArray((err, resultPrice)=>{
					db.collection("happy-real-Area").find().sort({'Trung tâm TP':-1}).limit(6).toArray((err, resultDowntown)=>{
						db.collection("buyUrgently").find({status:"active"}).toArray((err, areaGuest)=>{
							db.collection("connection").insertOne({time:Date.now(), day:beginDayNow, month:beginMonthNow},(err, re)=>{				
								db.close();
								if(!err){
									res.render("index",{
										"chatbox"		:chatbox,
										"arrArea"	 	:result,
										"infoCompany"	:infoCompany,
										"resultPrice"	:resultPrice,
										"resultDowntown":resultDowntown,
										"areaGuest" 	:areaGuest,
										"href" 			:`${req.protocol + '://' + req.get('host') + req.originalUrl}`
									})
								}else{
									res.redirect("/error")
								}
							})
						})
					})
				})
			})
		})
	}catch(e){
		res.redirect("/")
	}
});

module.exports = router;
