var express = require('express');
var router = express.Router();
var request = require("request");
var zlib = require('zlib');
/* GET home page. */
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
router.post('/', function(req, res, next) {
	console.log(req);
	// var otp = {
	// 	url:'https://datnenhoaxuan.com/action.php',
	// 	headers: {
	// 		"Accept": "application/json, text/javascript, */*; q=0.01",
	// 		"Accept-Encoding": "gzip, deflate, br",
	// 		"Accept-Language": 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
	// 		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	// 		"Connection": "keep-alive",
	// 		"Cookie": "PHPSESSID=suogfk9ktt5ek3ki87gurnplk3; _ga=GA1.2.1063143707.1541784971; _gid=GA1.2.1487688221.1541784971; _fbp=fb.1.1541784984657.1214522890; __atuvc=9%7C45; __atuvs=5be5d9e8aa49686e003",
	// 	    "Host": "datnenhoaxuan.com",
	// 		"Origin": "https://datnenhoaxuan.com",
	// 		"Referer": "https://datnenhoaxuan.com/b2-106-lo-87-khu-do-thi-nam-hoa-xuan",
	// 		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
	// 	},
	// 	form: {
	// 		url: "vi_year", 
	// 		id_product:"2032", 
	// 		year: "1995", 
	// 		gender: "1"
	// 	}
	// }
	// request.post(otp, (err,httpResponse,body)=>{
	// 	console.log(httpResponse);
	// })
});

module.exports = router;