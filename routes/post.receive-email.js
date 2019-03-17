var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

function valEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

/* create router POST */
router.post('/', function(req, res, next) {
	if(req.body.email&&typeof req.body.email==="string"){
		if(valEmail(req.body.email)){
			try{
				mongo.connect(pathMongodb,(err, db)=>{
					assert.equal(null, err);
					req.body.time = Date.now();
					db.collection("emailClient").insertOne(req.body, {ordered:false}, (err, result)=>{
						assert.equal(null, err);
						db.close();
						res.send("success");
					})
				})
			}catch(e){
				res.end();
			}
		}else{
			res.send("invalid Email");
		}
	}else{
		res.send("error")
	}
});

module.exports = router;