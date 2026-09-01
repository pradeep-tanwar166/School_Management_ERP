import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../assets/Surya-logo4.png";

import { FaHome } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";

function Navbar({ sidebarWidth, onResize }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout Successful");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Admission",
      path: "/admission",
      icon: <FaUserPlus />,
    },
    {
      name: "Fees",
      path: "/fees",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Student Records",
      path: "/studentrecords",
      icon: <FaUserGraduate />,
    },
    {
      name: "Fees Records",
      path: "/feesrecords",
      icon: <FaReceipt />,
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-blue-700 text-white z-50 shadow-2xl"
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      {/* Logo */}
      <div className="h-24 flex items-center justify-center border-b border-blue-600 px-3">
        <Link to="/">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Surya ERP"
              className="h-16 w-auto object-contain"
            />

            {sidebarWidth >= 250 && (
              <h1 className="text-2xl font-bold italic">
                SURYA ERP
              </h1>
            )}
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-500 font-semibold"
                  : "hover:bg-blue-600"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            {sidebarWidth >= 250 && (
              <span className="text-base">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <button
          onClick={logout}
          className="w-full rounded-lg bg-blue-400 px-4 py-3 text-lg hover:bg-blue-500 transition cursor-pointer"
        >
          {sidebarWidth >= 250 ? "Logout" : "↪"}
        </button>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={onResize}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-300"
      />
    </aside>
  );
}

export default Navbar;