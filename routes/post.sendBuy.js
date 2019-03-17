var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const valid = require("./valid.js");
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");
/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
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
				req.body.status = "inactive";
				req.body.time = Date.now();
				db.collection("buyUrgently").insertOne(req.body, (err, result)=>{
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
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;