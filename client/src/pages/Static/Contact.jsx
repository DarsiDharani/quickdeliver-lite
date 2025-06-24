// src/pages/Contact.jsx
export default function Contact() {
  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="./src/assets/Contact.webp"
        alt="Contact Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-transparent to-green-600/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Contact Us</h1>

        <p className="max-w-2xl text-base md:text-lg text-gray-300 mb-6 drop-shadow-sm">
          Got questions or feedback? Reach out to our team — we’re here to support your QuickDeliver Lite experience!
        </p>

        <div className="text-sm space-y-3 text-gray-300">
          <p>📧 Email: support@quickdeliverlite.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Location: Hyderabad, India</p>
        </div>
      </div>
    </main>
  );
}
