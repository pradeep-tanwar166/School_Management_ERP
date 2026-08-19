const feesdata=require('../models/fees');

const fees=async(req,res)=>{
const {date,month,student_name,father_name,roll_no,transport_fees,tuition_fees,extra_charges,exam_fees,fine,total,deposit,balance}=req.body;
if ([date, month, student_name, father_name, roll_no, transport_fees, tuition_fees, extra_charges, exam_fees, fine, total, deposit, balance].some((value) => value === undefined || value === null || value === "")) {
    return res.status(500).json({
        message:"Enter all the inputs, Check again",
        status:false,
    });
}

    try{
        const feesUser=await new feesdata({
            date,
            month,
            student_name,
            father_name,
            roll_no,
            transport_fees,
            tuition_fees,
            extra_charges,
            exam_fees,
            fine,
            total,
            deposit,
            balance
        });
        await feesUser.save();
        return res.status(201).json({
            message:"Fees data added successfully",
            status:true,
        });
    }
    catch(error){
       return res.status(500).json({
            message:"error",
            status:false,
        })
    }

}

const getfeesdata=async(req,res)=>{
    try{
        const fees=await feesdata.find();
        return res.status(200).json({
            status:true,
            message:"fees data fetched succesfully",
            data:fees,
        });
    }catch(error){
        return res.status(500).json({
            status:false,
            message:"error",
        })
    }
}

module.exports={
    fees,
    getfeesdata,
}
