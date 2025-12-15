import React from "react";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

export default function ProductCategories() {
  const navigate=useNavigate();
  const categories = [
    {
      label: "Mobile",
      img: "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large_2x.jpg",
      category:"mobiles",
    },
    {
      label: "Gadgets",
      img: "https://img.freepik.com/premium-photo/collection-electronic-gadgets-accessories-including-headphones-cameras-game-controllers-laptop-other-tech-devices_1187703-129882.jpg?w=2000",
      category:"phone-covers",
    },
    {
      label: "Head-phone",
      img: "https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg",
      category:"head-phones",
    },
    {
      label: "Sound-Box",
      img: "https://d1aeri3ty3izns.cloudfront.net/media/2/26413/1200/preview.jpg",
      category:"sound-boxes",
    },
    {
      label: "H-phone",
      img: "https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg",
      category:"",
    },
    {
      label: "S-Box",
      img: "https://d1aeri3ty3izns.cloudfront.net/media/2/26413/1200/preview.jpg",
      category:"",
    },
  ];

  return (
    <div className=" mx-auto p-4">


      {/* Category cards – always in one row */}
      <div className="mt-5 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 min-w-max">
          {categories.map((c, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden bg-white shadow hover:scale-105 transition w-32 sm:w-36 md:w-40 flex-shrink-0"
              onClick={() => navigate(`/products/${c.category}`)}
            >
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-28 sm:h-32 md:h-36 object-cover"
              />
            </div>
          ))}
        </div>
      </div>


      {/* Carousel Section with fullscreen trigger */}
      <section className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="mt-4">
          <Carousel />
        </div>
      </section>

      {/* FEATURES ROW */}
      <section className="py-10 max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { title: "HOT DELIVERY", icon: "🚚" },
            { title: "FEATURES", icon: "⭐" },
            { title: "TECH SUPPORT", icon: "🛠️" },
            { title: "EASY RETURN", icon: "💳" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl">{item.icon}</span>

              <h3 className="mt-1 md:mt-2 font-semibold text-gray-800 text-xs md:text-sm">
                {item.title}
              </h3>

              <p className="hidden md:block text-gray-500 text-xs mt-1">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="mt-3 bg-indigo-700 rounded p-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee py-1 text-white text-sm">
          <span className="mr-8">Flat 400 off on 9999. Code: DOTCOM4U</span>
          <span className="mr-8">Flat 200 off on 1999. Code: DOTCOM4U</span>
          <span className="mr-8">Free Shipping over 1999 Orders!</span>
        </div>
      </div>


      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
      `}</style>

    </div>
  );
}
