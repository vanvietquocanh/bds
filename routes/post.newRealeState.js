var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");

/* POST new real estate. */
router.post('/:area', function(req, res, next) {
	// if(req.user){
		if(valid(req.body).length>0){
			res.send({"error": valid(req.body)});
		}else{
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				req.body["Khu Vực"] = req.params.area;
				req.body["Ngày"]    = Date.now();
				db.collection("happy-real-Area").insertOne(req.body, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success");
					}else{
						res.send("error")
					}
				})
			})
		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;