const mongoose=require('mongoose');

const feesdata=mongoose.Schema({
    date:{
        type:String,
    },
    month:{
        type:String,
    },

    student_name:{
        type:String,
        trim:true,
    },
  
    father_name:{
        type:String,
        trim:true,
    },
    roll_no:{
        type:Number,
    },
    transport_fees:{
        type:Number,
    },
    tuition_fees:{
        type:Number,
    },
    extra_charges:{
        type:Number,
    },
    exam_fees:{
        type:Number,
    },
    fine:{
        type:Number,
    },
    total:{
        type:Number,
    },
    deposit:{
        type:Number,
    },
    balance:{
        type:Number,
    },

     createdAt: {
    type: Date,
    default: new Date(),
  }

});

module.exports=mongoose.model("fees",feesdata);