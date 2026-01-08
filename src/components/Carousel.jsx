import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gadgets from "../assets/carousel/gadgets.jpg";
import smartwatch from "../assets/carousel/smartwatch.jpg"

const images = [
  gadgets,
  "https://www.mobilityindia.com/wp-content/uploads/2019/05/special-story-apr.jpg",
  smartwatch,
];

export default function Carousel({ className = "" }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-[40vh] md:h-[60vh] overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0 overflow-hidden">

            {/* 🔥 Blurred Background */}
            <img
              src={img}
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
              alt=""
            />

            {/* ✅ Main Sharp Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt={`carousel-${idx}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


