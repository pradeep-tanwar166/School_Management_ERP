import { useState } from "react";
import Navbar from "../components/Navbar";
import api from '../components/Services/api';

function Fees() {

  const [feesdata,SetFeesData]=useState({
    date:"",
    month:"",
    student_name:"",
  
    father_name:"",
    roll_no:"",
    transport_fees:"",
    tuition_fees:"",
    extra_charges:"",
    exam_fees:"",
    fine:"",
    total:"",
    deposit:"",
    balance:"",
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;

    SetFeesData((fees)=>({
      ...fees,[name]:value,
    }));
  }

  const handleSubmit=async(event)=>{
    event.preventDefault();
    try{
      await api.post("/pages/fees",feesdata);
     alert("success")
      SetFeesData({
         date:"",
    month:"",
    student_name:"",
 
    father_name:"",
    roll_no:"",
    transport_fees:"",
    tuition_fees:"",
    extra_charges:"",
    exam_fees:"",
    fine:"",
    total:"",
    deposit:"",
    balance:"",
      })
      console.log('successfully');
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className=" ">
      <Navbar />
      <div className="flex items-center justify-center bg-blue-300 ">
      <div className=" mt-30  h-220 w-300 rounded-md border-none shadow-2xl bg-white">
        <h1 className="text-5xl mb-10 mt-5 text-center font-semibold">Fees Form</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-10">
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none border-slate-400 px-2 text-black bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="Date"
              placeholder="Enter the date"
              name="date"
              onChange={handleChange}
              value={feesdata.date}
            />

              <input
                className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
                type="month"
                placeholder="Enter the month "
                name="month"
                onChange={handleChange}
              value={feesdata.month}
              />
          </div>

             <div className="mt-10 ml-10 flex ">
                <label htmlFor="">Student Name</label>
                <input className="border-2  rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg" type="text" name="student_name"
                onChange={handleChange}
              value={feesdata.student_name}  />

           
              </div>

              <div className="mt-10 ml-10 flex">
                <label htmlFor="">Father's name</label>
                <input className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg" type="text" name="father_name"
                onChange={handleChange}
              value={feesdata.father_name}/>
                <label htmlFor="">Roll no.</label>
                <input className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg" type="text" name="roll_no"
                onChange={handleChange}
              value={feesdata.roll_no}/>
              </div>

          <div className="mt-10 ml-10">
            <label htmlFor="">Transport fees</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
             name="transport_fees"
             onChange={handleChange}
              value={feesdata.transport_fees}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Tuition fees</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="tuition_fees"
              onChange={handleChange}
              value={feesdata.tuition_fees}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Extra charges</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="extra_charges"
              onChange={handleChange}
              value={feesdata.extra_charges}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Exam fees</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="exam_fees"
              onChange={handleChange}
              value={feesdata.exam_fees}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">fine</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="fine"
              onChange={handleChange}
              value={feesdata.fine}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Total:</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="total"
              onChange={handleChange}
              value={feesdata.total}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Deposit:</label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="deposit"
              onChange={handleChange}
              value={feesdata.deposit}
            />
          </div>
          <div className="mt-5 ml-10">
            <label htmlFor="">Balance </label>
            <input
              className="border-2 rounded-md mx-2 focus:ring-1 focus:ring-blue-500 outline-none text-black border-slate-400 px-2 bg-slate-100  hover:border-blue-800 hover:shadow-lg"
              type="text"
              name="balance"
              onChange={handleChange}
              value={feesdata.balance}
            />
          </div>
<div className="mt-10 ml-10 flex gap-10">
<button type="submit" className="p-2 border-none bg-blue-500  text-xl rounded-2xl ">Submit</button>
<button className="p-2 border-none bg-red-500  text-xl rounded-2xl ">Clear</button>

</div>
          
        </form>
      </div>
      </div>
    </div>
  );
}

export default Fees;
