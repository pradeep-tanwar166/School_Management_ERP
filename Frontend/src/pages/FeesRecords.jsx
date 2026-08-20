import Navbar from '../components/Navbar';
import api from '../components/Services/api';
import { useState, useEffect } from 'react';

function FeesRecords() {
  const [feedata, SetFeesData] = useState([]);

  // Fetch fees data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get("/pages/fees");
        SetFeesData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  // Delete data
  const deletedata = async (id) => {
    try {
      await api.delete(`/pages/fees/${id}`);

      // Remove deleted record from frontend immediately
      SetFeesData((prevData) =>
        prevData.filter((fees) => fees._id !== id)
      );

      alert("Data deleted successfully");
    } catch (error) {
      console.log("DELETE ERROR:", error);
    console.log("Response:", error.response);
    console.log("Response data:", error.response?.data);

    alert(error.response?.data?.message || "Failed to delete data");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-30 m-4">
        <table className="border-2 border-zinc-900">
          <thead>
            <tr>
              <th className="border-2 border-zinc-900 px-5">Student name</th>
              <th className="border-2 border-zinc-900 px-5">Father name</th>
              <th className="border-2 border-zinc-900 px-5">Roll no.</th>
              <th className="border-2 border-zinc-900 px-5">Transport fees</th>
              <th className="border-2 border-zinc-900 px-5">Tuition fees</th>
              <th className="border-2 border-zinc-900 px-5">Extra charges</th>
              <th className="border-2 border-zinc-900 px-5">Exam fees</th>
              <th className="border-2 border-zinc-900 px-5">Fine</th>
              <th className="border-2 border-zinc-900 px-5">Total fees</th>
              <th className="border-2 border-zinc-900 px-5">Deposit</th>
              <th className="border-2 border-zinc-900 px-5">Balance</th>
              <th className="border-2 border-zinc-900 px-5">Date</th>
              <th className="border-2 border-zinc-900 px-5">Month</th>
              <th className="border-2 border-zinc-900 px-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {feedata.map((fees) => (
              <tr key={fees._id}>
                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.student_name}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.father_name}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.roll_no}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.transport_fees}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.tuition_fees}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.extra_charges}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.exam_fees}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.fine}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.total}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.deposit}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.balance}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.date}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                  {fees.month}
                </td>

                <td className="border-2 border-zinc-900 p-2 text-center">
                 <button
  onClick={() => {
    console.log("BUTTON CLICKED");
    console.log("FEES OBJECT:", fees);
    console.log("FEES ID:", fees._id);

    deletedata(fees._id);
  }}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Delete
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeesRecords;