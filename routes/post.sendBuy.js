var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const valid = require("./valid.js");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
		// /(09|07|08|03|05)+([0-9]{8})\b/g
		if(valid(req.body).length>0){
		      res.send({"error": valid(req.body)});
		}else{
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				req.body.status = "inactive";
				db.collection("buyUrgently").insertOne(req.body, (err, result)=>{
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