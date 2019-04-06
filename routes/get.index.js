var express = require('express');
var router = express.Router();
const connectMongo = require("./connect.mongo.js");
/* GET home page. */
var arrArea = ["nguyen-tri-phuong","nam-hoa-xuan","hoa-xuan-1a","lang-chau-au-1","lang-chau-au-2","dao-vip"];
var realNameArea = ["Nguyễn Tri Phương","Nam Hoà Xuân","Hoà Xuân 1A","Làng Châu Âu 1","Làng Châu Âu 2","Đảo VIP"];
// router.get('/:', function(req, res, next) {
// 	connectMongo(req, query, res);
// })
router.get("/",(req,res,next)=>{
	try{
		connectMongo(req, {}, res, "Bảng giá bất động sản đà nẵng");
	}catch(e){
		res.redirect("/")
	}
})
router.get('/:areaName', function(req, res, next) {
	try{
		var resultName;
		var query = {}
		for (var i = Object.keys(req.query).length - 1; i >= 0; i--) {
			if(Object.values(req.query)[i]!==""&&Object.values(req.query)[i]!=="Khác"){
				query[`${Object.keys(req.query)[i]}`] = Object.values(req.query)[i];
			}
		}
		if(arrArea.indexOf(req.params.areaName)!==-1){
			query["Khu Vực"]=req.params.areaName+"-happy-real";
			resultName = realNameArea[arrArea.indexOf(req.params.areaName)]
		}
		if(Object.keys(req.query).length>0){
			if(query["Giá"]&&query["Giá"].indexOf(";")!==-1){
				let gt = Number(query["Giá"].split(";")[0]);
				let lt = Number(query["Giá"].split(";")[1]);
				query["Giá"] = {
					$gt : gt,
					$lt : lt
				}
			}
		}
		connectMongo(req, query, res, resultName)
	}catch(e){
		res.redirect("/")
	}
});

module.exports = router;