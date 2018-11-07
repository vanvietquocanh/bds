var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(req.user){
		res.render("dashboard")
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;