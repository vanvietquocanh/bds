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
				var direction = req.body["Hướng[]"];
				delete req.body["Hướng[]"];
				assert.equal(null, err);
				req.body["Hướng"] = direction;
				req.body["Khu Vực"] = req.params.area;
				req.body["Ngày"]    = Date.now();
				for (var i = 0; i < Object.values(req.body).length; i++) {
					if(!isNaN(Object.values(req.body)[i])&&Object.keys(req.body)[i]!=="Ngày"){
						req.body[Object.keys(req.body)[i]] = Number(Object.values(req.body)[i].replace(/^0+/, ''));
					}
				}
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