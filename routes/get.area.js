var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/:area', function(req, res, next) {
	// if(req.user){
		if(req.params.area.indexOf("video")!==-1){
			var ojb = {}
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("video").find().toArray((err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.render("video-happy-real",{"result": result})
					}else{
						res.send(err)
					}
				})
			})
		}else{
			var ojb = {}
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("happy-real-Area").find({"Khu Vực":req.params.area}).toArray((err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.render("khu-vuc-happy-real",{"result": result})
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