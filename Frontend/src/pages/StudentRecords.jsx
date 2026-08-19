import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import api from '../components/Services/api';
import * as XLSX from "xlsx";


function StudentRecords() {
   const [students,setStudents]=useState([]);
   
     useEffect(()=>{
    const fetchStudents=async()=>{
      const response=await api.get("/pages/admission");
    setStudents(response.data.data);
    };
    fetchStudents();
  },[]);

   const exportToExcel = () => {
    // Convert data into worksheet
    const worksheet = XLSX.utils.json_to_sheet(students);

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Download Excel file
    XLSX.writeFile(workbook, "StudentRecords.xlsx");
  };
  


//   const handleSearch=(e)=>{
//     SetSearchItem(e.target.value);
//   }

//   const searchBar = () => {
//   console.log("Search:", searchitem);
//   console.log("Students:", students);

//  const result = students.find((student) => {
//   const name = student.first_name.trim().toLowerCase();
//   const search = searchitem.trim().toLowerCase();

//   console.log(name, search, name === search);

//   return name === search;
// });
// }
   
  return (
    <div>
      <Navbar/>
<div className="mt-30">
          

          
{/* <input onChange={handleSearch} value={searchitem}  className='border-2 border-black p-4 mb-2 rounded-xl' type="text" placeholder='Search anything' />
<button className='p-4 rounded-xl bg-yellow-500 text-white m-2' onClick={searchBar}>Search</button> */}
           
<table className="border-2 border-zinc-900">
  <thead>
  <tr>
    <th className="border-2 border-zinc-900 px-5">Name</th>
    <th className="border-2 border-zinc-900 px-5">Father name</th>
    <th className="border-2 border-zinc-900 px-5">Mother name</th>
  <th className="border-2 border-zinc-900 px-5">Mobile no.</th>
  <th className="border-2 border-zinc-900 px-5">City</th>
  <th className="border-2 border-zinc-900 px-5">Gender</th>
  <th className="border-2 border-zinc-900 px-5">Adhar Number</th>
  <th className="border-2 border-zinc-900 px-5">Religion</th>
  <th className="border-2 border-zinc-900 px-5">Date of birth</th>
  <th className="border-2 border-zinc-900 px-5">Place of birth</th>
  <th className="border-2 border-zinc-900 px-5">Address</th>
  <th className="border-2 border-zinc-900 px-5">State</th>
  <th className="border-2 border-zinc-900 px-5">Postal/zip</th>
  <th className="border-2 border-zinc-900 px-5">Date of admission</th>
  </tr>
  </thead>
{  students.map((student,index)=>(
  <tbody key={index}>
 <tr >
   <td className="border-2 border-zinc-900 p-2 text-center ">{student.name} </td>
   <td className="border-2 border-zinc-900 p-2 text-center ">{student.father_name} </td>
   <td className="border-2 border-zinc-900 p-2 text-center ">{student.mother_name} </td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.mobile_number}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.city}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.gender}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.adhar_no}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.religion}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.dateofbirth}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.placeofbirth}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.address}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.state}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.postal_code}</td>
  <td className="border-2 border-zinc-900 p-2 text-center">{student.createdAt}</td>
 </tr>
 </tbody>
))
}
  
</table>
  <button
        onClick={exportToExcel}
        className="bg-green-600 text-white px-4 py-2 rounded mt-5 cursor-pointer"
      >
        Export Excel
      </button>
</div>

    </div>
  )
}

export default StudentRecords;
