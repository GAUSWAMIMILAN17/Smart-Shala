"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

const navLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/teacher",
    label: "Teachers",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/admin/student",
    label: "Students",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    href: "/admin/class",
    label: "Classes",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const LogoutHandler = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setLogout());
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .nav-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Lora', serif; }
      `}</style>

      <nav className="nav-font w-full bg-white border-b border-slate-100 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#059669,#10b981)", boxShadow: "0 0 16px rgba(16,185,129,.25)" }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span className="logo-font text-lg font-bold text-slate-800 tracking-tight">
              Smart<span style={{ color: "#059669" }}>Shala</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(({ href, label, icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span className={active ? "text-emerald-600" : "text-slate-400"}>{icon}</span>
                    {label}
                    {active && (
                      <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right: User + Logout ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <>
                {/* User badge */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wide">
                      {user?.role || "Admin"}
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={LogoutHandler}
                  disabled={loggingOut}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all duration-150 disabled:opacity-60"
                >
                  {loggingOut ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  )}
                  {loggingOut ? "Logging out…" : "Logout"}
                </button>
              </>
            ) : (
              <Link href="/auth/login">
                <button
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#059669,#10b981)", boxShadow: "0 4px 14px rgba(16,185,129,.3)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Admin Login
                </button>
              </Link>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-5 pb-5 pt-3 space-y-1">
            {navLinks.map(({ href, label, icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={active ? "text-emerald-500" : "text-slate-400"}>{icon}</span>
                  {label}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 mt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{user?.name || "Admin"}</p>
                      <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">{user?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={LogoutHandler}
                    disabled={loggingOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-all disabled:opacity-60"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {loggingOut ? "Logging out…" : "Logout"}
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}
                  >
                    Admin Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;