import { useState } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from '../Services/api';

function Signup() {
  const [signupdata,SetSignUpData]=useState({username:"",
    email:"",
    mobile:"",
    password:"",
  });

  const [hidden,Sethidden]=useState(false);
   const showPassword=(e)=>{
  e.preventDefault();
 Sethidden(!hidden);
  }



  const handleChange=(e)=>{
    const {name,value}=e.target;
    SetSignUpData((prevmode)=>({
      ...prevmode,[name]:value,
    }));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await api.post("/auth/signup",signupdata);
      alert("Account created Sucessfully");
   SetSignUpData({username:"",email:"",mobile:"",password:""});
    console.log('Signup data successfully added');
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <div>
      <Navbar/>
         <div className="h-175 flex items-center justify-center bg-blue-300 ">
        <form
          onSubmit={handleSubmit}
          className=" h-130 w-130  mt-25 items-center rounded-xl  border-none bg-white shadow-2xl"
          action=""
        >
          <h1 className="text-2xl text-center pb-10 mt-5">Sign up form </h1>

          <input
            className="p-2 w-100 ml-10 mb-10 shadow-lg border-none bg-slate-100 focus:ring-1 focus:ring-blue-500 outline-none  rounded-3xl"
            type="text"
            name="username"
            onChange={handleChange}
            value={signupdata.username}
            placeholder="Enter your username here: "
          />

          <input
            className="p-2  w-100 ml-10 mb-10 shadow-lg border-none focus:ring-1 focus:ring-blue-500 outline-none bg-slate-100 rounded-3xl"
            type="email"
            name="email"
            value={signupdata.email}
            onChange={handleChange}
            placeholder="Enter your email here:"
          />
          <br />
          <input
            className="p-2  w-100 ml-10 mb-10 shadow-lg border-none focus:ring-1 focus:ring-blue-500 outline-none bg-slate-100 rounded-3xl"
            type="number"
            name="mobile"
            value={signupdata.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number here:"
          />
          <div className='relative'>
          <input
            className="p-2  w-100 ml-10 mb-10 shadow-lg border-none focus:ring-1 focus:ring-blue-500 outline-none bg-slate-100 rounded-3xl"
            type={hidden ?"password":"text"}
            name="password"
            value={signupdata.password}
            onChange={handleChange}
            placeholder="Enter your password here :"
          />

             <button className='absolute right-20 mt-2 px-4 py-1.5' onClick={showPassword}>{hidden ? <FaEye /> : <FaEyeSlash /> }</button>
             </div>

          <button
            className="p-2  w-100 ml-10 mb-2 hover:shadow-lg transition delay-150 scale-100 ease-in-out hover:bg-blue-500  border-none rounded-3xl bg-blue-400 text-white"
             type='submit'
          >
            Submit
          </button>
          <div className=" flex gap-4  justify-center">
            <p className="text-gray-500  ">Already have an account ?</p>
            <Link className="text-blue-400 hover:text-blue-600 " to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
