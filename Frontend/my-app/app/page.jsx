// Smart Shala — Home Page (Next.js + Tailwind CSS) — Light Theme
// Drop into: app/page.jsx  OR  pages/index.jsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Fonts + Keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Lora', serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.3; }
        }
        .anim-1 { animation: fadeUp .65s .05s ease both; }
        .anim-2 { animation: fadeUp .65s .15s ease both; }
        .anim-3 { animation: fadeUp .65s .28s ease both; }
        .anim-4 { animation: fadeUp .65s .42s ease both; }
        .float  { animation: floatY 4s ease-in-out infinite; }
        .blink  { animation: blink 2.4s ease-in-out infinite; }
        .grad-text {
          background: linear-gradient(130deg,#059669,#d97706);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }
      `}</style>

      {/* ── Soft background tint ── */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{background:"radial-gradient(ellipse 70% 50% at 10% 5%,rgba(5,150,105,.07) 0%,transparent 60%),radial-gradient(ellipse 55% 45% at 90% 90%,rgba(217,119,6,.07) 0%,transparent 55%)"}} />
      {/* subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{backgroundImage:"radial-gradient(circle,rgba(0,0,0,.055) 1px,transparent 1px)",backgroundSize:"28px 28px"}} />

      {/* ════════════════════════════
          NAVBAR
      ════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md bg-white/80">
        <div className="max-w-6xl mx-auto px-5 md:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{background:"linear-gradient(135deg,#059669,#10b981)",boxShadow:"0 0 20px rgba(16,185,129,.25)"}}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-800">Smart Shala</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink" />
              System Live
            </span>
            <Link href="/auth/login">
              <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100">
                Sign In →
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 md:px-12 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <div className="anim-1 flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 blink" />
              <span className="text-xs font-semibold tracking-[.18em] uppercase text-emerald-600">
                Complete School Management
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display anim-2 text-5xl md:text-[3.6rem] font-bold leading-[1.07] tracking-tight mb-6 text-slate-900">
              Manage Your <br />
              School{" "}
              <em className="grad-text not-italic">Smarter,</em>
              <br />Not Harder
            </h1>

            {/* Description */}
            <p className="anim-3 text-slate-500 text-[1.07rem] font-light leading-relaxed mb-10 max-w-md">
              Smart Shala is a modern end-to-end platform built for Administrators, Teachers, and Students — with role-based portals, online exams, and instant results all in one place.
            </p>

            {/* CTA */}
            <div className="anim-4 flex flex-wrap items-center gap-4">
              <Link href="/auth/login">
                <button
                  className="inline-flex items-center gap-2.5 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{background:"linear-gradient(135deg,#059669,#10b981)",boxShadow:"0 8px 28px rgba(16,185,129,.35)"}}>
                  Login to Portal
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <span className="text-slate-400 text-sm">
                No setup required &mdash;{" "}
                <span className="text-slate-600 font-medium">sign in &amp; go</span>
              </span>
            </div>

            {/* Stats */}
            <div className="anim-4 flex items-center gap-8 mt-12 pt-10 border-t border-slate-100">
              {[
                { v: "3",    l: "Role Portals"  },
                { v: "∞",   l: "Exams & Tests"  },
                { v: "100%", l: "Web-Based"      },
              ].map(({ v, l }) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-emerald-600">{v}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Card Visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-80 float">

              {/* Back decorative card */}
              <div className="absolute -top-4 -right-7 w-64 h-72 rounded-2xl border border-slate-200 bg-slate-50 rotate-6 shadow-sm" />

              {/* Main card */}
              <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">

                {/* Card header */}
                <div className="px-6 py-5" style={{background:"linear-gradient(135deg,#059669,#10b981)"}}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm">Live Exam Dashboard</span>
                  </div>
                  <p className="text-emerald-100 text-xs">Mathematics — Class X &nbsp;•&nbsp; 60 min</p>
                </div>

                {/* Card body */}
                <div className="px-6 py-5 space-y-4 bg-white">

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Progress</span>
                      <span className="text-emerald-600 font-medium">18 / 30 questions</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 rounded-full" style={{background:"linear-gradient(90deg,#059669,#34d399)"}} />
                    </div>
                  </div>

                  {/* Role chips */}
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label:"Admin",   color:"text-amber-600   bg-amber-50   border-amber-200"   },
                      { label:"Teacher", color:"text-sky-600     bg-sky-50     border-sky-200"     },
                      { label:"Student", color:"text-emerald-600 bg-emerald-50 border-emerald-200" },
                    ].map(({ label, color }) => (
                      <span key={label} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${color}`}>
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[{v:"24",l:"Students"},{v:"6",l:"Tests"},{v:"98%",l:"Uptime"}].map(({v,l}) => (
                      <div key={l} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                        <p className="font-display text-slate-800 font-bold text-lg">{v}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Online avatars */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {["bg-emerald-500","bg-amber-500","bg-sky-500"].map((c,i) => (
                        <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white`} />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">12 students online</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-9 bg-white border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-xs font-semibold text-amber-600">Instant Results</p>
                  <p className="text-[10px] text-slate-400">Auto-graded submissions</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════
          ROLE CARDS
      ════════════════════════════ */}
      <section className="relative z-10 bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[.2em] uppercase text-emerald-600 mb-3">
              Three Portals. One Platform.
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">Built for Every Role</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji:"🏫", role:"Administrator",
                border:"border-amber-200",
                bg:"bg-white",
                topBar:"bg-amber-500",
                badge:"text-amber-600 bg-amber-50 border-amber-200",
                dot:"bg-amber-400",
                items:["School configuration","User & role management","Reports & analytics","Academic calendar"],
              },
              {
                emoji:"📝", role:"Teacher",
                border:"border-sky-200",
                bg:"bg-white",
                topBar:"bg-sky-500",
                badge:"text-sky-600 bg-sky-50 border-sky-200",
                dot:"bg-sky-400",
                items:["Create & manage tests","Question bank builder","Review submissions","Grade & publish results"],
              },
              {
                emoji:"🎓", role:"Student",
                border:"border-emerald-200",
                bg:"bg-white",
                topBar:"bg-emerald-500",
                badge:"text-emerald-600 bg-emerald-50 border-emerald-200",
                dot:"bg-emerald-500",
                items:["Attend online exams","View results instantly","Download report cards","Track performance"],
              },
            ].map(({ emoji, role, border, bg, topBar, badge, dot, items }) => (
              <div key={role}
                className={`rounded-2xl ${bg} border ${border} overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default`}>
                {/* coloured top bar */}
                <div className={`h-1.5 w-full ${topBar}`} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{emoji}</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge}`}>{role}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-5 text-slate-800">{role} Portal</h3>
                  <ul className="space-y-3">
                    {items.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CTA BANNER
      ════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 md:px-12 py-24">
        <div className="rounded-3xl border border-emerald-200 overflow-hidden relative"
          style={{background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)"}}>
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center p-10 md:p-16">
            <p className="text-xs font-semibold tracking-[.2em] uppercase text-emerald-600 mb-4">
              Ready to get started?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5 text-slate-900">
              Log in and take <br className="hidden sm:block" />
              <em className="grad-text not-italic">control today</em>
            </h2>
            <p className="text-slate-500 text-lg font-light mb-10 max-w-lg mx-auto">
              Your school's complete academic workflow — exams, results, submissions — all in one beautifully simple platform.
            </p>

            <Link href="/auth/login">
              <button
                className="inline-flex items-center gap-3 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{background:"linear-gradient(135deg,#059669,#10b981)",boxShadow:"0 8px 28px rgba(16,185,129,.35)"}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login to Portal
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          FOOTER
      ════════════════════════════ */}
      <footer className="relative z-10 border-t border-slate-100 bg-white py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{background:"linear-gradient(135deg,#059669,#10b981)"}}>
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-display font-bold text-base text-slate-800">Smart Shala</span>
          </div>

          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Smart Shala School Management System
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink" />
            All systems operational
          </div>
        </div>
      </footer>

    </div>
  );
}