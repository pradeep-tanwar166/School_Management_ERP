const express=require('express');
const router=express.Router();
const {admission}=require("../controllers/admissionController");
const {getadmission} =require("../controllers/admissionController");
const {limiter}=require("../middleware/ratelimiter");


router.post("/admission",limiter,admission);

router.get("/admission",limiter,getadmission);

module.exports=router;