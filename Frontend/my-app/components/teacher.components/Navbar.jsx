"use client";

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log("Navbar User:", user); // Debugging line to check user state

  const LogoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
       withCredentials: true,
      });

      if (res.data.success) {
        alert("Logout successful!");
        dispatch(setLogout());
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed:");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">SmartShala</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/teacher">
            <li className="hover:text-indigo-600 cursor-pointer">Dashboard</li>
          </Link>
          <Link href="/teacher/alltest">
            <li className="hover:text-indigo-600 cursor-pointer">All Test</li>
          </Link>
          <Link href="/teacher/submission">
            <li className="hover:text-indigo-600 cursor-pointer">Submissions</li>
          </Link>
          <Link href="/teacher/result">
            <li className="hover:text-indigo-600 cursor-pointer">Result</li>
          </Link>
        </ul>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block">
          {!user ? (
            <Link href="/auth/login">
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                Admin Login
              </button>
            </Link>
          ) : (
            <button onClick={LogoutHandler} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
