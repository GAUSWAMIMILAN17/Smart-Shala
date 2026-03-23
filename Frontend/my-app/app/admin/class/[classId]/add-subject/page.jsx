"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../../utils/data.js";

export default function AddSubjectPage() {
    const router = useRouter();
    const { dashboardData } = useSelector((state) => state.admin);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        classId: "",
    })

    const classes = dashboardData?.classList || [];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/admin/add-subject`, formData, {
                withCredentials: true,
            })

            if(res.data.success) {
                alert("Subject added successfully");
                router.push("/admin/class");
            } 

        } catch (error) {
            console.log("Server Error", error)
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Back Button */}
        <Link href="/admin/class" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to classes
        </Link>

        {/* Form Card */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-center text-slate-800 mb-6">
            Add New Subject
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Subject Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Subject Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Mathematics, Science, English etc"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Class Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Assign to Class
              </label>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm transition-all"
              >
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/admin/class"
                className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Subject"
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}