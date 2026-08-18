import React from 'react'
import Navbar from '../components/Navbar';
import api from '../components/Services/api';
import { useState,useEffect } from 'react';

function FeesRecords() {
const [feedata,SetFeesData]=useState([]);

useEffect(()=>{
const fetchdata=async()=>{
  const response=await api.get("/pages/fees");
  SetFeesData(response.data.data);
}
fetchdata();
}
,[]);

  return (
    <div>
      <Navbar/>
      <div className='mt-30 mx-25'>
      <table className="border-2 border-zinc-900">
  <thead>
  <tr>
    <th className="border-2 border-zinc-900">Student name</th>
    <th className="border-2 border-zinc-900">Father name</th>
  <th className="border-2 border-zinc-900">Roll no.</th>
  <th className="border-2 border-zinc-900">Transport fees</th>
  <th className="border-2 border-zinc-900">Tuition fees</th>
  <th className="border-2 border-zinc-900">Extra charges</th>
  <th className="border-2 border-zinc-900">Exam fees</th>
  <th className="border-2 border-zinc-900">Fine</th>
  <th className="border-2 border-zinc-900">Total fees</th>
  <th className="border-2 border-zinc-900">Deposit</th>
  <th className="border-2 border-zinc-900">Balance</th>
  <th className="border-2 border-zinc-900">Date</th>
  <th className="border-2 border-zinc-900">month</th>
  </tr>
  </thead>
{ feedata.map((fees,index)=>(
  <tbody key={index}>
 <tr >
   <td className="border-2 border-zinc-900 p-2 text-center ">{fees.student_name} </td>
   <td className="border-2 border-zinc-900 p-2 text-center ">{fees.father_name} </td>
   <td className="border-2 border-zinc-900 p-2 text-center ">{fees.roll_no} </td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.transport_fees}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.tuition_fees}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.extra_charges}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.exam_fees}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.fine}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.total}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.deposit}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.balance}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.date}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{fees.month}</td>
  
 </tr>
 </tbody>
))
}
  
</table>
      </div>
    </div>
  )
}

export default FeesRecords