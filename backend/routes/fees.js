const express=require('express');
const router=express.Router();
const {fees,getfeesdata,deletefeesdata,updatefeesdata}=require("../controllers/feescontroller");
const {limiter}=require("../middleware/ratelimiter")


router.post("/fees",limiter,fees);

router.get("/fees",limiter,getfeesdata)

router.put("/fees/:id",updatefeesdata)

router.delete("/fees/:id", deletefeesdata);

module.exports=router;