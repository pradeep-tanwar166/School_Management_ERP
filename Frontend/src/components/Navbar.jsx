import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";
import logo from "../assets/Surya-logo4.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  //   const [theme,SetTheme]=useState(false);

  //   const changeTheme=(e)=>{
  //     e.preventDefault();
  //  SetTheme(!theme);
  //   }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
   alert("Logout Successfull");
    navigate("/login");
  };
  return (
    <div>
      <nav className="h-20 w-full border-2 border-none bg-blue-800 flex justify-evenly fixed z-10000 top-0 items-center">
        <Link to="/">
          <div className="">
            <img
              className="h-20 w-auto object-contain"
              src={logo}
              alt="Not found"
            />
          </div>
        </Link>
        <Link className="text-white text-xl" to="/">
          Home
        </Link>
        <Link className="text-white text-xl" to="/admission">
          Admission
        </Link>
        <Link className="text-white text-xl" to="/fees">
          Fees
        </Link>
        <Link className="text-white text-xl" to="/studentrecords">
          StudentRecords
        </Link>
        <Link className="text-white text-xl" to="/feesrecords">
          FeesRecords
        </Link>
        <div className="auth">
          <Link className="text-white text-xl pr-10" to="/login">
            {" "}
            Login
          </Link>
          <Link className="text-white text-xl" to="/signup">
            {" "}
            Signup
          </Link>
          <button
            className="p-2 bg-blue-400 mx-5 rounded-xl hover:bg-blue-500 text-white text-xl"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        {/* <button onClick={changeTheme} className='text-2xl text-white'>{theme ? <IoSunnyOutline />
:<MdOutlineNightlight />}</button> */}
      </nav>
    </div>
  );
}

export default Navbar;
