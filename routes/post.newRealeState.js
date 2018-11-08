var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/:area', function(req, res, next) {
	// if(req.user){
		console.log(req.body)
		mongo.connect(pathMongodb,(err, db)=>{
			assert.equal(null, err);
			db.collection(req.params.area).insertOne(req.body, (err, result)=>{
				assert.equal(null, err);
					res.send("success");
				db.close();
			})
		})
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;