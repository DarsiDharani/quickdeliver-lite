import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="bg-slate-900 text-center py-4 text-sm">
        Are you a{" "}
        <Link to="/register" className="text-blue-400 underline hover:text-yellow-300">Customer</Link>{" "}
        or{" "}
        <Link to="/register" className="text-blue-400 underline hover:text-yellow-300">Driver</Link>
        ? Join now and start delivering!
      </div>

      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg">
        <div className="w-full mx-auto max-w-screen-xl px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <span className="text-sm font-semibold tracking-wide drop-shadow text-white">
            © {new Date().getFullYear()} QuickDeliver Lite. All Rights Reserved.
          </span>
       <ul className="flex flex-wrap items-center mt-3 text-sm font-medium md:mt-0 space-x-6">
  <li><Link to="/about" className="hover:underline">About</Link></li>
  <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
  <li><Link to="/licensing" className="hover:underline">Licensing</Link></li>
  <li><Link to="/contact" className="hover:underline">Contact</Link></li>
</ul>
        </div>
      </div>
    </footer>
  );
}
