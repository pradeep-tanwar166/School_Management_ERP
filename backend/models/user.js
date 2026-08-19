const mongoose=require('mongoose');

const userdata=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    mobile:{
        type:Number,
        required:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },

 
});

module.exports=mongoose.model('user',userdata);