var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.get('/', function(req, res, next) {
	// if(req.user){
		if(req.query.area!==""){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("happy-real-Area").findOne({_id : ObjectId(req.query.area)}).toArray((err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send(result);
					}else{
						res.send("error")
					}
				})
			})
		}else{
			res.redirect("/error")

		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;