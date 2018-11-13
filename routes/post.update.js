var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");

/* POST update estate. */
router.post('/:area', function(req, res, next) {
	// if(req.user){
		if(valid(req.body).length>0){
			res.send({"error": valid(req.body)});
		}else{
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				var id = req.body._id;
				delete req.body._id;
				db.collection("happy-real-Area").updateOne({_id : ObjectId(id)},{ $set: req.body }, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success");
					}else{
						res.send(err)
					}
				})
			})
		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;