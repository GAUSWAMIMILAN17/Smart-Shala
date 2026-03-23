"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../../utils/data";
import axios from "axios";
import { setDashboardData } from "../../redux/slices/adminSlice";
import Link from "next/link";
import { setLoading } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dashboardData } = useSelector((state) => state.admin);
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
    router.push("/auth/login");
    return;
  }
    const fetchDashboardData = async () => {
      try {
        dispatch(setLoading(true));
  
        const res = await axios.get(`${USER_API_ENDPOINT}/admin/dashboard`, {
          withCredentials: true,
          
        });
        
        // console.log("Dashboard data response:", res.data);
        if (res.data.success) {
          dispatch(setDashboardData(res.data.dashboardData));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        dispatch(setLoading(false));
      }
    };
    fetchDashboardData();
  }, [user]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .dash-font  { font-family: 'DM Sans', sans-serif; }
        .logo-font  { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { animation: fadeUp .5s ease both; }
        .fade-up-1 { animation: fadeUp .5s .07s ease both; }
        .fade-up-2 { animation: fadeUp .5s .14s ease both; }
        .fade-up-3 { animation: fadeUp .5s .21s ease both; }
      `}</style>

      <div className="dash-font min-h-screen bg-slate-50 px-5 md:px-12 py-10 space-y-8">

        {/* ── Page Header ── */}
        <div className="fade-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-[.15em] uppercase text-emerald-600">
                Admin Portal
              </span>
            </div>
            <h1 className="logo-font text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1 font-light">
              Welcome back,{" "}
              <span className="text-slate-600 font-medium">{user?.name || "Admin"}</span>. Here's an overview of your school.
            </p>
          </div>

          {/* Live badge */}
          <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{boxShadow:"0 0 0 3px rgba(16,185,129,.2)"}}>
            </span>
            <span className="text-xs font-semibold text-slate-500">Live Data</span>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Classes"
            value={dashboardData?.totalClasses}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            accent="#d97706"
            accentBg="bg-amber-50"
            accentText="text-amber-600"
            accentBorder="border-amber-100"
            delay="fade-up-1"
            href="/admin/class"
          />
          <StatCard
            title="Total Teachers"
            value={dashboardData?.totalTeachers}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            accent="#0284c7"
            accentBg="bg-sky-50"
            accentText="text-sky-600"
            accentBorder="border-sky-100"
            delay="fade-up-2"
            href="/admin/teacher"
          />
          <StatCard
            title="Total Students"
            value={dashboardData?.totalStudents}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            }
            accent="#059669"
            accentBg="bg-emerald-50"
            accentText="text-emerald-600"
            accentBorder="border-emerald-100"
            delay="fade-up-3"
            href="/admin/student"
          />
        </div>

        {/* ── List Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Classes */}
          <ListCard
            title="Recent Classes"
            icon="🏫"
            loading={loading}
            viewHref="/admin/class"
            viewLabel="View all classes"
          >
            {dashboardData?.classList?.slice(0, 5).map((cls, i) => (
              <div key={cls._id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-xs font-bold text-amber-600 shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-slate-700">{cls.name}</span>
              </div>
            ))}
          </ListCard>

          {/* Teachers */}
          <ListCard
            title="Recent Teachers"
            icon="📝"
            loading={loading}
            viewHref="/admin/teacher"
            viewLabel="View all teachers"
          >
            {dashboardData?.teacherList?.slice(0, 5).map((teacher) => (
              <div key={teacher._id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,#0284c7,#38bdf8)" }}
                >
                  {teacher.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{teacher.name}</p>
                  <p className="text-xs text-slate-400 truncate">{teacher.email}</p>
                </div>
              </div>
            ))}
          </ListCard>

          {/* Students */}
          <ListCard
            title="Recent Students"
            icon="🎓"
            loading={loading}
            viewHref="/admin/student"
            viewLabel="View all students"
          >
            {dashboardData?.studentList?.slice(0, 5).map((student) => (
              <div key={student._id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}
                >
                  {student.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{student.name}</p>
                  <p className="text-xs text-slate-400 truncate">{student.email}</p>
                </div>
              </div>  
            ))}
          </ListCard>

        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
function StatCard({ title, value, loading, icon, accent, accentBg, accentText, accentBorder, delay, href }) {
  return (
    <Link href={href}>
      <div className={`${delay} group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}>
        <div className="flex items-start justify-between mb-5">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className={`w-9 h-9 rounded-xl ${accentBg} border ${accentBorder} ${accentText} flex items-center justify-center`}>
            {icon}
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="h-9 w-20 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
          </div>
        ) : (
          <>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "'Lora',serif" }}>
                {value ?? 0}
              </h2>
            </div>
            <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(((value ?? 0) / 50) * 100, 100)}%`, background: accent }}
              />
            </div>
          </>
        )}

        <p className={`text-xs font-semibold mt-3 ${accentText} group-hover:underline`}>
          View details →
        </p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   LIST CARD
───────────────────────────────────────── */
function ListCard({ title, icon, loading, viewHref, viewLabel, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">
          Top 5
        </span>
      </div>

      {/* Content */}
      <div className="space-y-0 min-h-[160px]">
        {loading ? <SkeletonRows count={5} /> : children}
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-50">
        <Link
          href={viewHref}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
        >
          {viewLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SKELETON
───────────────────────────────────────── */
function SkeletonRows({ count }) {
  return Array(count).fill(0).map((_, i) => (
    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-slate-100 rounded animate-pulse w-3/4" />
        <div className="h-2.5 bg-slate-100 rounded animate-pulse w-1/2" />
      </div>
    </div>
  ));
}