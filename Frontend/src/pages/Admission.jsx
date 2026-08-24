import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../components/Services/api";

function Admission() {
  const [admissiondata, Setadmissiondata] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    gender: "",
    adhar_no: "",
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

    Setadmissiondata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/pages/admission", admissiondata);

      alert("Student data added");

      Setadmissiondata({
        name: "",
        father_name: "",
        mother_name: "",
        gender: "",
        adhar_no: "",
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

  const handleClear = (event) => {
    event.preventDefault();

    Setadmissiondata({
      name: "",
      father_name: "",
      mother_name: "",
      gender: "",
      adhar_no: "",
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

    alert("Clear admission form");
  };

  const handleNew = () => {
    Setadmissiondata({
      name: "",
      father_name: "",
      mother_name: "",
      gender: "",
      adhar_no: "",
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
  };

  const handleEdit = () => {
    alert("Edit mode enabled");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="w-[95%] mx-auto py-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Admission Master
          </h1>

          {/* TOP BUTTONS */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleNew}
              className="rounded-sm bg-[#3f7f9c] px-5 py-2 text-sm text-white
              hover:bg-[#2c5f75]"
            >
              New
            </button>

            <button
              type="button"
              onClick={handleEdit}
              className="rounded-sm bg-[#3f7f9c] px-5 py-2 text-sm text-white
              hover:bg-[#2c5f75]"
            >
              Edit
            </button>

            <button
              type="submit"
              form="admissionForm"
              className="rounded-sm bg-[#3f7f9c] px-5 py-2 text-sm text-white
              hover:bg-[#2c5f75]"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="rounded-sm bg-[#3f7f9c] px-5 py-2 text-sm text-white
              hover:bg-[#2c5f75]"
            >
              Clear
            </button>
          </div>
        </div>

        <form
          id="admissionForm"
          onSubmit={handleSubmit}
          className="border-t-[3px] border-[#2c7a8c]"
        >

          {/* ======================================================
              STUDENT + PERSONAL INFORMATION
          ======================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4">

            {/* LEFT SECTION */}
            <div
              className="bg-[#d9d3c6] p-5
              border-b-[3px] border-[#2c7a8c]"
            >
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Student Information
              </h2>

              {/* NAME */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Student Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={admissiondata.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* FATHER NAME */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Father Name
                </label>

                <input
                  type="text"
                  name="father_name"
                  value={admissiondata.father_name}
                  onChange={handleChange}
                  placeholder="Enter father name"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* MOTHER NAME */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Mother Name
                </label>

                <input
                  type="text"
                  name="mother_name"
                  value={admissiondata.mother_name}
                  onChange={handleChange}
                  placeholder="Enter mother name"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* MOBILE */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile_number"
                  required
                  value={admissiondata.mobile_number}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* AADHAAR */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Aadhaar No
                </label>

                <input
                  type="text"
                  name="adhar_no"
                  maxLength={12}
                  value={admissiondata.adhar_no}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar number"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div
              className="bg-[#d9d3c6] p-5
              border-b-[3px] border-[#2c7a8c]"
            >
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Personal Information
              </h2>

              {/* GENDER */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Gender
                </label>

                <select
                  name="gender"
                  value={admissiondata.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* RELIGION */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Religion
                </label>

                <input
                  type="text"
                  name="religion"
                  value={admissiondata.religion}
                  onChange={handleChange}
                  placeholder="Enter religion"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* DOB */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateofbirth"
                  required
                  value={admissiondata.dateofbirth}
                  onChange={handleChange}
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* PLACE OF BIRTH */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Place of Birth
                </label>

                <input
                  type="text"
                  name="placeofbirth"
                  value={admissiondata.placeofbirth}
                  onChange={handleChange}
                  placeholder="Enter place of birth"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>
            </div>
          </div>

          {/* ======================================================
              ADDRESS SECTION
          ======================================================= */}

          <div className="mt-5 border-t-[3px] border-[#2c7a8c] pt-4">

            <div
              className="bg-[#d9d3c6] p-5
              border-b-[3px] border-[#2c7a8c]"
            >
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Address Information
              </h2>

              {/* ADDRESS 1 */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Address-1
                </label>

                <input
                  type="text"
                  name="address"
                  value={admissiondata.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* ADDRESS 2 */}
              <div className="grid grid-cols-[150px_1fr] items-center mb-3">
                <label className="text-sm text-gray-800">
                  Address-2
                </label>

                <input
                  type="text"
                  name="address2"
                  value={admissiondata.address2}
                  onChange={handleChange}
                  placeholder="Enter address 2"
                  className="w-full border border-gray-500 bg-[#f4f4f4]
                  px-2 py-1.5 text-sm outline-none
                  focus:border-[#2c7a8c]"
                />
              </div>

              {/* CITY / STATE / POSTAL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="grid grid-cols-[70px_1fr] items-center">
                  <label className="text-sm text-gray-800">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    required
                    value={admissiondata.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-gray-500 bg-[#f4f4f4]
                    px-2 py-1.5 text-sm outline-none
                    focus:border-[#2c7a8c]"
                  />
                </div>

                <div className="grid grid-cols-[70px_1fr] items-center">
                  <label className="text-sm text-gray-800">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    required
                    value={admissiondata.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-gray-500 bg-[#f4f4f4]
                    px-2 py-1.5 text-sm outline-none
                    focus:border-[#2c7a8c]"
                  />
                </div>

                <div className="grid grid-cols-[90px_1fr] items-center">
                  <label className="text-sm text-gray-800">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postal_code"
                    value={admissiondata.postal_code}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="w-full border border-gray-500 bg-[#f4f4f4]
                    px-2 py-1.5 text-sm outline-none
                    focus:border-[#2c7a8c]"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ======================================================
              BOTTOM SECTION
          ======================================================= */}

          <div className="mt-5 border-t-[3px] border-[#2c7a8c] pt-4 pb-10">

            <div
              className="bg-[#d9d3c6] p-5
              border-b-[3px] border-[#2c7a8c]"
            >

              <div className="flex flex-col md:flex-row
                md:items-center gap-4">

                <label className="text-sm text-gray-800 whitespace-nowrap">
                  Entry By User
                </label>

                <input
                  type="text"
                  value="Admin"
                  readOnly
                  className="w-40 border border-gray-500
                  bg-[#f4f4f4] px-2 py-1.5 text-sm"
                />

                <div className="flex gap-2 md:ml-auto">

                  <button
                    type="submit"
                    className="border border-gray-500
                    bg-[#3f7f9c] px-6 py-2
                    text-sm text-white hover:bg-[#2c5f75]"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="border border-gray-500
                    bg-gray-300 px-6 py-2
                    text-sm text-gray-800 hover:bg-gray-400"
                  >
                    Clear
                  </button>

                </div>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Admission;
  