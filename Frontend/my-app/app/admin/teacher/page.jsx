"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/slices/authSlice";
import { setTeacherList } from "../../../redux/slices/adminSlice";

export default function TeacherPage() {
  const { teacherList } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  const teachers = teacherList || [];
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const dispatch = useDispatch();

  const fileInputRef = React.useRef(null);

  const filtered = teachers.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteHandler = async (teacherId) => {
    setLoadingId(teacherId);
    setConfirmId(null);
    try {
      const res = await axios.delete(
        `${USER_API_ENDPOINT}/admin/deleteTeacher/${teacherId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        // console.log(res.data.teachers);
        dispatch(setTeacherList(res.data.teachers));
        setLoadingId(null);
      };
    } finally {
      setLoadingId(null);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/admin/bulk-register-teacher`,
        formData,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setTeacherList(res.data.teachers));
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }

    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/admin/all-teachers`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setTeacherList(res.data.teachers));
          dispatch(setLoading(false));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        .fade-up { animation: fadeUp .45s ease both; }
        .fade-in { animation: fadeIn .2s ease both; }
      `}</style>

      {/* ── Delete Confirm Modal ── */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 fade-in"
          style={{
            background: "rgba(15,23,42,.35)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-7 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <h3 className="logo-font text-lg font-bold text-slate-900 text-center mb-1">
              Delete Teacher?
            </h3>
            <p className="text-sm text-slate-400 text-center mb-6">
              This action cannot be undone. The teacher will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteHandler(confirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-font min-h-screen bg-slate-50 px-5 md:px-12 py-10 space-y-7">
        {/* ── Page Header ── */}
        <div className="fade-up flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-[.15em] uppercase text-sky-600">
                Admin · Teachers
              </span>
            </div>
            <h1 className="logo-font text-3xl font-bold text-slate-900 tracking-tight">
              Manage Teachers
            </h1>
            <p className="text-slate-400 text-sm mt-1 font-light">
              {teachers.length} teacher{teachers.length !== 1 ? "s" : ""}{" "}
              registered in the system
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {/* Bulk Upload */}
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 shadow-sm"
            >
              {uploading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin text-slate-400"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Uploading…
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Bulk Upload Excel
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              hidden
            />

            {/* Add Teacher */}
            <Link href="/admin/teacher/add">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#059669,#10b981)",
                  boxShadow: "0 4px 14px rgba(16,185,129,.3)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Teacher
              </button>
            </Link>
          </div>
        </div>

        {/* ── Search + Count bar ── */}
        <div className="fade-up flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, email or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
          {search && (
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filtered.length}
              </span>{" "}
              of {teachers.length} results
            </p>
          )}
        </div>

        {/* ── Table Card ── */}
        <div className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">📝</span>
              <h2 className="text-sm font-semibold text-slate-700">
                Teacher List
              </h2>
            </div>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
              {filtered.length} total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400">
                    #
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400">
                    Teacher
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400 hidden sm:table-cell">
                    Email
                  </th>
              
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl">
                          📝
                        </div>
                        <p className="text-slate-400 text-sm font-medium">
                          {search
                            ? "No teachers match your search."
                            : "No teachers found."}
                        </p>
                        {!search && (
                          <Link href="/admin/teacher/add">
                            <button
                              className="mt-1 text-xs font-semibold text-white px-4 py-2 rounded-lg"
                              style={{
                                background:
                                  "linear-gradient(135deg,#059669,#10b981)",
                              }}
                            >
                              + Add First Teacher
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((teacher, index) => (
                    <tr
                      key={teacher._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Index */}
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium w-12">
                        {index + 1}
                      </td>

                      {/* Teacher info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg,#0284c7,#38bdf8)",
                            }}
                          >
                            {teacher.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {teacher.name}
                            </p>
                            <p className="text-xs text-slate-400 sm:hidden">
                              {teacher.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">
                        {teacher.email}
                      </td>

                      {/* Subject */}
                      

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setConfirmId(teacher._id)}
                            disabled={loadingId === teacher._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-all disabled:opacity-50"
                          >
                            {loadingId === teacher._id ? (
                              <svg
                                className="w-3.5 h-3.5 animate-spin"
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
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                            {loadingId === teacher._id ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filtered.length > 0 && (
            <div className="px-6 py-3.5 border-t border-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Accepts{" "}
                <span className="font-medium text-slate-500">.xlsx</span> and{" "}
                <span className="font-medium text-slate-500">.xls</span> for
                bulk upload
              </p>
              <p className="text-xs text-slate-400">
                {filtered.length} teacher{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
