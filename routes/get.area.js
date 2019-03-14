var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const assert = require('assert');
var chatbox = require("./chatbox.js");
var infoCompany = require("./infoCompany.js")
const pathMongodb = require("./mongodb.path.js");
const formControls = `<div class="col-sm-12">
                            <div class="card-box">
                                <div class="form-horizontal text-right" id="form-add">
                                    <div class="form-group" id="form-group">
                                        <div class="col-xs-4">
                                            <input type="text" placeholder="Tên video" name="Tên video" id="videoName" class="form-control m-b-5 col-xs-3">
                                        </div>
                                        <div class="col-xs-4">
                                            <input type="text" placeholder="Link video" name="Link video" id="linkVideo" class="form-control m-b-5 col-xs-3">
                                            <input type="text" id="idVideo" style="display: none;">
                                        </div>
                                        <div class="col-xs-4">
                                            <button type="submit" id="submit" class="btn btn-primary waves-effect w-md waves-light m-b-5 m-t-5" style="width: 100%; margin-top: 0px !important; height: 2.5em">Gửi</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
/* GET home page. */
router.get('/:area', function(req, res, next) {
	// if(req.user){
		function responDataFor(dbName, nameFile, form) {
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection(dbName).find().toArray((err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.render(nameFile, {"result": result, chatbox:chatbox,"infoCompany":infoCompany,"formControls":form})
					}else{
						res.send(err)
					}
				})
			})
		}
		if(req.params.area.indexOf("video")!==-1){
			responDataFor("video", `admin-video-${infoCompany.companyName.split(" ").join("-").toLowerCase()}`, formControls);
		}else if(req.params.area.indexOf("gui-ban")!==-1){
			responDataFor("buyUrgently", `admin-video-${infoCompany.companyName.split(" ").join("-").toLowerCase()}`, "");
		}else{
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection("happy-real-Area").find({"Khu Vực":req.params.area}).toArray((err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.render("khu-vuc-happy-real", {"result": result, "infoCompany":infoCompany})
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