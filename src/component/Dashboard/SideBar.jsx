import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaCaravan } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { CiSettings, CiLogout } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import pro from "../../assets/profile.svg";
import logo from "../../assets/image 23.svg";

export default function Sidebar() {
  const { logout } = useAuth();
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all text-sm font-medium ${
      isActive
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div className="w-[297px] h-screen fixed top-0 left-0 bg-white p-8 flex flex-col justify-between shadow-lg border-r border-gray-200 z-50">
      <div>
        <div className="w-full mb-5">
          <h1 className="text-orange-500 font-[900] text-[30px]">GIVE A MEAL</h1>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <MdDashboard size={20} /> Dashboard
          </NavLink>

          {/* Dropdown toggle */}
          <button
            onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center justify-between px-4 py-3 rounded-[10px] text-sm font-medium text-gray-700 hover:bg-orange-50 transition-colors w-full"
          >
            <div className="flex items-center gap-3">
              <FaUserGroup size={20} /> User Management
            </div>
            {isUserDropdownOpen ? (
              <IoIosArrowUp size={16} />
            ) : (
              <IoIosArrowDown size={16} />
            )}
          </button>

          {/* Dropdown menu */}
          {isUserDropdownOpen && (
            <div className="ml-8 flex flex-col gap-1">
              <NavLink to="/dashboard/users" className={navLinkClasses}>
                Riders
              </NavLink>
              <NavLink to="/dashboard/vendors" className={navLinkClasses}>
                Vendors
              </NavLink>
            </div>
          )}

          <NavLink to="/dashboard/routes" className={navLinkClasses}>
            <FaCaravan size={20} /> Route Management
          </NavLink>

          <NavLink to="permission" className={navLinkClasses}>
            <RiAdminFill size={20} /> Admin Permissions
          </NavLink>

          <NavLink to="settings/profile" className={navLinkClasses}>
            <CiSettings size={20} /> Profile Settings
          </NavLink>
        </nav>
      </div>

      <div className="pt-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-[56px] w-[56px] rounded-full overflow-hidden border border-gray-300">
            <img
              src={pro}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-gray-800">Victor Edem</h1>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <p>victoredem24@gmail.com</p>
              <button onClick={logout}>
                <CiLogout
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
