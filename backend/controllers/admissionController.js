const admissiondata = require("../models/admission");

const admission = async (req, res) => {
  const {
    name,
    father_name,
    mother_name,
    gender,
    adhar_no,
    religion,
    dateofbirth,
    placeofbirth,
    mobile_number,
    address,
    address2,
    city,
    state,
    postal_code,
  } = req.body;
  if (
    !name ||
    !father_name ||
    !mother_name ||
    !gender ||
    !dateofbirth ||
    !placeofbirth ||
    !mobile_number ||
    !address ||
    !city ||
    !state ||
    !postal_code ||
    !adhar_no
  ) {
    return res.status(500).json({
      Message: "Enter /fill all the inputs",
      status: false,
    });
  }

  try {
    const admissionuser = new admissiondata({
      name,
      father_name,
      mother_name,
      gender,
      adhar_no,
      religion,
      dateofbirth,
      placeofbirth,
      mobile_number,
      address,
      address2,
      city,
      state,
      postal_code,
    });
    await admissionuser.save();
    return res.status(201).json({
      message: "Admission data successfully entered",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Admission data error",
      status: false,
    });
  }
};

const getadmission = async (req, res) => {
  try {
    const admission = await admissiondata.find();

    return res.status(200).json({
      status: true,
      message: "Admission data fetched successfully",
      data: admission,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error",
    });
  }
};

const deleteAdmissiondata=async(req,res)=>{
  try{
const user=await admissiondata.findByIdAndDelete(req.params.id);
if(!user){
  return res.status(404).json({
    message:"user not found",
    status:false,
  });

  return res.status(200).json({
    message:"Delete data successfull",
  })
}
  }
  catch(error){
     return res.status(500).json({
      message:error.message,
     });
  }
}

module.exports = {
  admission,
  getadmission,
  deleteAdmissiondata,
};
