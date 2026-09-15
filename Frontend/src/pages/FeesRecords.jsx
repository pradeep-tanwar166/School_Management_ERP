import Navbar from "../components/Navbar";
import api from "../components/Services/api";
import { useState, useEffect } from "react";

import { FaSearch, FaPrint, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import jsPDF from "jspdf";
import { toast } from "sonner";


function FeesRecords() {

  // =========================================================
  // STATE
  // =========================================================

  const [feedata, SetFeesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= SEARCH =================

  const [searchItem, setSearchItem] = useState("");

  // ================= EDIT =================

  const [editingFee, setEditingFee] = useState(null);

  const [editForm, setEditForm] = useState({
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
    date: "",
    month: "",
  });


  // =========================================================
  // FETCH FEES DATA
  // =========================================================

  const fetchdata = async () => {

    try {

      setLoading(true);

      const response = await api.get("/pages/fees");

      SetFeesData(response.data.data || []);

    } catch (error) {

      console.log("Fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch fee records"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchdata();
  }, []);


  // =========================================================
  // SEARCH STUDENT
  // =========================================================

  const filteredFees = feedata.filter((fees) => {

    const search = searchItem
      .trim()
      .toLowerCase();

    if (!search) {
      return true;
    }

    return (
      String(fees.student_name || "")
        .toLowerCase()
        .includes(search) ||

      String(fees.father_name || "")
        .toLowerCase()
        .includes(search) ||

      String(fees.roll_no || "")
        .toLowerCase()
        .includes(search)
    );

  });


  // =========================================================
  // DELETE FEES
  // =========================================================

  const deletedata = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      setLoading(true);

      await api.delete(`/pages/fees/${id}`);

      // Remove deleted record from UI

      SetFeesData((previousData) =>
        previousData.filter(
          (fees) => fees._id !== id
        )
      );

      alert(
        "Fee record deleted successfully"
      );

    } catch (error) {

      console.log(
        "Delete error:",
        error
      );

      console.log(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete data"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const formattedDate =
      new Date(date);

    if (
      isNaN(
        formattedDate.getTime()
      )
    ) {
      return date;
    }

    return formattedDate.toLocaleDateString(
      "en-IN"
    );
  };


  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const handleEdit = (fees) => {

    console.log(
      "Editing fee:",
      fees
    );

    setEditingFee(fees);

    setEditForm({

      student_name:
        fees.student_name || "",

      father_name:
        fees.father_name || "",

      roll_no:
        fees.roll_no || "",

      transport_fees:
        fees.transport_fees ?? "",

      tuition_fees:
        fees.tuition_fees ?? "",

      extra_charges:
        fees.extra_charges ?? "",

      exam_fees:
        fees.exam_fees ?? "",

      fine:
        fees.fine ?? "",

      total:
        fees.total ?? "",

      deposit:
        fees.deposit ?? "",

      balance:
        fees.balance ?? "",

      date: fees.date
        ? new Date(fees.date)
            .toISOString()
            .split("T")[0]
        : "",

      month:
        fees.month || "",

    });
  };


  // =========================================================
  // HANDLE EDIT CHANGE
  // =========================================================

  const handleEditChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setEditForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  // =========================================================
  // UPDATE FEE
  // =========================================================

  const updateFeeData = async (id) => {

    try {

      console.log(
        "Updating Fee ID:",
        id
      );

      console.log(
        "Updating Fee Data:",
        editForm
      );

      await api.put(
        `/pages/fees/${id}`,
        editForm
      );

      // Refresh data

      await fetchdata();

      // Close edit form

      setEditingFee(null);

      alert(
        "Fee record updated successfully"
      );

    } catch (error) {

      console.log(
        "FULL UPDATE ERROR:",
        error
      );

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
          error.message ||
          "Failed to update fee record"
      );

    }
  };


  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const cancelEdit = () => {

    setEditingFee(null);

    setEditForm({

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
      date: "",
      month: "",

    });
  };


  // =========================================================
  // PRINT / DOWNLOAD PDF
  // =========================================================

  const handlePrint = (fees) => {

    try {

      // =====================================================
      // CREATE PDF
      // =====================================================

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });


      // =====================================================
      // PAGE SETTINGS
      // =====================================================

      const pageWidth = 210;

      const pageHeight = 297;

      const margin = 15;


      // =====================================================
      // COLORS
      // =====================================================

      const blue = [30, 64, 175];

      const dark = [30, 41, 59];

      const gray = [100, 116, 139];

      const lightGray = [
        241,
        245,
        249,
      ];

      const green = [
        22,
        163,
        74,
      ];

      const red = [
        220,
        38,
        38,
      ];

      const border = [
        203,
        213,
        225,
      ];


      // =====================================================
      // HELPER
      // =====================================================

      const money = (value) => {

        return `Rs. ${Number(
          value || 0
        ).toLocaleString("en-IN")}`;

      };


      const safeText = (value) => {

        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          return "-";
        }

        return String(value);

      };


      // =====================================================
      // SCHOOL HEADER
      // =====================================================

      pdf.setTextColor(
        ...blue
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(25);

      pdf.text(
        "SURYA SCHOOL",
        pageWidth / 2,
        20,
        {
          align: "center",
        }
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "",
        pageWidth / 2,
        27,
        {
          align: "center",
        }
      );


      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(16);

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        "FEE PAYMENT RECEIPT",
        pageWidth / 2,
        35,
        {
          align: "center",
        }
      );


      // Header line

      pdf.setDrawColor(
        ...blue
      );

      pdf.setLineWidth(1);

      pdf.line(
        margin,
        41,
        pageWidth - margin,
        41
      );


      // =====================================================
      // STUDENT INFORMATION
      // =====================================================

      let y = 50;


      pdf.setDrawColor(
        ...border
      );

      pdf.setLineWidth(0.4);

      pdf.roundedRect(
        margin,
        y,
        pageWidth - margin * 2,
        48,
        3,
        3
      );


      // Title

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(12);

      pdf.setTextColor(
        ...blue
      );

      pdf.text(
        "STUDENT INFORMATION",
        margin + 5,
        y + 8
      );


      // Divider

      pdf.setDrawColor(
        ...border
      );

      pdf.line(
        margin + 5,
        y + 11,
        pageWidth - margin - 5,
        y + 11
      );


      // -----------------------------------------------------
      // STUDENT NAME
      // -----------------------------------------------------

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(9);

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "Student Name",
        margin + 5,
        y + 19
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        safeText(
          fees.student_name
        ),
        margin + 5,
        y + 25
      );


      // -----------------------------------------------------
      // FATHER NAME
      // -----------------------------------------------------

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "Father Name",
        110,
        y + 19
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        safeText(
          fees.father_name
        ),
        110,
        y + 25
      );


      // -----------------------------------------------------
      // ROLL NO
      // -----------------------------------------------------

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "Roll No.",
        margin + 5,
        y + 35
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        safeText(
          fees.roll_no
        ),
        margin + 5,
        y + 41
      );


      // -----------------------------------------------------
      // MONTH
      // -----------------------------------------------------

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "Month",
        70,
        y + 35
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        safeText(
          fees.month
        ),
        70,
        y + 41
      );


      // -----------------------------------------------------
      // DATE
      // -----------------------------------------------------

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setTextColor(
        ...gray
      );

      pdf.text(
        "Payment Date",
        125,
        y + 35
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setTextColor(
        ...dark
      );

      pdf.text(
        formatDate(
          fees.date
        ),
        125,
        y + 41
      );


      // =====================================================
      // FEE DETAILS
      // =====================================================

      y = 108;


      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(13);

      pdf.setTextColor(
        ...blue
      );

      pdf.text(
        "FEE DETAILS",
        margin,
        y
      );


      y += 7;


      // =====================================================
      // TABLE SETTINGS
      // =====================================================

      const tableX = margin;

      const tableWidth =
        pageWidth - margin * 2;


      // =====================================================
      // TABLE HEADER
      // =====================================================

      pdf.setFillColor(
        ...lightGray
      );

      pdf.setDrawColor(
        ...border
      );

      pdf.rect(
        tableX,
        y,
        tableWidth,
        10,
        "FD"
      );


      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...dark
      );


      pdf.text(
        "Fee Description",
        tableX + 5,
        y + 6.5
      );


      pdf.text(
        "Amount",
        tableX +
          tableWidth -
          5,
        y + 6.5,
        {
          align: "right",
        }
      );


      y += 10;


      // =====================================================
      // ADD TABLE ROW
      // =====================================================

      const addRow = (
        label,
        value,
        options = {}
      ) => {

        const rowHeight =
          options.height || 10;


        // Background

        if (
          options.background
        ) {

          pdf.setFillColor(
            ...options.background
          );

        } else {

          pdf.setFillColor(
            255,
            255,
            255
          );

        }


        // Border

        pdf.setDrawColor(
          ...border
        );


        pdf.rect(
          tableX,
          y,
          tableWidth,
          rowHeight,
          "FD"
        );


        // Font

        pdf.setFont(
          "helvetica",
          options.bold
            ? "bold"
            : "normal"
        );


        pdf.setFontSize(
          options.fontSize || 10
        );


        pdf.setTextColor(
          ...(options.textColor ||
            dark)
        );


        // Label

        pdf.text(
          label,
          tableX + 5,
          y + rowHeight / 2 + 1.5
        );


        // Amount

        pdf.text(
          money(value),
          tableX +
            tableWidth -
            5,
          y + rowHeight / 2 + 1.5,
          {
            align: "right",
          }
        );


        y += rowHeight;

      };


      // =====================================================
      // FEE ROWS
      // =====================================================

      addRow(
        "Transport Fees",
        fees.transport_fees
      );


      addRow(
        "Tuition Fees",
        fees.tuition_fees
      );


      addRow(
        "Extra Charges",
        fees.extra_charges
      );


      addRow(
        "Exam Fees",
        fees.exam_fees
      );


      addRow(
        "Fine",
        fees.fine
      );


      // =====================================================
      // TOTAL
      // =====================================================

      addRow(
        "TOTAL FEES",
        fees.total,
        {
          bold: true,
          fontSize: 11,
          background: [
            239,
            246,
            255,
          ],
          textColor: blue,
          height: 13,
        }
      );


      // =====================================================
      // DEPOSIT
      // =====================================================

      addRow(
        "DEPOSIT / PAID",
        fees.deposit,
        {
          bold: true,
          fontSize: 11,
          background: [
            240,
            253,
            244,
          ],
          textColor: green,
          height: 13,
        }
      );


      // =====================================================
      // BALANCE
      // =====================================================

      addRow(
        "REMAINING BALANCE",
        fees.balance,
        {
          bold: true,
          fontSize: 12,
          background: [
            254,
            242,
            242,
          ],
          textColor: red,
          height: 14,
        }
      );


      // =====================================================
      // PAYMENT STATUS
      // =====================================================

      y += 12;


      const balance =
        Number(
          fees.balance || 0
        );


      const paymentStatus =
        balance > 0
          ? "PARTIALLY PAID"
          : "FULLY PAID";


      pdf.setDrawColor(
        ...border
      );


      pdf.roundedRect(
        margin,
        y,
        tableWidth,
        17,
        3,
        3
      );


      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...gray
      );


      pdf.text(
        "PAYMENT STATUS",
        margin + 5,
        y + 10.5
      );


      if (balance > 0) {

        pdf.setTextColor(
          180,
          83,
          9
        );

      } else {

        pdf.setTextColor(
          ...green
        );

      }


      pdf.text(
        paymentStatus,
        pageWidth -
          margin -
          5,
        y + 10.5,
        {
          align: "right",
        }
      );


      // =====================================================
      // SIGNATURES
      // =====================================================

      y = 250;


      pdf.setDrawColor(
        ...dark
      );

      pdf.setLineWidth(
        0.4
      );


      // Parent Signature

      pdf.line(
        25,
        y,
        80,
        y
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(9);

      pdf.setTextColor(
        ...dark
      );


      pdf.text(
        "Parent Signature",
        52.5,
        y + 6,
        {
          align: "center",
        }
      );


      // Authorized Signature

      pdf.line(
        130,
        y,
        185,
        y
      );


      pdf.text(
        "Authorized Signature",
        157.5,
        y + 6,
        {
          align: "center",
        }
      );


      // =====================================================
      // FOOTER
      // =====================================================

      pdf.setDrawColor(
        ...border
      );


      pdf.line(
        margin,
        270,
        pageWidth - margin,
        270
      );


      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(11);

      pdf.setTextColor(
        ...blue
      );


      pdf.text(
        "",
        pageWidth / 2,
        278,
        {
          align: "center",
        }
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.setTextColor(
        ...gray
      );


      pdf.text(
        "Generated by SuryaERP",
        pageWidth / 2,
        284,
        {
          align: "center",
        }
      );


      // =====================================================
      // FILE NAME
      // =====================================================

      const studentName =
        fees.student_name
          ?.replace(
            /[^a-zA-Z0-9]/g,
            "_"
          ) || "Student";


      const rollNo =
        fees.roll_no ||
        "Unknown";


      const month =
        fees.month ||
        "Fee";


      const fileName =
        `Fee_Receipt_${studentName}_${rollNo}_${month}.pdf`;


      // =====================================================
      // DOWNLOAD PDF
      // =====================================================

      pdf.save(
        fileName
      );


    } catch (error) {

      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "Failed to generate fee receipt PDF"
      );

    }

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="ml-24 min-h-screen px-5 py-6">

        <div className="mx-auto max-w-full">


          {/* =================================================
              HEADER
          ================================================== */}

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


          {/* =================================================
              SEARCH
          ================================================== */}

          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="relative max-w-xl">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />


              <input
                type="text"
                value={searchItem}
                onChange={(e) =>
                  setSearchItem(
                    e.target.value
                  )
                }
                placeholder="Search student by name, father name or roll number..."
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 pl-11 pr-20 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />


              {searchItem && (

                <button
                  type="button"
                  onClick={() =>
                    setSearchItem("")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                >
                  Clear
                </button>

              )}

            </div>


            {searchItem && (

              <p className="mt-3 text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-700">
                  {filteredFees.length}
                </span>

                {" "}matching fee records

              </p>

            )}

          </div>


          {/* =================================================
              EDIT FORM
          ================================================== */}

          {editingFee && (

            <div className="mb-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


              {/* EDIT HEADER */}

              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Update Fee Record
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Update fee information for{" "}

                    <span className="font-semibold text-slate-700">
                      {editingFee.student_name}
                    </span>

                  </p>

                </div>


                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                >
                  Cancel
                </button>

              </div>


              {/* FORM */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">


                {/* STUDENT NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="student_name"
                    value={
                      editForm.student_name
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* FATHER NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Father Name
                  </label>

                  <input
                    type="text"
                    name="father_name"
                    value={
                      editForm.father_name
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* ROLL NUMBER */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Roll No.
                  </label>

                  <input
                    type="text"
                    name="roll_no"
                    value={
                      editForm.roll_no
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* TRANSPORT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Transport Fees
                  </label>

                  <input
                    type="number"
                    name="transport_fees"
                    value={
                      editForm.transport_fees
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* TUITION */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Tuition Fees
                  </label>

                  <input
                    type="number"
                    name="tuition_fees"
                    value={
                      editForm.tuition_fees
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* EXTRA CHARGES */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Extra Charges
                  </label>

                  <input
                    type="number"
                    name="extra_charges"
                    value={
                      editForm.extra_charges
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* EXAM */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Exam Fees
                  </label>

                  <input
                    type="number"
                    name="exam_fees"
                    value={
                      editForm.exam_fees
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* FINE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Fine
                  </label>

                  <input
                    type="number"
                    name="fine"
                    value={
                      editForm.fine
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* TOTAL */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Total
                  </label>

                  <input
                    type="number"
                    name="total"
                    value={
                      editForm.total
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* DEPOSIT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Deposit
                  </label>

                  <input
                    type="number"
                    name="deposit"
                    value={
                      editForm.deposit
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* BALANCE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Balance
                  </label>

                  <input
                    type="number"
                    name="balance"
                    value={
                      editForm.balance
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* DATE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={
                      editForm.date
                    }
                    onChange={
                      handleEditChange
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* MONTH */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Month
                  </label>

                  <input
                    type="text"
                    name="month"
                    value={
                      editForm.month
                    }
                    onChange={
                      handleEditChange
                    }
                    placeholder="e.g. 2026-07"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* UPDATE BUTTONS */}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={
                    cancelEdit
                  }
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>


                <button
                  type="button"
                  onClick={() =>
                    updateFeeData(
                      editingFee._id
                    )
                  }
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <MdEdit />

                  Update Fee

                </button>

              </div>

            </div>

          )}


          {/* =================================================
              TABLE CARD
          ================================================== */}

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
                onClick={
                  fetchdata
                }
                disabled={
                  loading
                }
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : "Refresh"}
              </button>

            </div>


            {/* =================================================
                TABLE
            ================================================== */}

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[1500] border-collapse">


                {/* TABLE HEAD */}

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
                      Actions
                    </th>

                  </tr>

                </thead>


                {/* =================================================
                    TABLE BODY
                ================================================== */}

                <tbody>

                  {filteredFees.length > 0 ? (

                    filteredFees.map(
                      (fees) => (

                        <tr
                          key={
                            fees._id
                          }
                          className="transition hover:bg-slate-50"
                        >


                          {/* STUDENT */}

                          <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-800">
                            {
                              fees.student_name ||
                              "-"
                            }
                          </td>


                          {/* FATHER */}

                          <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                            {
                              fees.father_name ||
                              "-"
                            }
                          </td>


                          {/* ROLL */}

                          <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                            {
                              fees.roll_no ||
                              "-"
                            }
                          </td>


                          {/* TRANSPORT */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                            ₹
                            {
                              fees.transport_fees ||
                              0
                            }
                          </td>


                          {/* TUITION */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                            ₹
                            {
                              fees.tuition_fees ||
                              0
                            }
                          </td>


                          {/* EXTRA */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                            ₹
                            {
                              fees.extra_charges ||
                              0
                            }
                          </td>


                          {/* EXAM */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                            ₹
                            {
                              fees.exam_fees ||
                              0
                            }
                          </td>


                          {/* FINE */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm text-slate-600">
                            ₹
                            {
                              fees.fine ||
                              0
                            }
                          </td>


                          {/* TOTAL */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-bold text-blue-700">
                            ₹
                            {
                              fees.total ||
                              0
                            }
                          </td>


                          {/* DEPOSIT */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-semibold text-green-600">
                            ₹
                            {
                              fees.deposit ||
                              0
                            }
                          </td>


                          {/* BALANCE */}

                          <td className="border-b border-slate-100 px-5 py-4 text-right text-sm font-semibold text-red-600">
                            ₹
                            {
                              fees.balance ||
                              0
                            }
                          </td>


                          {/* DATE */}

                          <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                            {
                              formatDate(
                                fees.date
                              )
                            }
                          </td>


                          {/* MONTH */}

                          <td className="whitespace-nowrap border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                            {
                              fees.month ||
                              "-"
                            }
                          </td>


                          {/* =================================================
                              ACTIONS
                          ================================================== */}

                          <td className="border-b border-slate-100 px-5 py-4 text-center">

                            <div className="flex items-center justify-center gap-2">


                              {/* PRINT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handlePrint(
                                    fees
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                              >

                                <FaPrint />

                                Print

                              </button>


                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    fees
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
                              >

                                <MdEdit />

                                Edit

                              </button>


                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  deletedata(
                                    fees._id
                                  )
                                }
                                disabled={
                                  loading
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                              >

                                <FaTrash />

                                Delete

                              </button>

                            </div>

                          </td>


                        </tr>

                      )
                    )

                  ) : (

                    /* =================================================
                       EMPTY STATE
                    ================================================== */

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

                            {searchItem
                              ? "No student found with this name."
                              : "Fee records will appear here after submission."}

                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* =================================================
                TABLE FOOTER
            ================================================== */}

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-700">
                  {
                    filteredFees.length
                  }
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-700">
                  {
                    feedata.length
                  }
                </span>

                {" "}fee records

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}


export default FeesRecords;