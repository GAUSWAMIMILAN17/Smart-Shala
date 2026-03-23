"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../../utils/data.js";

export default function AddSubjectPage() {
  const router = useRouter();
  const { classId } = useParams();
  const { dashboardData } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const classes = dashboardData?.classList || [];
  const currentClass = classes.find((c) => c._id === classId);

  const [formData, setFormData] = useState({
    name: "",
    classroomId: classId || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/admin/subject`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        router.push(`/admin/class/${classId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Lora:wght@700&display=swap');
        .page-font { font-family:'DM Sans',sans-serif; }
        .logo-font { font-family:'Lora',serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { animation: fadeUp .45s ease both; }
        .fade-up-1 { animation: fadeUp .45s .06s ease both; }
        .fade-up-2 { animation: fadeUp .45s .12s ease both; }
        .fade-up-3 { animation: fadeUp .45s .18s ease both; }
        .fade-up-4 { animation: fadeUp .45s .24s ease both; }
        input:focus, select:focus { outline: none; }
      `}</style>

      <div className="page-font min-h-screen bg-slate-50 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          {/* Back */}
          <div className="fade-up mb-6">
            <Link
              href={classId ? `/admin/class/${classId}` : "/admin/class"}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {classId ? "Class" : "Classes"}
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Amber accent bar */}
            <div className="h-1" style={{ background: "linear-gradient(90deg,#d97706,#f59e0b,#fbbf24)" }} />

            <div className="p-8">

              {/* Heading */}
              <div className="fade-up-1 mb-7">
                <p className="text-xs font-semibold tracking-[.15em] uppercase text-amber-600 mb-1">
                  Admin · Subjects
                </p>
                <h1 className="logo-font text-2xl font-bold text-slate-900 tracking-tight">
                  Add New Subject
                </h1>
                <p className="text-slate-400 text-sm font-light mt-1">
                  Create a subject and assign it to a class.
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

                {/* Subject Name */}
                <div className="fade-up-2">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Subject Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Mathematics, Science, English"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                {/* Fixed Class Badge */}
                <div className="fade-up-3">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                    Assign to Class
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}>
                      {currentClass?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-amber-700">{currentClass?.name || "Unknown Class"}</p>
                      <p className="text-[11px] text-amber-500 font-mono truncate max-w-[200px]">{classId}</p>
                    </div>
                    <span className="ml-auto text-xs font-semibold text-amber-600 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                      Selected
                    </span>
                  </div>
                </div>

                {/* Live preview pill */}
                {formData.name && (
                  <div className="fade-up flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm">
                    <span className="text-lg">📚</span>
                    <span>
                      <strong className="text-slate-800">{formData.name}</strong>
                      <span className="text-slate-400"> will be added to </span>
                      <strong className="text-amber-600">{currentClass?.name}</strong>
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="fade-up-4 flex gap-3 pt-1">
                  <Link
                    href={classId ? `/admin/class/${classId}` : "/admin/class"}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold text-center hover:bg-slate-50 hover:text-slate-700 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background: "linear-gradient(135deg,#d97706,#f59e0b)",
                      boxShadow: "0 6px 20px rgba(217,119,6,.3)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Adding…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Subject
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