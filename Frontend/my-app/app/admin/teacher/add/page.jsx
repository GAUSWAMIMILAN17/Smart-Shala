// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "../../../../utils/data.js";

// export default function RegisterPage() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "TEACHER",
//     })
//     const router = useRouter();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(formData);
//         try {

//             const res = await axios.post(`${USER_API_ENDPOINT}/admin/registerTeacher`, formData, {
//                 withCredentials: true,
//             })
//             if(res.data.success) {
//                 alert(res.data.message);
//                 router.push("/admin/");
//             } 

//         } catch (error) {
//             console.log("Server Error", error)
//                 alert(error.response.data.message || "Something went wrong");
//         }
//     }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Register
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Login As
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="TEACHER">Teacher</option>
//               <option value="STUDENT">Student</option>
//             </select>
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="example@gmail.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             Signup
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           © {new Date().getFullYear()} SmartShala
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "TEACHER",
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
        `${USER_API_ENDPOINT}/admin/registerTeacher`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        router.push("/admin/teacher");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: "TEACHER",
      label: "Teacher",
      icon: "📝",
      desc: "Can create tests & grade students",
      color: "text-sky-600 bg-sky-50 border-sky-200",
      activeRing: "ring-sky-400",
    },
    {
      value: "STUDENT",
      label: "Student",
      icon: "🎓",
      desc: "Can attend exams & view results",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      activeRing: "ring-emerald-400",
    },
  ];

  const selectedRole = roles.find((r) => r.value === formData.role);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .page-font  { font-family: 'DM Sans', sans-serif; }
        .logo-font  { font-family: 'Lora', serif; }
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
        input:focus, select:focus { outline: none; }
      `}</style>

      <div className="page-font min-h-screen bg-slate-50 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">

          {/* ── Back link ── */}
          <div className="fade-up mb-6">
            <Link
              href="/admin/teacher"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Teachers
            </Link>
          </div>

          {/* ── Card ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Card top accent */}
            <div className="h-1" style={{ background: "linear-gradient(90deg,#059669,#10b981,#0284c7)" }} />

            <div className="p-8">

              {/* Heading */}
              <div className="fade-up-1 mb-7">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold tracking-[.15em] uppercase text-emerald-600">
                    Admin · Register
                  </span>
                </div>
                <h1 className="logo-font text-2xl font-bold text-slate-900 tracking-tight">
                  Add New User
                </h1>
                <p className="text-slate-400 text-sm font-light mt-1">
                  Register a Teacher or Student to the system.
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

                {/* ── Role selector ── */}
                <div className="fade-up-1">
                  <label className="block text-xs font-semibold tracking-[.1em] uppercase text-slate-400 mb-2.5">
                    Register As
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map(({ value, label, icon, desc, color, activeRing }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: value })}
                        className={`relative flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                          formData.role === value
                            ? `${color} border-current ring-2 ${activeRing} ring-offset-1`
                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
                        }`}
                      >
                        <span className="text-xl mb-0.5">{icon}</span>
                        <span className="text-sm font-semibold">{label}</span>
                        <span className="text-[11px] font-light leading-tight opacity-70">{desc}</span>
                        {formData.role === value && (
                          <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-current flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

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
                      placeholder="example@smartshala.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* ── Password ── */}
                <div className="fade-up-4">
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
                    The user should change this password after first login.
                  </p>
                </div>

                {/* ── Summary pill ── */}
                {formData.name && (
                  <div className={`fade-up flex items-center gap-3 px-4 py-3 rounded-xl border ${selectedRole?.color}`}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: formData.role === "TEACHER" ? "linear-gradient(135deg,#0284c7,#38bdf8)" : "linear-gradient(135deg,#059669,#34d399)" }}
                    >
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{formData.name}</span>
                      <span className="opacity-60"> will be registered as </span>
                      <span className="font-semibold">{selectedRole?.label}</span>
                    </div>
                  </div>
                )}

                {/* ── Actions ── */}
                <div className="fade-up-5 flex gap-3 pt-1">
                  <Link
                    href="/admin/teacher"
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
                        Create {selectedRole?.label}
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-300 mt-6">
            © {new Date().getFullYear()} SmartShala · Admin Panel
          </p>

        </div>
      </div>
    </>
  );
}