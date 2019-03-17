var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
		if(req.body.id!==""&&/[a-f\d]{24}/.test(req.body.id)){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("emailClient").deleteOne({_id:ObjectId(req.body.id)}, (err, result)=>{
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
			res.send("error")
		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;