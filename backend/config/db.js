const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
await mongoose.connect("mongodb://127.0.0.1:27017/school_management");
   console.log('Database connect Successfully');
    }
    catch(error){
console.log(error);

    }
    
}

module.exports=connectDB;