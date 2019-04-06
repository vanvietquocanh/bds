var infoCompany = require("./infoCompany.js")
const assert = require('assert');
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
var chatbox = require("./chatbox.js");

var date 			= new Date();
var beginDayNow 	= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
var beginMonthNow 	= `${date.getMonth()+1}/${date.getFullYear()}`

module.exports = function conectDb(req, query, res, resultName) {
	try{
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
										"areaTitle"		:resultName,
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
		console.log(e);
		res.redirect("/")
	}
}