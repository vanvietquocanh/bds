var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");

/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
		if(req.body.videoname!==""&&req.body.linkvideo!==""&&/(https?:\/\/[^\s]+)/g.test(req.body.linkvideo)){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				let query = {};
				if(req.body.id){
					query._id = ObjectId(req.body.id);
				}else{
					query.videoname = req.body.id;
				}
				delete req.body.id;
				req.body.time = Date.now();
				db.collection("video").update(query, {$set: req.body}, {upsert:true}, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success")
					}else{
						res.send("Đã trùng tên hoặc video!")
					}
				});
			})
		}else{
			res.send("invalid")
		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;