"use client";

import { useState } from "react";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice.js";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "ADMIN",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("Login successful, user data:", res.data);
        dispatch(setUser(res.data.userData));
        if (res.data.userData.role === "TEACHER") router.push("/teacher");
        else if (res.data.userData.role === "STUDENT") router.push("/student");
        else router.push("/admin");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "ADMIN",   label: "Administrator", icon: "🏫" },
    { value: "TEACHER", label: "Teacher",        icon: "📝" },
    { value: "STUDENT", label: "Student",        icon: "🎓" },
  ];

  return (
    <div
      className="min-h-screen flex bg-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.3; }
        }
        .fade-up { animation: fadeUp .55s ease both; }
        .fade-up-d1 { animation: fadeUp .55s .08s ease both; }
        .fade-up-d2 { animation: fadeUp .55s .16s ease both; }
        .fade-up-d3 { animation: fadeUp .55s .24s ease both; }
        .fade-up-d4 { animation: fadeUp .55s .32s ease both; }
        .blink { animation: blink 2.4s ease-in-out infinite; }
        input:focus, select:focus { outline: none; }
        .role-btn { transition: all .18s ease; }
        .role-btn.active {
          background: linear-gradient(135deg,#059669,#10b981);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(16,185,129,.35);
        }
      `}</style>

      {/* ══════════════════════════════
          LEFT PANEL — Branding
      ══════════════════════════════ */}
      <div
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: "linear-gradient(145deg,#064e3b 0%,#065f46 40%,#047857 100%)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.2)" }}
          >
            {/* Graduation cap SVG */}
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <span className="font-display text-white text-xl font-bold tracking-tight">Smart Shala</span>
        </div>

        {/* Middle: Hero text */}
        <div className="relative z-10 max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 blink" />
            <span className="text-xs font-semibold tracking-[.18em] uppercase text-emerald-300">
              School Management System
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold text-white leading-[1.1] tracking-tight mb-5">
            Everything your school needs,{" "}
            <em className="not-italic" style={{ color: "#6ee7b7" }}>in one place.</em>
          </h2>

          <p className="text-emerald-200 text-[0.97rem] font-light leading-relaxed mb-10">
            Role-based portals for Admins, Teachers, and Students — with online exams, instant results, and complete academic management.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "🏫", text: "Admin: Manage school, users & reports" },
              { icon: "📝", text: "Teacher: Create tests & grade submissions" },
              { icon: "🎓", text: "Student: Attend exams & view results" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-emerald-100"
                style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}
              >
                <span className="text-base">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright */}
        <p className="relative z-10 text-emerald-700 text-xs">
          © {new Date().getFullYear()} Smart Shala School Management System
        </p>
      </div>

      {/* ══════════════════════════════
          RIGHT PANEL — Login Form
      ══════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative">
        {/* subtle background tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(0,0,0,.04) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-[400px]">

          {/* Mobile logo (hidden on lg) */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#059669,#10b981)", boxShadow: "0 0 20px rgba(16,185,129,.3)" }}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
            <span className="font-display text-slate-800 text-xl font-bold">Smart Shala</span>
          </div>

          {/* Heading */}
          <div className="fade-up mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm font-light">Sign in to access your portal</p>
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

            {/* Role Selector — segmented buttons */}
            <div className="fade-up-d1">
              <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2.5">
                Login As
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: value })}
                    className={`role-btn flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                      formData.role === value
                        ? "active"
                        : "border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="fade-up-d2">
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
                  placeholder="you@smartshala.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="fade-up-d3">
              <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2">
                Password
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
            </div>

            {/* Submit */}
            <div className="fade-up-d4 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{
                  background: "linear-gradient(135deg,#059669,#10b981)",
                  boxShadow: "0 8px 24px rgba(16,185,129,.35)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-300">
            © {new Date().getFullYear()} Smart Shala · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}