var express = require("express");
var router = express.Router({mergeParams: true});
var ejs = require("ejs");

router.get("/",function(req,res){
  res.render("index/home");
});

router.get("/results",function(req,res){
  res.render("index/results");
});

module.exports = router;
