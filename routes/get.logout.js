var express = require('express');
var router = express.Router();

/* GET Log Out */

router.get('/', function(req, res, next) {
	req.logout();
	res.redirect("/");
});

module.exports = router;