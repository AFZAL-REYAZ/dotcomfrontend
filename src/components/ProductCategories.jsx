import React from "react";

export default function ProductCategories() {
  const categories = [
    {
      label: "Mobile",
      img: "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large_2x.jpg",
    },
    {
      label: "Gadgets",
      img: "https://img.freepik.com/premium-photo/collection-electronic-gadgets-accessories-including-headphones-cameras-game-controllers-laptop-other-tech-devices_1187703-129882.jpg?w=2000",
    },
    {
      label: "Head-phone",
      img: "https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg",
    },
    {
      label: "Sound-Box",
      img: "https://d1aeri3ty3izns.cloudfront.net/media/2/26413/1200/preview.jpg",
    },
    {
      label: "H-phone",
      img: "https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg",
    },
    {
      label: "S-Box",
      img: "https://d1aeri3ty3izns.cloudfront.net/media/2/26413/1200/preview.jpg",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      

      {/* Category cards – always in one row */}
      <div className="mt-5 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 min-w-max">
          {categories.map((c, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden bg-white shadow hover:scale-105 transition w-32 sm:w-36 md:w-40 flex-shrink-0"
            >
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-28 sm:h-32 md:h-36 object-cover"
              />
              <h6 className="absolute bottom-0 left-2 bg-white text-black text-xs sm:text-sm px-2 py-1 rounded">
                {c.label}
              </h6>
            </div>
          ))}
        </div>
      </div>


      {/* Promo Banner */}
      <div className="mt-4 overflow-hidden rounded-md">
        <div className="bg-gradient-to-r from-yellow-100 via-white to-yellow-100 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div className="text-sm text-gray-800">
            Flat 400 off on 1999. Code: MAX400 | Flat 200 off on 1499. Code:
            MAX200. Free Shipping over 1999 Orders!
          </div>
          <div className="mt-2 sm:mt-0 text-xs font-semibold text-indigo-700">
            Shop Now
          </div>
        </div>
      </div>

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
