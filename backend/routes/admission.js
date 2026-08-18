const express=require('express');
const router=express.Router();
const {admission}=require("../controllers/admissionController");
const {getadmission} =require("../controllers/admissionController");


router.post("/admission",admission);

router.get("/admission",getadmission);

module.exports=router;