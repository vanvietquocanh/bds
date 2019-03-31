var express = require('express');
var router = express.Router();
var passport = require("passport");
var infoCompany = require("./infoCompany.js")
const assert = require('assert');
var mongo = require("mongodb");
var infoCompany = require("./infoCompany.js")
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(req.user){
		console.log(req.user);
		var date 			= new Date();
		var beginDayNow 	= new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
		var beginMonthNow   = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
		var beginYearNow 	= new Date(date.getFullYear(), 0, 1).getTime();
		var endDayNow		= new Date(date.getFullYear(), date.getMonth(), date.getDate()+1).getTime();
		mongo.connect(pathMongodb,(err, db)=>{
			db.collection("connection").aggregate([
													{
														$match: {
															time : {
																$gt : beginYearNow,
																$lt : endDayNow
															}
														}
													},
													{
														$group: {
															_id: {
																month : "$month",
																day   : "$day"
															},
															count :{
																$sum : 1
															} 
														}
													}
												],(err, result)=>{
				db.collection("emailClient").count((err,countEmail)=>{
					db.collection("connection").count((err,countConnection)=>{
						db.collection("video").count((err,countVideo)=>{
							db.collection("happy-real-Area").count((err,countArea)=>{
								db.collection("buyUrgently").count((err,countbuyUrgently)=>{
									db.collection("saleArea").count((err,countsaleArea)=>{
										db.close();
										res.render("dashboard",{
											result		    :result, 
											countEmail 	    :countEmail, 
											countConnection :countConnection, 
											countVideo	    :countVideo,
											countArea 	    :countArea,
											countbuyUrgently:countbuyUrgently,
											countsaleArea 	:countsaleArea
										})
									})
								})
							})
						})
					})
				})
			})
		})

	// }else{
	// 	res.redirect("/error")
	// }
});





module.exports = router;