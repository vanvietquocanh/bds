var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const pathMongodb = require("./mongodb.path.js");
const fs = require('fs')

/* POST new real estate. */
router.post('/:area', function(req, res, next) {
	if(req.user){
		if(req.body.id!==""&&/[a-f\d]{24}/.test(req.body.id)){
			mongo.connect(pathMongodb,(err, db)=>{
				if(!err){
					db.collection("happy-real-Area").findOne({_id:ObjectId(req.body.id)}, (err, result)=>{
						if(result&&typeof result==="object"){
							db.collection("happy-real-Area").deleteOne({_id:ObjectId(req.body.id)}, (err, del)=>{
								db.close();
								if(!err){
									for (var i = 0; i < result.image.length; i++) {
										fs.unlink(`public/${result.image[i].split("./").join("")}`,(err)=>{
											stt+=1;
										})
									}
									res.send("success");
								}else{
									res.send(err)
								}
							})
						}
					})
				}
			})
		}else{
			res.send("error")
		}
	}else{
		res.redirect("/error")
	}
});

module.exports = router;