import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../components/Footer"; // Adjust path as needed

const slides = [
  {
    src: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1500&q=80",
    text: "Fast, Reliable Delivery for Everyone",
  },
  {
    src: "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=1500&q=80",
    text: "Track Your Packages in Real Time",
  },
  {
    src: "https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg?auto=compress&w=1500&q=80",
    text: "Join as a Customer or Driver Today",
  },
];

export default function Home() {
  return (
    <div className="w-full bg-black">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={1000}
        showArrows
        renderIndicator={() => null}
        stopOnHover={false}
        swipeable
        emulateTouch
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full">
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full object-cover h-[85vh]"
              draggable="false"
              aria-hidden="true"
            />
            {/* Overlay Text and Button */}
            <div className="absolute bottom-24 w-full flex flex-col items-center justify-center">
              <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg max-w-3xl">
                <h2 className="text-xl md:text-2xl font-semibold text-white text-center drop-shadow-lg">
                  {slide.text}
                </h2>
              </div>
              <Link to="/register" className="mt-4">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
