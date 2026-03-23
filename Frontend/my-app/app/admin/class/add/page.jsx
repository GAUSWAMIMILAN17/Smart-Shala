"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/admin/classroom`, formData, {
        withCredentials: true,
      });
      if (res.data.success) router.push("/admin/class");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Lora:wght@700&display=swap');
        .f { font-family: 'DM Sans', sans-serif; }
        input:focus { outline: none; }
      `}</style>

      <div className="f min-h-screen bg-slate-50 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          {/* Back */}
          <Link href="/admin/class"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-6 group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
          </Link>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-1" style={{ background: "linear-gradient(90deg,#d97706,#f59e0b,#fbbf24)" }} />

            <div className="p-8">
              {/* Header */}
              <p className="text-xs font-semibold tracking-[.15em] uppercase text-amber-600 mb-1">Admin · Classes</p>
              <h1 style={{ fontFamily:"'Lora',serif" }} className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                Add New Class
              </h1>
              <p className="text-slate-400 text-sm font-light mb-7">
                Create a classroom to assign students and tests.
              </p>

              {/* Error */}
              {error && (
                <div className="mb-5 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Class Name */}
                <div>
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Class Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Class 10A, Grade 12 Science"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                {/* Live preview */}
                {formData.name && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}>
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <span>
                      <strong>{formData.name}</strong>{" "}
                      <span className="opacity-60">will be created as a new class</span>
                    </span>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  <Link href="/admin/class"
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold text-center hover:bg-slate-50 transition-all">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0"
                    style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", boxShadow: "0 6px 20px rgba(217,119,6,.28)" }}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Class
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          <p className="text-center text-xs text-slate-300 mt-6">
            © {new Date().getFullYear()} SmartShala · Admin Panel
          </p>

        </div>
      </div>
    </>
  );
}