import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";

function Signup() {
  const [signupdata, SetSignUpData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [hidden, Sethidden] = useState(true);
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetSignUpData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ================= SHOW PASSWORD =================

  const showPassword = () => {
    Sethidden((previous) => !previous);
  };

  // ================= SIGNUP =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signupdata.username ||
      !signupdata.email ||
      !signupdata.mobile ||
      !signupdata.password
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/signup",
        signupdata
      );

      console.log("Signup response:", response.data);

      alert("Account created successfully");

      // Clear form
      SetSignUpData({
        username: "",
        email: "",
        mobile: "",
        password: "",
      });

    } catch (error) {
      console.log("Signup error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create account"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIGNUP AREA ================= */}

      <div className="flex min-h-screen items-center justify-center px-5 py-10">

        {/* ================= SIGNUP CARD ================= */}

        <div className="w-full max-w-md">

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
          >

            {/* ================= LOGO / TITLE ================= */}

            <div className="mb-8 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">

                <span className="text-2xl font-bold text-white">
                  S
                </span>

              </div>

              <h1 className="text-3xl font-bold text-slate-800">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create your Surya ERP account
              </p>

            </div>

            {/* ================= USERNAME ================= */}

            <div className="mb-5">

              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={signupdata.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ================= EMAIL ================= */}

            <div className="mb-5">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={signupdata.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ================= MOBILE ================= */}

            <div className="mb-5">

              <label
                htmlFor="mobile"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={signupdata.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                autoComplete="tel"
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ================= PASSWORD ================= */}

            <div className="mb-6">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={hidden ? "password" : "text"}
                  name="password"
                  value={signupdata.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                {/* PASSWORD EYE */}

                <button
                  type="button"
                  onClick={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 transition hover:bg-slate-200 hover:text-blue-600"
                  aria-label={
                    hidden
                      ? "Show password"
                      : "Hide password"
                  }
                >
                  {hidden ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </button>

              </div>

            </div>

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* ================= LOGIN ================= */}

            <div className="mt-6 flex justify-center gap-1 text-sm">

              <p className="text-slate-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Login
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Signup;