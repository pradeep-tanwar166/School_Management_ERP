const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    if (!username || !email || !mobile || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
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
    return res.status(201).json({
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
     return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    const loginuser = await user.findOne({ email });
     if (!loginuser) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }


      const match = await bcrypt.compare(password, loginuser.password);
      console.log(match);

      if (!match) {
       return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      }
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      const token = jwt.sign(
        { userid: loginuser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
        status:true,
        message:"Login successfully",
        token,
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
