import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../components/Services/api";

function Fees() {
  const initialData = {
    date: "",
    month: "",
    student_name: "",
    father_name: "",
    roll_no: "",
    transport_fees: "",
    tuition_fees: "",
    extra_charges: "",
    exam_fees: "",
    fine: "",
    total: "",
    deposit: "",
    balance: "",
  };

  const [feesdata, SetFeesData] = useState(initialData);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetFeesData((fees) => ({
      ...fees,
      [name]: value,
    }));
  };

  // ================= CLEAR FORM =================

  const handleClear = () => {
    SetFeesData(initialData);
  };

  // ================= NEW =================

  const handleNew = () => {
    SetFeesData(initialData);
  };

  // ================= SUBMIT / SAVE =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send form data to backend
      const response = await api.post(
        "/pages/fees",
        feesdata
      );

      console.log("Fees response:", response.data);

      alert("Fees submitted successfully");

      // Clear form after successful submission
      SetFeesData(initialData);

    } catch (error) {
      console.log("FULL ERROR:", error);

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );

      console.log(
        "MESSAGE:",
        error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit fees"
      );
    }
  };

  // ================= EDIT =================

  const handleEdit = () => {
    alert(
      "Edit mode is ready. Select a fee record to edit."
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="ml-24 min-h-screen px-5 py-6">

        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}

          <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">

            {/* TITLE */}

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Fees Master
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage student fee information
              </p>
            </div>
            
          </div>

          {/* ================= FORM ================= */}

          <form
            id="feesForm"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= STUDENT INFORMATION ================= */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                  Student Information
                </h2>

                <div className="mt-3 h-px bg-cyan-600"></div>

              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                {/* DATE */}

                <div>

                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date
                  </label>

                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={feesdata.date}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* MONTH */}

                <div>

                  <label
                    htmlFor="month"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Fee Month
                  </label>

                  <input
                    id="month"
                    type="month"
                    name="month"
                    value={feesdata.month}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* STUDENT NAME */}

                <div>

                  <label
                    htmlFor="student_name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Student Name
                  </label>

                  <input
                    id="student_name"
                    type="text"
                    name="student_name"
                    value={feesdata.student_name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* FATHER NAME */}

                <div>

                  <label
                    htmlFor="father_name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Father's Name
                  </label>

                  <input
                    id="father_name"
                    type="text"
                    name="father_name"
                    value={feesdata.father_name}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* ROLL NUMBER */}

                <div>

                  <label
                    htmlFor="roll_no"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Roll Number
                  </label>

                  <input
                    id="roll_no"
                    type="text"
                    name="roll_no"
                    value={feesdata.roll_no}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

            </section>

            {/* ================= FEE DETAILS ================= */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                  Fee Details
                </h2>

                <div className="mt-3 h-px bg-cyan-600"></div>

              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                {/* TRANSPORT */}

                <div>

                  <label
                    htmlFor="transport_fees"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Transport Fees
                  </label>

                  <input
                    id="transport_fees"
                    type="number"
                    name="transport_fees"
                    value={feesdata.transport_fees}
                    onChange={handleChange}
                    placeholder="Enter transport fees"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* TUITION */}

                <div>

                  <label
                    htmlFor="tuition_fees"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Tuition Fees
                  </label>

                  <input
                    id="tuition_fees"
                    type="number"
                    name="tuition_fees"
                    value={feesdata.tuition_fees}
                    onChange={handleChange}
                    placeholder="Enter tuition fees"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* EXTRA */}

                <div>

                  <label
                    htmlFor="extra_charges"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Extra Charges
                  </label>

                  <input
                    id="extra_charges"
                    type="number"
                    name="extra_charges"
                    value={feesdata.extra_charges}
                    onChange={handleChange}
                    placeholder="Enter extra charges"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* EXAM */}

                <div>

                  <label
                    htmlFor="exam_fees"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Exam Fees
                  </label>

                  <input
                    id="exam_fees"
                    type="number"
                    name="exam_fees"
                    value={feesdata.exam_fees}
                    onChange={handleChange}
                    placeholder="Enter exam fees"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* FINE */}

                <div>

                  <label
                    htmlFor="fine"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Fine
                  </label>

                  <input
                    id="fine"
                    type="number"
                    name="fine"
                    value={feesdata.fine}
                    onChange={handleChange}
                    placeholder="Enter fine"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

            </section>

            {/* ================= PAYMENT SUMMARY ================= */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                  Payment Summary
                </h2>

                <div className="mt-3 h-px bg-cyan-600"></div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* TOTAL */}

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">

                  <label
                    htmlFor="total"
                    className="mb-2 block text-sm font-semibold text-blue-900"
                  >
                    Total Fees
                  </label>

                  <input
                    id="total"
                    type="number"
                    name="total"
                    value={feesdata.total}
                    onChange={handleChange}
                    placeholder="Total amount"
                    className="h-11 w-full rounded-md border border-blue-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* DEPOSIT */}

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">

                  <label
                    htmlFor="deposit"
                    className="mb-2 block text-sm font-semibold text-green-900"
                  >
                    Deposit
                  </label>

                  <input
                    id="deposit"
                    type="number"
                    name="deposit"
                    value={feesdata.deposit}
                    onChange={handleChange}
                    placeholder="Deposit amount"
                    className="h-11 w-full rounded-md border border-green-200 bg-white px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* BALANCE */}

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">

                  <label
                    htmlFor="balance"
                    className="mb-2 block text-sm font-semibold text-red-900"
                  >
                    Balance
                  </label>

                  <input
                    id="balance"
                    type="number"
                    name="balance"
                    value={feesdata.balance}
                    onChange={handleChange}
                    placeholder="Balance amount"
                    className="h-11 w-full rounded-md border border-red-200 bg-white px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />

                </div>

              </div>

            </section>

            {/* ================= BOTTOM BUTTONS ================= */}

            <div className="flex justify-end gap-3 pb-8">

              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg bg-slate-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-600"
              >
                Clear
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit Fees
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Fees;