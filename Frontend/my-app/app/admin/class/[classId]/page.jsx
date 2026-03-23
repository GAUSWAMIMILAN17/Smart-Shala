"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function ClassViewPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const { classId } = useParams();
  const { dashboardData } = useSelector((state) => state.admin);
  const classData = dashboardData?.classList?.find((cls) => cls._id === classId);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios(`${USER_API_ENDPOINT}/admin/class/${classId}/students`, {
          withCredentials: true,
        });
        if (res.data.success) setStudents(res.data.students);
      } catch (err) {
        console.error("Error fetching students:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (classId) fetchStudents();
  }, [classId]);

  const deleteStudent = async (studentId) => {
    setDeleteLoading(studentId);
    setConfirmId(null);
    try {
      const res = await axios.delete(`${USER_API_ENDPOINT}/admin/deleteStudent/${studentId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setStudents((prev) => prev.filter((stu) => stu.userId?._id !== studentId));
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (!classData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading class data…
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Lora:wght@700&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .fade-up { animation: fadeUp .45s ease both; }
        .fade-in { animation: fadeIn .2s ease both; }
      `}</style>

      {/* ── Delete Confirm Modal ── */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 fade-in"
          style={{ background: "rgba(15,23,42,.35)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-7 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="logo-font text-lg font-bold text-slate-900 text-center mb-1">Remove Student?</h3>
            <p className="text-sm text-slate-400 text-center mb-6">
              This student will be permanently deleted from the system.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteStudent(confirmId)}
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
        <div className="fade-up">
          <Link
            href="/admin/class"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all classes
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Class avatar */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", boxShadow: "0 4px 14px rgba(217,119,6,.25)" }}
              >
                {classData.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[.15em] uppercase text-amber-600 mb-0.5">Admin · Classes</p>
                <h1 className="logo-font text-2xl font-bold text-slate-900 tracking-tight">
                  {classData.name}
                </h1>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                <p className="logo-font text-xl font-bold text-amber-600">{students.length}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Students</p>
              </div>
              <div className="text-center px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                <p className="logo-font text-xl font-bold text-sky-600">{classData.subjects?.length || 0}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Subjects</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Students Section ── */}
        <div className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Section header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🎓</span>
              <h2 className="text-sm font-semibold text-slate-700">Students in this Class</h2>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              {students.length} enrolled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400">Student</th>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400 hidden sm:table-cell">Email</th>
                  <th className="px-6 py-3.5 text-xs font-semibold tracking-[.1em] uppercase text-slate-400 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  // Skeleton rows
                  Array(4).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 w-12">
                        <div className="h-3 w-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse shrink-0" />
                          <div className="space-y-1.5">
                            <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
                            <div className="h-2.5 w-36 bg-slate-100 rounded animate-pulse sm:hidden" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 w-16 bg-slate-100 rounded-lg animate-pulse ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-14 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl">🎓</div>
                        <p className="text-slate-400 text-sm">No students enrolled in this class yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  students.map((stu, index) => (
                    <tr key={stu._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium w-12">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}
                          >
                            {stu?.userId?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{stu?.userId?.name}</p>
                            <p className="text-xs text-slate-400 sm:hidden">{stu?.userId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">
                        {stu?.userId?.email}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setConfirmId(stu.userId?._id)}
                          disabled={deleteLoading === stu.userId?._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-all disabled:opacity-50"
                        >
                          {deleteLoading === stu.userId?._id ? (
                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          {deleteLoading === stu.userId?._id ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {students.length > 0 && (
            <div className="px-6 py-3.5 border-t border-slate-50 text-right">
              <p className="text-xs text-slate-400">{students.length} student{students.length !== 1 ? "s" : ""} enrolled</p>
            </div>
          )}
        </div>

        {/* ── Subjects Section ── */}
        <div className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Section header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">📚</span>
              <h2 className="text-sm font-semibold text-slate-700">Subjects</h2>
            </div>
            <Link href={`/admin/class/${classId}/add-subject`}>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", boxShadow: "0 3px 10px rgba(217,119,6,.25)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                </svg>
                Add Subject
              </button>
            </Link>
          </div>

          <div className="p-6">
            {!classData.subjects || classData.subjects.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl">📚</div>
                <p className="text-slate-400 text-sm">No subjects added to this class yet.</p>
                <Link href={`/admin/class/${classId}/add-subject`}>
                  <button
                    className="mt-1 text-xs font-semibold text-white px-4 py-2 rounded-lg"
                    style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}
                  >
                    + Add First Subject
                  </button>
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {classData.subjects.map((sub, index) => (
                  <li key={sub._id} className="flex items-center justify-between py-3 group">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{sub.name}</span>
                    </div>
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </>
  );
}