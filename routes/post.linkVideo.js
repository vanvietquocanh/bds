var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");

/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
		console.log(req.body);
		if(req.body.videoname!==""&&req.body.linkvideo!==""){
			res.send("success")
		}else{
			res.send("invalid")
		}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;