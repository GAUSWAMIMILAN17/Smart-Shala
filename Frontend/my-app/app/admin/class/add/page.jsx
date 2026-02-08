"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/admin/classroom`, formData, {
        withCredentials: true,
      })
        if(res.data.success) {
            alert("Class added successfully");
            router.push("/admin/");

        }
    } catch (error) {
      console.error("Error adding class:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Class
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Class Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter class name"
              value={formData.name}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Add Class
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} SmartShala
        </p>
      </div>
    </div>
  );
}
