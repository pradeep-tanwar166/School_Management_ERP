import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";

function Login() {
  const navigate = useNavigate();

  const [form, SetForm] = useState({
    email: "",
    password: "",
  });

  const [hidden, Sethidden] = useState(true);
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // ================= SHOW PASSWORD =================

  const showPassword = () => {
    Sethidden((previous) => !previous);
  };

  // ================= LOGIN =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        form
      );

      console.log("Login response:", response.data);

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      // Clear form
      SetForm({
        email: "",
        password: "",
      });

      // Go to dashboard
      navigate("/");

    } catch (error) {
      console.log("Login error:", error);

      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= LOGIN AREA ================= */}

      <div className="flex min-h-screen items-center justify-center px-5 py-10">

        {/* ================= LOGIN CARD ================= */}

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
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Login to your Surya ERP account
              </p>

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
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ================= PASSWORD ================= */}

            <div className="mb-4">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={hidden ? "password" : "text"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                {/* EYE BUTTON */}

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

            {/* ================= REMEMBER / FORGOT ================= */}

            <div className="mb-6 flex items-center justify-between">

              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                Forgot password?
              </Link>

            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* ================= SIGNUP ================= */}

            <div className="mt-6 flex justify-center gap-1 text-sm">

              <p className="text-slate-500">
                Don't have an account?
              </p>

              <Link
                to="/signup"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign up
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;