var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");
const valid = require("./valid.js");
/* POST new real estate. */

router.post('/', function(req, res, next) {
	if(valid(req.body).length>0){
	    res.render("success",{	
								"status":"Lỗi", 
								"msg":"Vui lòng điền đúng các thông tin trên",
								"msgErr": valid(req.body), 
								"events":"goBack()", 
								"btn":"Go Back"
							});
	}else{
		mongo.connect(pathMongodb,(err, db)=>{
			assert.equal(null, err);
			req.body.time = Date.now();
			db.collection("saleArea").insertOne(req.body, (err, result)=>{
				assert.equal(null, err);
				db.close();
				if(!err){
					res.render("success",{
											"status":"Thành công",
											"msg":"Vui lòng đợi chúng tôi xác thực thông tin yêu cầu!",
											"events":"goHome()", 
											"btn":"Go Home"});
				}else{
					res.render("success",{
											"status":"Lỗi", 
											"msg":"Vui lòng báo lại với chúng tôi nếu thấy thông báo này!",
											"msgErr": ["Lỗi Database!"], 
											"events":"goBack()", 
											"btn":"Go Back"});
				}
			})
		})
	}
});

module.exports = router;