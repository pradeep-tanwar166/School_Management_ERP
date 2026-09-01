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


const updateFeesData = async (req, res) => {
  try {
    const fees = await feesdata.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!fees) {
      return res.status(404).json({
        message: "Fee record not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Fee record updated successfully",
      status: true,
      data: fees,
    });

  } catch (error) {
    console.log("UPDATE FEE ERROR:", error);

    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};


const deletefeesdata=async(req,res)=>{
    try{
        const user=await feesdata.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"user not found",
               
            });
        }
            return res.status(200).json({
                message:"Successfully deleted",
            });
        
    }
    catch(error){
        return res.status(500).json({
            message:error.message,
        })
    }
}

module.exports={
    fees,
    getfeesdata,
    updateFeesData,
    deletefeesdata,
}
