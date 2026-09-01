import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../components/Services/api";
import * as XLSX from "xlsx";

import { FaSearch } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function StudentRecords() {
  const [students, SetStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  // ================= EDIT STATES =================

  const [editingStudent, setEditingStudent] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    mobile_number: "",
    city: "",
    gender: "",
    adhar_no: "",
    religion: "",
    dateofbirth: "",
    placeofbirth: "",
    address: "",
    state: "",
    postal_code: "",
  });

  // ================= FETCH STUDENTS =================

  const fetchstudent = async () => {
    try {
      const response = await api.get("/pages/admission");

      SetStudents(response.data.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchstudent();
  }, []);

  // ================= SEARCH =================

  const filteredStudents = students.filter((student) => {
    const search = String(searchItem || "")
      .trim()
      .toLowerCase();

    if (!search) {
      return true;
    }

    return (
      String(student.name || "")
        .toLowerCase()
        .includes(search) ||

      String(student.father_name || "")
        .toLowerCase()
        .includes(search) ||

      String(student.mother_name || "")
        .toLowerCase()
        .includes(search) ||

      String(student.mobile_number || "")
        .toLowerCase()
        .includes(search) ||

      String(student.city || "")
        .toLowerCase()
        .includes(search) ||

      String(student.gender || "")
        .toLowerCase()
        .includes(search) ||

      String(student.adhar_no || "")
        .toLowerCase()
        .includes(search) ||

      String(student.religion || "")
        .toLowerCase()
        .includes(search) ||

      String(student.dateofbirth || "")
        .toLowerCase()
        .includes(search) ||

      String(student.placeofbirth || "")
        .toLowerCase()
        .includes(search) ||

      String(student.address || "")
        .toLowerCase()
        .includes(search) ||

      String(student.state || "")
        .toLowerCase()
        .includes(search) ||

      String(student.postal_code || "")
        .toLowerCase()
        .includes(search)
    );
  });

  // ================= EXPORT TO EXCEL =================

  const exportToExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    XLSX.writeFile(
      workbook,
      "StudentRecords.xlsx"
    );
  };

  // ================= DELETE STUDENT =================

  const deleteStudentData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      console.log("Deleting ID:", id);

      const response = await api.delete(
        `/pages/admission/${id}`
      );

      console.log(
        "Delete response:",
        response.data
      );

      // Remove deleted student from UI
      SetStudents((previousStudents) =>
        previousStudents.filter(
          (student) => student._id !== id
        )
      );

      alert("Student deleted successfully");

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
        error.message ||
        "Failed to delete data"
      );
    }
  };

  // ================= OPEN EDIT FORM =================

  const handleEdit = (student) => {
    console.log("Editing student:", student);

    setEditingStudent(student);

    setEditForm({
      name: student.name || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      mobile_number: student.mobile_number || "",
      city: student.city || "",
      gender: student.gender || "",
      adhar_no: student.adhar_no || "",
      religion: student.religion || "",
      dateofbirth: student.dateofbirth
        ? new Date(student.dateofbirth)
            .toISOString()
            .split("T")[0]
        : "",
      placeofbirth: student.placeofbirth || "",
      address: student.address || "",
      state: student.state || "",
      postal_code: student.postal_code || "",
    });
  };

  // ================= HANDLE EDIT INPUT =================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================= UPDATE STUDENT =================

  const updateStudentData = async (id) => {
    try {
      console.log("Updating ID:", id);
      console.log("Updating data:", editForm);

      const response = await api.put(
        `/pages/admission/${id}`,
        editForm
      );

      console.log(
        "Update response:",
        response.data
      );

      // Refresh student list
      await fetchstudent();

      // Close edit form
      setEditingStudent(null);

      alert("Student updated successfully");

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
        "Failed to update student"
      );
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEdit = () => {
    setEditingStudent(null);

    setEditForm({
      name: "",
      father_name: "",
      mother_name: "",
      mobile_number: "",
      city: "",
      gender: "",
      adhar_no: "",
      religion: "",
      dateofbirth: "",
      placeofbirth: "",
      address: "",
      state: "",
      postal_code: "",
    });
  };

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="ml-24 min-h-screen px-5 py-6">

        <div className="mx-auto max-w-[1600px]">

          {/* ================= HEADER ================= */}

          <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Student Records
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and view all registered students
              </p>
            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap items-center gap-3">

              {/* TOTAL STUDENTS */}

              <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700">

                <FaUsers />

                <span>
                  {students.length} Students
                </span>

              </div>

              {/* EXPORT EXCEL */}

              <button
                type="button"
                onClick={exportToExcel}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                <FaFileExcel />

                Export Excel
              </button>

            </div>

          </div>

          {/* ================= SEARCH BAR ================= */}

          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="relative max-w-xl">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchItem}
                onChange={(e) =>
                  setSearchItem(e.target.value)
                }
                placeholder="Search by name, father name, mobile, city, Aadhaar..."
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              {/* CLEAR SEARCH */}

              {searchItem && (
                <button
                  type="button"
                  onClick={() => setSearchItem("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                >
                  Clear
                </button>
              )}

            </div>

            {/* SEARCH RESULT */}

            {searchItem && (
              <p className="mt-3 text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-700">
                  {filteredStudents.length}
                </span>

                {" "}matching students

              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* ================= EDIT FORM ===================== */}
          {/* ================================================= */}

          {editingStudent && (
            <div className="mb-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              {/* EDIT HEADER */}

              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Edit Student
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update information for{" "}
                    <span className="font-semibold text-slate-700">
                      {editingStudent.name}
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
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
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
                    value={editForm.father_name}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* MOTHER NAME */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mother Name
                  </label>

                  <input
                    type="text"
                    name="mother_name"
                    value={editForm.mother_name}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* MOBILE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="mobile_number"
                    value={editForm.mobile_number}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={editForm.city}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* GENDER */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* AADHAAR */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Aadhaar
                  </label>

                  <input
                    type="text"
                    name="adhar_no"
                    value={editForm.adhar_no}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* RELIGION */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Religion
                  </label>

                  <input
                    type="text"
                    name="religion"
                    value={editForm.religion}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* DATE OF BIRTH */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateofbirth"
                    value={editForm.dateofbirth}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PLACE OF BIRTH */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Place of Birth
                  </label>

                  <input
                    type="text"
                    name="placeofbirth"
                    value={editForm.placeofbirth}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* STATE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={editForm.state}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* POSTAL CODE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postal_code"
                    value={editForm.postal_code}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* ADDRESS */}

                <div className="md:col-span-2 lg:col-span-3">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* UPDATE BUTTON */}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStudentData(
                      editingStudent._id
                    )
                  }
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <MdEdit />

                  Update Student
                </button>

              </div>

            </div>
          )}

          {/* ================= TABLE CARD ================= */}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* TABLE HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div>

                <h2 className="text-lg font-semibold text-slate-800">
                  Student List
                </h2>

                <p className="text-sm text-slate-500">
                  All student admission records
                </p>

              </div>

            </div>

            {/* ================= TABLE ================= */}

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1800px] border-collapse">

                {/* ================= THEAD ================= */}

                <thead>

                  <tr className="bg-slate-50">

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      #
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Student Name
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Father Name
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Mother Name
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Mobile
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      City
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Gender
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Aadhaar
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Religion
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Date of Birth
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Place of Birth
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Address
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      State
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Postal Code
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Admission Date
                    </th>

                    <th className="sticky top-0 border-b border-slate-200 px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                {/* ================= TBODY ================= */}

                <tbody>

                  {filteredStudents.length > 0 ? (

                    filteredStudents.map(
                      (student, index) => (

                        <tr
                          key={student._id}
                          className="border-b border-slate-100 transition hover:bg-blue-50"
                        >

                          {/* NUMBER */}

                          <td className="px-4 py-4 text-sm font-medium text-slate-500">
                            {index + 1}
                          </td>

                          {/* STUDENT */}

                          <td className="px-4 py-4">

                            <div className="font-semibold text-slate-800">
                              {student.name || "-"}
                            </div>

                          </td>

                          {/* FATHER */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.father_name || "-"}
                          </td>

                          {/* MOTHER */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.mother_name || "-"}
                          </td>

                          {/* MOBILE */}

                          <td className="px-4 py-4 text-sm font-medium text-slate-700">
                            {student.mobile_number || "-"}
                          </td>

                          {/* CITY */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.city || "-"}
                          </td>

                          {/* GENDER */}

                          <td className="px-4 py-4">

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {student.gender || "-"}
                            </span>

                          </td>

                          {/* AADHAAR */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.adhar_no || "-"}
                          </td>

                          {/* RELIGION */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.religion || "-"}
                          </td>

                          {/* DOB */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {formatDate(
                              student.dateofbirth
                            )}
                          </td>

                          {/* PLACE OF BIRTH */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.placeofbirth || "-"}
                          </td>

                          {/* ADDRESS */}

                          <td className="max-w-[250] px-4 py-4 text-sm text-slate-600">

                            <div
                              className="truncate"
                              title={student.address || ""}
                            >
                              {student.address || "-"}
                            </div>

                          </td>

                          {/* STATE */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.state || "-"}
                          </td>

                          {/* POSTAL */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {student.postal_code || "-"}
                          </td>

                          {/* ADMISSION DATE */}

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {formatDate(
                              student.createdAt
                            )}
                          </td>

                          {/* ACTIONS */}

                          <td className="px-4 py-4">

                            <div className="flex items-center justify-center gap-3">

                                  {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(student)
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
                                  deleteStudentData(
                                    student._id
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
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

                    /* ================= EMPTY STATE ================= */

                    <tr>

                      <td
                        colSpan="16"
                        className="px-6 py-16 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <FaUsers className="mb-4 text-4xl text-slate-300" />

                          <h3 className="text-lg font-semibold text-slate-700">
                            No students found
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {searchItem
                              ? "Try a different search term."
                              : "Add a new student to see records here."}
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

              <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-semibold text-slate-700">
                  {filteredStudents.length}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-700">
                  {students.length}
                </span>

                {" "}students

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentRecords;