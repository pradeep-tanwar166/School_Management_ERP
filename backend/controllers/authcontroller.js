const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    if (!username || !email || !mobile || !password) {
      return res.status(500).json({
        status: false,
        message: "Internet server error ",
      });
    }

    const exitstinguser = await user.findOne({ email });

    if (exitstinguser) {
      return res.status(500).json({
        status: false,
        message: "User already present",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const signupuser = new user({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await signupuser.save();
    res.status(201).json({
      status: true,
      message: "signup data successfull",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(500).json({
        status: false,
        message: "Internet server error",
      });
    }

    const loginuser = await user.findOne({ email });
     if (!loginuser) {
      return res.status(500).json({
        status: false,
        message: "Not user find",
      });
    }


      const match = await bcrypt.compare(password, loginuser.password);
      console.log(match);

      if (!match) {
       return res.status(404).json({
          status: false,
          message: "user not found",
        });
      }
      // create jwt 

//       const token=jwt.sign({
//         userid:loginuser._id,
        
//       },
//     process.env.JWT_SECRET,
//   {
//     expiresIn:"1d",
//   });
// console.log(token);
//   // store jwt in cookie
//   res.cookie("token",token,{
//     httponly:true,
//     secure:false,
//     sameSite:"lax",
//   });
    
      return res.status(201).json({
        status:true,
        message:"Login successfully",
      })
   
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
