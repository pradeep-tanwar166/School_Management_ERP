const express=require('express');
const router=express.Router();
const {admission,getadmission,deleteAdmissiondata,updateAdmissiondata}=require("../controllers/admissionController");

const {limiter}=require("../middleware/ratelimiter");


router.post("/admission",limiter,admission);

router.get("/admission",limiter,getadmission);

router.put("/admission/:id", updateAdmissiondata);


router.delete("/admission/:id",deleteAdmissiondata);

module.exports=router;