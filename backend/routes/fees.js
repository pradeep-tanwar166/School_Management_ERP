const express=require('express');
const router=express.Router();
const {fees}=require("../controllers/feescontroller");
const {getfeesdata}=require("../controllers/feescontroller");

router.post("/fees",fees);

router.get("/fees",getfeesdata)

module.exports=router;