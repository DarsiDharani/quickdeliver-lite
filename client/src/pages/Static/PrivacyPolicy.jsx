// src/pages/PrivacyPolicy.jsx
export default function PrivacyPolicy() {
  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      <img
        src="./src/assets/privacy.webp"
        alt="Privacy Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-600/20"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Privacy Policy</h1>

        <p className="max-w-2xl text-sm md:text-base text-gray-300 drop-shadow-sm">
          We respect your privacy. Your data is never shared without your consent. QuickDeliver Lite stores only
          essential details needed to provide secure and reliable service for both customers and drivers.
        </p>
      </div>
    </main>
  );
}
