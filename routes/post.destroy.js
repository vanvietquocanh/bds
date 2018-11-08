var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/:area', function(req, res, next) {
	// if(req.user){
		mongo.connect(pathMongodb,(err, db)=>{
			assert.equal(null, err);
			db.collection(req.params.area).deleteOne({_id:ObjectId(req.body.id)}, (err, result)=>{
				assert.equal(null, err);
					if(!err){
						res.send("success");
					}else{
						res.send(err)
					}
				db.close();
			})
		})
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;