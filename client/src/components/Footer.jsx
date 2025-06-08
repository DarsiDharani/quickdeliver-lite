export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Role prompt */}
      <div className="bg-slate-900 text-center py-4 text-sm">
        Are you a{" "}
        <a href="#" className="text-blue-400 underline hover:text-yellow-300">
          Customer
        </a>{" "}
        or{" "}
        <a href="#" className="text-blue-400 underline hover:text-yellow-300">
          Driver
        </a>
        ? Join now and start delivering!
      </div>

      {/* Main footer */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg">
        <div className="w-full mx-auto max-w-screen-xl px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <span className="text-sm text-white text-center md:text-left font-semibold tracking-wide drop-shadow">
            © {new Date().getFullYear()} QuickDeliver Lite. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white md:mt-0 space-x-6">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
