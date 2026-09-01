import Navbar from "../components/Navbar";
import api from "../components/Services/api";
import { useState, useEffect } from "react";

function FeesRecords() {
  const [feedata, SetFeesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH FEES DATA =================

  const fetchdata = async () => {
    try {
      const response = await api.get("/pages/fees");

      SetFeesData(response.data.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // ================= DELETE FEES =================

  const deletedata = async (id) => {
    try {
      setLoading(true);

      await api.delete(`/pages/fees/${id}`);

      // Remove deleted record from UI
      SetFeesData((previousData) =>
        previousData.filter((fees) => fees._id !== id)
      );

      alert("Fee record deleted successfully");

    } catch (error) {
      console.log("Delete error:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to delete data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR / SIDEBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="ml-24 min-h-screen px-5 py-6">

        <div className="mx-auto max-w-full">

          {/* ================= HEADER ================= */}

          <div className="mb-5 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              {/* TITLE */}

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Fees Records
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all student fee records
                </p>
              </div>

              {/* RECORD COUNT */}

              <div className="rounded-lg bg-blue-50 px-5 py-3 text-center">

                <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                  Total Records
                </p>

                <p className="text-2xl font-bold text-blue-700">
                  {feedata.length}
                </p>

              </div>

            </div>

          </div>

          {/* ================= TABLE CARD ================= */}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* TABLE HEADER */}

            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Fee Details
                </h2>

                <p className="text-sm text-slate-500">
                  All submitted fee information
                </p>
              </div>

              <button
                type="button"
                onClick={fetchdata}
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Refresh
              </button>

            </div>

            {/* ================= TABLE ================= */}

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[1500] border-collapse">

                {/* ================= TABLE HEAD ================= */}

                <thead>

                  <tr className="bg-slate-50">

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Student Name
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Father Name
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Roll No.
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Transport
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Tuition
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Extra Charges
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Exam Fees
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Fine
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Total
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Deposit
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Balance
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Date
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Month
                    </th>

                    <th className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-center text-sm font-semibold text-slate-700">
                      Action
                    </th>

                  </tr>

                </thead>

                {/* ================= TABLE BODY ================= */}

                <tbody>

                  {feedata.length > 0 ? (

                    feedata.map((fees) => (

                      <tr
                        key={fees._id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* STUDENT */}

                        <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-800">
                          {fees.student_name || "-"}
                        </td>

                        {/* FATHER */}

                        <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                          {fees.father_name || "-"}
                        </td>

                        {/* ROLL */}

                        <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                          {fees.roll_no || "-"}
                        </td>

                        {/* TRANSPORT */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                          ₹{fees.transport_fees || 0}
                        </td>

                        {/* TUITION */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                          ₹{fees.tuition_fees || 0}
                        </td>

                        {/* EXTRA */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                          ₹{fees.extra_charges || 0}
                        </td>

                        {/* EXAM */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                          ₹{fees.exam_fees || 0}
                        </td>

                        {/* FINE */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                          ₹{fees.fine || 0}
                        </td>

                        {/* TOTAL */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-bold text-blue-700">
                          ₹{fees.total || 0}
                        </td>

                        {/* DEPOSIT */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-semibold text-green-600">
                          ₹{fees.deposit || 0}
                        </td>

                        {/* BALANCE */}

                        <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-semibold text-red-600">
                          ₹{fees.balance || 0}
                        </td>

                        {/* DATE */}

                        <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                          {formatDate(fees.date)}
                        </td>

                        {/* MONTH */}

                        <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                          {fees.month || "-"}
                        </td>

                        {/* ACTION */}

                        <td className="border-b border-slate-100 px-5 py-4 text-center">

                          <button
                            type="button"
                            onClick={() =>
                              deletedata(fees._id)
                            }
                            disabled={loading}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {loading
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    /* ================= EMPTY STATE ================= */

                    <tr>

                      <td
                        colSpan="14"
                        className="px-6 py-16 text-center"
                      >

                        <div className="flex flex-col items-center justify-center">

                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <span className="text-2xl">
                              ₹
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-slate-700">
                            No fee records found
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Fee records will appear here after submission.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {feedata.length}
                </span>{" "}
                fee records
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default FeesRecords;