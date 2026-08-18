const express=require('express');
const authMiddleware=require('../middleware/authMiddleware');

const router=express.Router();

const {signup}=require('../controllers/authcontroller');
const {login}=require('../controllers/authcontroller');

router.post("/signup",signup);

router.post("/login",login);





module.exports=router;