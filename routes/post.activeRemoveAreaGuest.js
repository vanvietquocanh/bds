var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const valid = require("./valid.js");
const assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/:method', function(req, res, next) {
	// if(req.user){
		// /(09|07|08|03|05)+([0-9]{8})\b/g
		if(req.params.method==="remove"&&req.body.id!==""&&/[a-f\d]{24}/.test(req.body.id)){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("buyUrgently").deleteOne({_id:ObjectId(req.body.id)}, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success");
					}else{
						res.send(err)
					}
				})
			})
		}else if(req.params.method==="update"&&req.body.id!==""&&/[a-f\d]{24}/.test(req.body.id)){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				var id = req.body.id;
				delete req.body.id;
				db.collection("buyUrgently").updateOne({_id : ObjectId(id)},{ $set: req.body }, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success");
					}else{
						res.send(err)
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