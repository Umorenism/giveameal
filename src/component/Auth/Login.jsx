
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import logo from "../../assets/ride.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { loginAdmin } from "../../api/apiServices";

export default function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = { email: !email, password: !password };
  //   if (errors.email || errors.password) {
  //     setFieldErrors(errors);
  //     setError("Please fill in all fields.");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const data = await loginAdmin(email, password);
  //     console.log("Login API response:", data);
  //     login(data);
  //     setError("");
  //     setSuccess(true);
  //     console.log("Navigating to /dashboard/permission");
  //     navigate("/dashboard", { replace: true });
  //     console.log("Navigation triggered");
  //   } catch (err) {
  //     console.error("Login error:", err.response?.data || err.message);
  //     setError(err.response?.data?.message || "Invalid credentials");
  //     setFieldErrors({ email: true, password: true });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userData = res.data;
        console.log("Google user:", userData);
        navigate("/dashboard/permission");
      } catch (err) {
        setError("Failed to log in with Google.");
      }
    },
    onError: () => setError("Google sign-in failed."),
  });

  const handleAppleLogin = () => {
    window.location.href = "https://your-backend.com/auth/apple";
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-black px-4 py-10 relative">
      {success && (
        <div className="absolute top-10 bg-green-100 border border-green-500 text-green-700 px-6 py-3 rounded-md shadow-md z-50 animate-fade-in">
          Login successful! Redirecting...
        </div>
      )}
      <div className="w-full max-w-[500px] p-6 sm:p-8 space-y-8 bg-white">
        <div className="text-center">
          <div className="w-full mb-5">
          <h1 className="text-orange-500 font-[900] text-[30px]">GIVE A MEAL</h1>
        </div>
          {/* <img src={logo} alt="logo" className="mx-auto w-16 sm:w-20 mb-4" /> */}
          <h1 className="text-2xl font-bold text-[#1F2336]">
            Log in to your Account
          </h1>
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <span className="text-black cursor-pointer">Sign Up</span>
          </p>
        </div>
        {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              name="email"
              placeholder="victoredem24@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {fieldErrors.password && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
            )}
          </div>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-[100%] mt-4 bg-orange-500 text-white py-2 rounded-[15px] font-semibold hover:bg-[#2c324d] transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="flex bg-[#E4E6E7] items-center justify-center gap-3 border border-gray-300 py-2 rounded-[15px] hover:bg-gray-100 transition duration-200"
            onClick={handleAppleLogin}
          >
            <FaApple className="text-xl" />
            Login with Apple
          </button>
          <button
            className="flex items-center bg-[#E4E6E7] justify-center gap-3 border border-gray-300 py-2 rounded-[15px] hover:bg-gray-100 transition duration-200"
            onClick={() => googleLogin()}
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}



