export default function StudentFooter() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-900 text-white border-t border-indigo-600">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-4 gap-8">

          {/* Column 1: Logo + Tagline */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold tracking-wide mb-3">
              Smart Shala
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Empowering students with seamless test management, real-time results, and smart learning tools.
            </p>
            <div className="mt-5 flex space-x-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition">
                <span className="text-lg">f</span>
              </div>
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition">
                <span className="text-lg">t</span>
              </div>
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition">
                <span className="text-lg">in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/student/dashboard" className="hover:text-indigo-300 transition">Dashboard</a></li>
              <li><a href="/student/tests" className="hover:text-indigo-300 transition">View Tests</a></li>
              <li><a href="/student/submissions" className="hover:text-indigo-300 transition">My Submissions</a></li>
              <li><a href="/student/results" className="hover:text-indigo-300 transition">View Results</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-100">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-300 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-300 transition">Contact Teacher</a></li>
              <li><a href="#" className="hover:text-indigo-300 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-indigo-300 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-100">Contact Us</h3>
            <div className="space-y-3 text-sm text-indigo-200">
              <p className="flex items-center">
                <span className="mr-2">Email</span> support@smartshala.in
              </p>
              <p className="flex items-center">
                <span className="mr-2">Phone</span> +91 98765 43210
              </p>
              <p className="flex items-center">
                <span className="mr-2">Address</span> Mumbai, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-indigo-600 text-center">
          <p className="text-indigo-200 text-sm">
            © 2025 <span className="font-semibold text-white">Smart Shala</span>. All rights reserved. 
            Made with <span className="text-red-400">❤️</span> for Students.
          </p>
        </div>
      </div>
    </footer>
  );
}