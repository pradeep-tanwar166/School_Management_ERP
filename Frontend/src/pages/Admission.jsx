import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../components/Services/api";

function Admission() {
  const initialData = {
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
  };

  const [formData, setFormData] = useState(initialData);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // ================= CLEAR FORM =================

  const clearForm = () => {
    setFormData(initialData);
  };

  

  // ================= SAVE / SUBMIT =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      

      const response = await api.post(
        "/pages/admission",
        formData
      );

     

      alert("Admission saved successfully");

      // Clear form after successful submission
      setFormData(initialData);

    } catch (error) {

      console.log(
        "MESSAGE:",
        error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to save admission"
      );
    }
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
                Admission Master
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage student admission information
              </p>
            </div>

         

           
          </div>

          {/* ================= FORM ================= */}

          <form
            id="admissionForm"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= PERSONAL INFORMATION ================= */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                  Personal Information
                </h2>

                <div className="mt-3 h-px bg-cyan-600"></div>

              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                {/* STUDENT NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Student Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* MOTHER NAME */}

                <div>
                  <label
                    htmlFor="mother_name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Mother's Name
                  </label>

                  <input
                    id="mother_name"
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* MOBILE */}

                <div>
                  <label
                    htmlFor="mobile_number"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Mobile Number
                  </label>

                  <input
                    id="mobile_number"
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* GENDER */}

                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
                  <label
                    htmlFor="adhar_no"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Aadhaar Number
                  </label>

                  <input
                    id="adhar_no"
                    type="text"
                    name="adhar_no"
                    value={formData.adhar_no}
                    onChange={handleChange}
                    placeholder="Enter Aadhaar number"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* RELIGION */}

                <div>
                  <label
                    htmlFor="religion"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Religion
                  </label>

                  <input
                    id="religion"
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    placeholder="Enter religion"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* DATE OF BIRTH */}

                <div>
                  <label
                    htmlFor="dateofbirth"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date of Birth
                  </label>

                  <input
                    id="dateofbirth"
                    type="date"
                    name="dateofbirth"
                    value={formData.dateofbirth}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PLACE OF BIRTH */}

                <div>
                  <label
                    htmlFor="placeofbirth"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Place of Birth
                  </label>

                  <input
                    id="placeofbirth"
                    type="text"
                    name="placeofbirth"
                    value={formData.placeofbirth}
                    onChange={handleChange}
                    placeholder="Enter place of birth"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

            </section>

            {/* ================= ADDRESS INFORMATION ================= */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-800">
                  Address Information
                </h2>

                <div className="mt-3 h-px bg-cyan-600"></div>

              </div>

              <div className="space-y-5">

                {/* ADDRESS */}

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* CITY / STATE / POSTAL */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  {/* CITY */}

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* STATE */}

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* POSTAL */}

                  <div>
                    <label
                      htmlFor="postal_code"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postal_code"
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      placeholder="Enter postal code"
                      className="h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                </div>

              </div>

            </section>

            {/* ================= BOTTOM BUTTONS ================= */}

            <div className="flex justify-end gap-3 pb-8">

              <button
                type="button"
                onClick={clearForm}
                className="rounded-lg bg-slate-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-600"
              >
                Clear
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit Admission
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Admission;