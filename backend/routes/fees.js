const express=require('express');
const router=express.Router();
const {fees}=require("../controllers/feescontroller");
const {getfeesdata}=require("../controllers/feescontroller");
const {limiter}=require("../middleware/ratelimiter")

router.post("/fees",limiter,fees);

router.get("/fees",limiter,getfeesdata)

module.exports=router;