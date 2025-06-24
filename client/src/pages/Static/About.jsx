export default function About() {
  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      <img
        src="/assets/About.jpg"
        alt="About Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-transparent to-pink-600/30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
          About QuickDeliver Lite
        </h1>
        <p className="max-w-3xl text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
          QuickDeliver Lite is a modern, role-based delivery system for real-time logistics tracking, built using React and Tailwind CSS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl text-sm text-gray-300 text-left">
          <div>
            <h2 className="text-white font-semibold mb-1">🚚 What We Do</h2>
            <p>We simplify logistics by letting customers create delivery requests and drivers accept them instantly.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-1">🎯 Our Mission</h2>
            <p>Provide a reliable delivery experience using scalable tech and clean UI workflows.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-1">🔐 Why Choose Us</h2>
            <ul className="list-disc list-inside pl-2">
              <li>Live tracking & role-based access</li>
              <li>Secure sessions & feedback</li>
              <li>Simplified, responsive UI</li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-semibold mb-1">⚙️ How It Works</h2>
            <p>Register → Request/Accept → Update Status → Feedback → Done!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
