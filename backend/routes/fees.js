const express=require('express');
const router=express.Router();
const {fees,getfeesdata,updateFeesData,deletefeesdata}=require("../controllers/feescontroller");
const {limiter}=require("../middleware/ratelimiter")


router.post("/fees",limiter,fees);

router.get("/fees",limiter,getfeesdata)

router.put("/fees/:id",updateFeesData)

router.delete("/fees/:id", deletefeesdata);

module.exports=router;