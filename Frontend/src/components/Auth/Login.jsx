import React, { useState } from 'react'
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import Signup from './signup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';
function Login() {

  const navigate=useNavigate();
  const [form,SetForm]=useState({
    email:"",
    password:""
  });

  const [hidden,Sethidden]=useState(true);

 const showPassword=(e)=>{
  e.preventDefault();
 Sethidden(!hidden);
  }



  const handleChange=(e)=>{
    const {name,value}=e.target;
    SetForm((prevmode)=>({
      ...prevmode,[name]:value,
    }));
  }

  const  handleSubmit=async (event)=>{
    event.preventDefault();
try{
  let response=await api.post("auth/login",form);
  alert("Login Successfull");
 localStorage.setItem("token", response.data.token);
 navigate("/");
  SetForm({email:"", password:""});
}
catch(error){
  console.log(error);
}
}



  return (
    <div>
  <Navbar/>
  <div className="h-200 flex items-center justify-center bg-blue-300  ">
        <form onSubmit={handleSubmit}
          className=" h-130 w-130  items-center rounded-xl border-none bg-white shadow-2xl"
          action=""
        >
          <h1 className="text-4xl font-bold text-center pb-10 mt-5">
            Login Form                             
          </h1>

          <input
            className="p-2  w-100 ml-10 mb-10 shadow-lg border-none bg-slate-100 rounded-3xl text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email here:"
          />
          <div className='relative '>
          <input
            className="w-100 p-2 ml-10 mb-10 text-gray-900 border-none shadow-lg bg-slate-100 rounded-3xl focus:ring-1 focus:ring-blue-500 focus:outline-none "
            name="password"
            type={hidden ?"password":"text"}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password here :"
          />

          <button className='absolute right-20 mt-2 px-4 py-1.5' onClick={showPassword}>{hidden ? <FaEye /> : <FaEyeSlash /> }</button>
           
</div>
          <div className="flex justify-evenly mb-10 text-gray-500">
            <p>Remember me</p>
            <p>forgot password</p>
          </div>
          <button
            type="submit"
            className="p-2  w-100 ml-10 mb-2 hover:shadow-lg transition delay-150 scale-100 ease-in-out  hover:bg-blue-500  border-none rounded-3xl bg-blue-400 text-white"
          >
            Login
          </button>
          <div className=" flex gap-4  justify-center">
            <p className="text-white  ">Don't have an account ?</p>
            <Link className='text-white hover:text-blue-500' to="/signup">Sign up  </Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login;