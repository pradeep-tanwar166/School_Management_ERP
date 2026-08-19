import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../components/Services/api";
import { useEffect } from "react";


function Admission() {
  const [admissiondata, Setadmissiondata] = useState({
    name: "",
    father_name:"",
    mother_name:"",
    gender: "",
    adhar_no:"",
    religion: "",
    dateofbirth: "",
    placeofbirth: "",
    mobile_number: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    Setadmissiondata((prevmode) => ({
      ...prevmode,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("pages/admission", admissiondata);
      alert('Student data added');
      Setadmissiondata({
        name: "",
        father_name:"",
        mother_name:"",
        gender: "",
        adhar_no:"",
        religion: "",
        dateofbirth: "",
        placeofbirth: "",
        mobile_number: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        postal_code: "",
       
      });
      console.log("Admission data entered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  
const handleClear=(event)=>{
event.preventDefault();
 Setadmissiondata({
        name: "",
       father_name:"",
       mother_name:"",
        gender: "",
        adhar_no:"",
        religion: "",
        dateofbirth: "",
        placeofbirth: "",
        mobile_number: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        postal_code: "",
       
      });
      alert("clear admission form");

}


  return (
    <div className="">
      <Navbar />

      <div className="flex items-center justify-center bg-blue-300">

      <div className=" mt-30 h-250 w-300 rounded-md border-none shadow-2xl bg-white ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-normal p-10 text-center font-semibold">
            Student Enrollment Form
          </h1>
          <hr />
          <h2 className="p-5 text-2xl mx-20">Application form</h2>
          <hr />

          <div className="mt-10 px-5">
            <label htmlFor="name" className="mt-10 mx-5" htmlFor="">
              Name*
            </label>
            <input
            id="name"
              className="border-2 rounded-md mx-2 text-black focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              placeholder="Enter name"
              required
              name="name"
              onChange={handleChange}
              value={admissiondata.name}
            />
            <input
              className="border-2  mx-2 px-2 text-black focus:ring-1 focus:ring-blue-500 outline-none bg-slate-100 rounded-md border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="Enter your father_name"
              name="father_name"
              onChange={handleChange}
              value={admissiondata.father_name}
            />
            <input
              className="border-2 border-slate-400 px-2 text-black focus:ring-1 focus:ring-blue-500 outline-none bg-slate-100 rounded-md hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="Enter your mother name"
              name="mother_name"
              onChange={handleChange}
              value={admissiondata.mother_name}
            />
          </div>

          <div className="m-10">
            <label htmlFor="gender">Gender</label>
            <select
              className=" border-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none mx-2 border-gray-400 hover:border-blue-600"
              onChange={handleChange}
              value={admissiondata.gender}
              name="gender"
              id="gender"
            >
              Enter your Gender
              <option ></option>
              <option className="gender" value="Male">Male</option>
              <option className="gender" value="Female">Female</option>
              <option className="gender" value="Other">Other</option>
            </select>
          </div>

          <div className="m-10">

            
            <label htmlFor="adharcard">AdharCard no.</label>
            <input
            id="adharcard"
              className="mt-5 border-2 px-2 text-black bg-slate-100 rounded-md m-5 focus:ring-1 focus:ring-blue-500 outline-none mx-2 border-slate-400 hover:border-blue-800 hover:shadow-2xl "
              type="number"
              placeholder="Enter your adharCard no."
              name="adhar_no"
              onChange={handleChange}
              value={admissiondata.adhar_no}
            minLength={12}
            />

            <label htmlFor="religion">Religion</label>
            <input
            id="religion"
              className="mt-5 border-2 px-2 text-black bg-slate-100 rounded-md m-5 focus:ring-1 focus:ring-blue-500 outline-none mx-2 border-slate-400 hover:border-blue-800 hover:shadow-2xl "
              type="text"
              placeholder="Enter your religious"
              name="religion"
              onChange={handleChange}
              value={admissiondata.religion}
            
            />
          

            <label htmlFor="dob">Date of birth*</label>
            <input
            id="dob"
              className="mt-5 border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl "
              type="date"
              required
              name="dateofbirth"
              onChange={handleChange}
              value={admissiondata.dateofbirth}
            />
          </div>

          <div className="m-10">
            <label htmlFor="placeofbirth">Enter Place of birth</label>
            <input
            id="placeofbirth"
              className="mt-5 border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none focus:outline-blue-800 border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="Enter your place of birth"
              name="placeofbirth"
              onChange={handleChange}
              value={admissiondata.placeofbirth}
            />
          </div>

          <div className="m-10">
            <label htmlFor="mobile">Enter mobile number*</label>
            <input
            id="mobile"
              className="mt-5 border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="tel"
              placeholder="123-456-7890"
              required
              name="mobile_number"
              onChange={handleChange}
              value={admissiondata.mobile_number}
              min={10}
            />
          </div>

          <div className="m-10">
            <div>
              <label htmlFor="address">Address</label>
              <input
              id="address"
                className="border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl w-200"
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={handleChange}
                value={admissiondata.address}
              />
            </div>
            <div>
              <label htmlFor="address2">Address2</label>
              <input
              id="address2"
                className="border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl w-200 mt-5"
                type="text"
                placeholder="Enter your adddress 2"
                name="address2"
                onChange={handleChange}
                value={admissiondata.address2}
              />
            </div>
          </div>

          <div className="m-10">
            <label htmlFor="city">city*</label>
            <input
            id="city"
              className="border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="Enter your city"
              required
              name="city"
              onChange={handleChange}
              value={admissiondata.city}
            />
            <label htmlFor="state">State*</label>
            <input
            id="state"
              className="border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="Enter your state"
              required
              name="state"
              onChange={handleChange}
              value={admissiondata.state}
            />
          </div>

          <div className="m-10">
            <label htmlFor="postal">Postal/zip code</label>
            <input
            id="postal"
              className="border-2 mx-2 px-2 text-black bg-slate-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 hover:border-blue-800 hover:shadow-2xl"
              type="text"
              placeholder="postal number"
              name="postal_code"
              onChange={handleChange}
              value={admissiondata.postal_code}
            />
          </div>
          <div className="flex gap-5 mx-10">
            <button
              type="submit"
              className="bg-blue-400 p-2 rounded-md border-none text-white text-xl hover:bg-blue-500 "
            >
              Submit
            </button>
            <button  onClick={handleClear} className="bg-red-500 p-2 rounded-md border-none text-white text-xl hover:bg-red-600 ">
              clear
            </button>
          </div>
        </form>
      </div>



</div>

    </div>
  );
}

export default Admission;
