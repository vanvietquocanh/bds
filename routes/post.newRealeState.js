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
router.post('/:area', upload.array('photos', 12), function(req, res, next) {
  // if(req.user){
    if(valid(req.body).length>0){
      res.send({"error": valid(req.body)});
    }else{
      req.body.image = []
      for (var i = 0; i < req.files.length; i++) {
        req.body.image.push(`./uploads/${req.files[i].filename}`)
      }
        var direction = req.body["Hướng1"];
        if(req.body["Hướng2"]!==0&&req.body["Hướng2"]!==""&&req.body["Hướng2"]!==undefined){
          direction+= `${", "+req.body["Hướng2"]}`
        }
        delete req.body["Hướng1"];
        delete req.body["Hướng2"];
        req.body["Hướng"] = direction;
        req.body["Khu Vực"] = req.params.area;
        req.body["Ngày"] = Number(req.body["Ngày"])
        for (var i = 0; i < Object.values(req.body).length; i++) {
          if(!isNaN(Object.values(req.body)[i])&&Object.keys(req.body)[i]!=="Vị trí"){
            req.body[Object.keys(req.body)[i]] = parseFloat(Object.values(req.body)[i]);
          }
        }
      mongo.connect(pathMongodb,(err, db)=>{
        db.collection("happy-real-Area").insertOne(req.body, (err, result)=>{
          assert.equal(null, err);
          db.close();
          if(!err){
            res.redirect(`/admin/${req.params.area}`);
          }else{
            res.send("error")
          }
        })
      })
    }
  // }else{
  //  res.redirect("/error")
  // }
});
module.exports = router;