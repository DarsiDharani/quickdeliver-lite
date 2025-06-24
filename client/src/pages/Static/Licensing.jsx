// src/pages/Licensing.jsx
export default function Licensing() {
  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      <img
        src="./src/assets/Licensing.jpg"
        alt="Licensing Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-red-600/20"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Licensing Information</h1>

        <p className="max-w-2xl text-sm md:text-base text-gray-300 drop-shadow-sm">
          QuickDeliver Lite is an educational internship project. All code and content are intended for learning purposes.
          Commercial use is not permitted without explicit permission.
        </p>
      </div>
    </main>
  );
}
