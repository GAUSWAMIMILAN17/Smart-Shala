import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .footer-font { font-family: 'DM Sans', sans-serif; }
        .logo-font   { font-family: 'Lora', serif; }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.3; }
        }
        .blink { animation: blink 2.4s ease-in-out infinite; }
      `}</style>

      <footer className="footer-font bg-white border-t border-slate-100" style={{ boxShadow: "0 -1px 12px rgba(0,0,0,.04)" }}>

        {/* ── Top accent line ── */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#059669,#10b981,#d97706)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#059669,#10b981)", boxShadow: "0 0 16px rgba(16,185,129,.2)" }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                </div>
                <span className="logo-font text-lg font-bold text-slate-800 tracking-tight">
                  Smart<span style={{ color: "#059669" }}>Shala</span>
                </span>
              </div>

              <p className="text-sm text-slate-400 font-light leading-relaxed mb-5">
                Smart education platform for Admins, Teachers and Students. Manage classes, tests, and results — all in one place.
              </p>

              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink" />
                <span className="text-xs font-semibold text-emerald-600">System Online</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-semibold tracking-[.15em] uppercase text-slate-400 mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Home",      href: "/" },
                  { label: "Dashboard", href: "/admin" },
                  { label: "Teachers",  href: "/admin/teacher" },
                  { label: "Students",  href: "/admin/student" },
                  { label: "Classes",   href: "/admin/class" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-semibold tracking-[.15em] uppercase text-slate-400 mb-5">
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Help Center",       href: "#" },
                  { label: "Documentation",     href: "#" },
                  { label: "Privacy Policy",    href: "#" },
                  { label: "Terms & Conditions",href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold tracking-[.15em] uppercase text-slate-400 mb-5">
                Contact
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Email</p>
                    <a href="mailto:support@smartshala.com" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                      support@smartshala.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Phone</p>
                    <a href="tel:+919876543210" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Location</p>
                    <p className="text-sm text-slate-600">India</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} SmartShala School Management System. All rights reserved.
            </p>

            {/* Role badges */}
            <div className="flex items-center gap-2">
              {[
                { label: "Admin",   color: "text-amber-600   bg-amber-50   border-amber-200"   },
                { label: "Teacher", color: "text-sky-600     bg-sky-50     border-sky-200"     },
                { label: "Student", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
              ].map(({ label, color }) => (
                <span key={label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
} 