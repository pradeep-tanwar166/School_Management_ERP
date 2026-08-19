const express=require('express');
const authMiddleware=require('../middleware/authMiddleware');
const {limiter}=require("../middleware/ratelimiter")
const router=express.Router();

const {signup}=require('../controllers/authcontroller');
const {login}=require('../controllers/authcontroller');

router.post("/signup",limiter,signup);

router.post("/login",limiter,login);





module.exports=router;