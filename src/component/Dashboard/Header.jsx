


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import profile2 from "../../assets/profile.svg";
// import notificationSound from "../../assets/notification.mp3"; // ✅ Re-enabled import
// import { getAdminProfile } from "../../api/apiServices";

export default function Header({ setIsOpen }) {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastPlayed, setLastPlayed] = useState(0); // ✅ Track last sound play time

  // Dynamic placeholder text
  const getPlaceholder = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment === "dashboard") return "Search anything in the dashboard";
    if (lastSegment)
      return `Search ${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)} by name`;

    return "Search";
  };

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const admin = await getAdminProfile();
        setProfile(admin);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const unreadRideOrders = notifications.filter(
    (n) => !n.read && n.type === "ride-order"
  ).length;

  // Play notification sound with cooldown
  useEffect(() => {
    const now = Date.now();
    const cooldown = 10000; // 10-second cooldown
    if (unreadRideOrders > 0 && now - lastPlayed >= cooldown) {
      const audio = new Audio(notificationSound);
      audio.play().catch((err) => {
        console.error("Error playing notification sound:", err.message);
      });
      setLastPlayed(now);
    }
  }, [unreadRideOrders, lastPlayed]);

  // Manual sound playback on bell click
  const playNotificationSound = () => {
    const now = Date.now();
    const cooldown = 10000;
    if (now - lastPlayed >= cooldown) {
      const audio = new Audio(notificationSound);
      audio.play().catch((err) => {
        console.error("Error playing notification sound on click:", err.message);
      });
      setLastPlayed(now);
    }
  };

  // Handle keyboard search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toast.success(`You searched for: ${searchQuery}`);
      console.log("🔍 Search key:", searchQuery);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 lg:left-[297px] right-0 z-40 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 h-[72px]">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl text-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu />
      </button>

      {/* Search */}
      <div className="flex items-center space-x-3 bg-gray-100 px-3 py-3 rounded-[15px] w-full max-w-sm ml-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="bg-transparent text-black outline-none text-sm w-full placeholder:text-black"
        />
      </div>

      {/* Notification + Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative" onClick={playNotificationSound}>
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          {unreadRideOrders > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {unreadRideOrders}
            </span>
          )}
        </div>

        {/* Profile */}
        {profile ? (
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-300">
              <img
                src={profile.image || profile2}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-sm font-semibold text-gray-800">
                {profile.lname}
              </h1>
              <p className="text-xs text-gray-500">{profile.role}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
            <div className="hidden sm:block">
              <div className="w-20 h-3 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="w-14 h-2 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}