import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Banners11_Desktop from "../assets/carousel/Banners111.jpg";
import Banners12_Desktop from "../assets/carousel/Banners121.jpg";
import Banners13_Desktop from "../assets/carousel/Banners31.jpg";

const images = [Banners11_Desktop, Banners12_Desktop, Banners13_Desktop];

export default function Carousel({ className = "" }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const nextSlide = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Always fullscreen
  const containerClasses = "relative w-full h-[60vh] overflow-hidden rounded-none shadow-none ";
  const imageClasses = "w-full h-screen object-cover";

  return (
    <div className={`${containerClasses}${className}`}>
      {/* Slide track */}
      <div
        className="flex transition-transform ease-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full flex-shrink-0">
            <img src={img} alt={`carousel-${idx}`} className={imageClasses} />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-8 left-6 md:left-10 text-white">
              <p className="text-xs md:text-sm tracking-wide uppercase opacity-80">
                DotCom Gaggets
              </p>
              <h2 className="mt-1 text-xl md:text-3xl font-semibold">
                Crafted couture for your moments
              </h2>
              <div className="mt-4 inline-flex items-center gap-3">
                <a
                  href="#categories"
                  className="px-5 py-2 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-200 transition"
                >
                  Explore
                </a>
                <a
                  href="/contactus"
                  className="px-5 py-2 rounded-full border border-white/60 text-white text-sm hover:bg-white/10 transition"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow hover:bg-white transition"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 text-gray-900 p-2 rounded-full shadow hover:bg-white transition"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full ${
              current === idx ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
