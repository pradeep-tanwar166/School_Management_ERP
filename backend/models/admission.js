const mongoose=require('mongoose');


const admissiondata= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    father_name:{
        type:String,
        trim:true,
    },
    mother_name:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
         enum: ['Male', 'Female', 'Other'],
         trim:true,
        required:true,
    },
     adhar_no:{
        type:Number,
        required:true,
        unique:true,
    },
    
    religion:{
        type:String,
        trim:true,
    },

    dateofbirth:{
        type:String,
        required:true,   
        trim:true,
    },
    placeofbirth:{
        type:String,
        trim:true,
    },

    mobile_number:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    address2:{
        type:String,
        trim:true,
    },

    city:{
        type:String,
        required:true,
        trim:true,
    },
    
    state:{
        type:String,
        required:true,
        trim:true,
    },
    postal_code:{
        type:Number,
        required:true,
    },
    createdAt: {
    type: Date,
    default: new Date(),
  }
});

module.exports=mongoose.model("admission",admissiondata);