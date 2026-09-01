const express=require('express');
const router=express.Router();
const {admission}=require("../controllers/admissionController");
const {getadmission} =require("../controllers/admissionController");
const {deleteAdmissiondata}=require("../controllers/admissionController");
const {updateAdmissiondata}=require("../controllers/admissionController");
const {limiter}=require("../middleware/ratelimiter");


router.post("/admission",limiter,admission);

router.get("/admission",limiter,getadmission);

router.put(
  "/admission/:id",
  (req, res, next) => {
    console.log("================================");
    console.log("UPDATE ROUTE HIT");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("================================");

    next();
  },
  updateAdmissiondata
);


router.delete("/admission/:id",deleteAdmissiondata);

module.exports=router;