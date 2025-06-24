import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    src: "https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg",
    text: "Fast, Reliable Delivery for Everyone",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/05/15/09/01/foodora-3402507_1280.jpg",
    text: "Track Your Packages in Real Time",
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/01/08/19/46/delivery-6924735_1280.jpg",
    text: "Join as a Customer or Driver Today",
  },
];

export default function Home() {
  return (
    <div className="w-full bg-black">
      {/* Carousel Section */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={1000}
        transitionTime={1000}
        showArrows
        stopOnHover
        swipeable
        emulateTouch
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full">
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full object-cover h-[90vh] brightness-75"
              draggable="false"
              aria-hidden="true"
            />
            <div className="absolute bottom-24 w-full flex flex-col items-center justify-center">
              <div className="bg-black bg-opacity-60 px-6 py-4 rounded-lg max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">
                  {slide.text}
                </h2>
              </div>
              <Link to="/register" className="mt-6">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition font-semibold shadow">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Features Section */}
      <section className="bg-gray-900 py-12 px-6 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose QuickDeliver Lite?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast Delivery</h3>
            <p>Get your packages delivered swiftly with real-time tracking and reliable service.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-purple-500 transition">
            <h3 className="text-xl font-semibold mb-2">🛡️ Secure & Reliable</h3>
            <p>Your items are in safe hands from pickup to drop-off with end-to-end security.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-pink-500 transition">
            <h3 className="text-xl font-semibold mb-2">🤝 Join as Customer or Driver</h3>
            <p>Start using or delivering today. Our platform supports both customers and delivery agents.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
