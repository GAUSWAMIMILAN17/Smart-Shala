"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    classroomId: "",
    rollNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/admin/registerStudent`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) router.push("/admin/student");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { animation: fadeUp .45s ease both; }
        .fade-up-1 { animation: fadeUp .45s .06s ease both; }
        .fade-up-2 { animation: fadeUp .45s .12s ease both; }
        .fade-up-3 { animation: fadeUp .45s .18s ease both; }
        .fade-up-4 { animation: fadeUp .45s .24s ease both; }
        .fade-up-5 { animation: fadeUp .45s .30s ease both; }
        .fade-up-6 { animation: fadeUp .45s .36s ease both; }
        .fade-up-7 { animation: fadeUp .45s .42s ease both; }
        input:focus { outline: none; }
      `}</style>

      <div className="page-font min-h-screen bg-slate-50 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">

          {/* ── Back link ── */}
          <div className="fade-up mb-6">
            <Link
              href="/admin/student"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Students
            </Link>
          </div>

          {/* ── Card ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Top accent bar */}
            <div className="h-1" style={{ background: "linear-gradient(90deg,#059669,#34d399,#10b981)" }} />

            <div className="p-8">

              {/* Heading */}
              <div className="fade-up-1 mb-7">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold tracking-[.15em] uppercase text-emerald-600">
                    Admin · Students
                  </span>
                </div>
                <h1 className="logo-font text-2xl font-bold text-slate-900 tracking-tight">
                  Add New Student
                </h1>
                <p className="text-slate-400 text-sm font-light mt-1">
                  Fill in the details to register a student to the system.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="fade-up mb-6 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ── Full Name ── */}
                <div className="fade-up-2">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* ── Email ── */}
                <div className="fade-up-3">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="rahul@smartshala.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* ── Classroom + Roll No (side by side) ── */}
                <div className="fade-up-4 grid grid-cols-2 gap-4">
                  {/* Classroom ID */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                      Classroom ID
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="classroomId"
                        placeholder="10A, 12B…"
                        value={formData.classroomId}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Roll Number */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                      Roll Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="rollNo"
                        placeholder="e.g. 21"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Password ── */}
                <div className="fade-up-5">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Temporary Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 ml-1">
                    The student should change this password after first login.
                  </p>
                </div>

                {/* ── Live summary pill ── */}
                {formData.name && (
                  <div className="fade-up flex items-center gap-3 px-4 py-3 rounded-xl border text-emerald-600 bg-emerald-50 border-emerald-200">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}
                    >
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm leading-snug">
                      <span className="font-semibold">{formData.name}</span>
                      {formData.classroomId && (
                        <span className="opacity-70"> · Class <span className="font-semibold">{formData.classroomId}</span></span>
                      )}
                      {formData.rollNo && (
                        <span className="opacity-70"> · Roll <span className="font-semibold">#{formData.rollNo}</span></span>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Actions ── */}
                <div className="fade-up-7 flex gap-3 pt-1">
                  <Link
                    href="/admin/student"
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold text-center hover:bg-slate-50 hover:text-slate-700 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background: "linear-gradient(135deg,#059669,#10b981)",
                      boxShadow: "0 6px 20px rgba(16,185,129,.35)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Create Student
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-300 mt-6">
            © {new Date().getFullYear()} SmartShala · Admin Panel
          </p>

        </div>
      </div>
    </>
  );
}