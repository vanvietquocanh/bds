var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");
const multer = require("multer")
var produceImage = require('./produce.image.js');
/* POST new real estate. */
const storage = multer.diskStorage(produceImage)
const upload = multer( { storage: storage } );

router.post('/', upload.array('photos', 12), function(req, res, next) {
	// if(req.user){
		// /(09|07|08|03|05)+([0-9]{8})\b/g
		console.log(req.body, valid(req.body).length);
		if(valid(req.body).length>0){
		      res.send({"error": valid(req.body)});
		}else{
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				console.log(req.body);
				req.body.active = false;
				db.collection("saleArea").insertOne(req.body, (err, result)=>{
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