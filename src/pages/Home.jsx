import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Laptop, Tablet, Watch, Headphones, Plug, Gamepad2, Camera } from 'lucide-react'
import Carousel from '../components/Carousel'
// import LocationPopup from '../components/LocationPopup'

const categories = [
  { name: 'Smartphones', emoji: '📱' },
  { name: 'Laptops', emoji: '💻' },
  { name: 'Tablets', emoji: '📟' },
  { name: 'Smartwatches', emoji: '⌚' },
  { name: 'Headphones', emoji: '🎧' },
  { name: 'Accessories', emoji: '🔌' },
  { name: 'Gaming', emoji: '🎮' },
  { name: 'Cameras & Drones', emoji: '📷' },
]

const featured = [
  {
    id: 1,
    name: 'Galaxy S24 Ultra',
    price: 1199,
    img: 'https://image-us.samsung.com/us/smartphones/galaxy-s24/all-gallery/01_E3_TitaniumBlack_Lockup_1600x1200.jpg?$product-details-jpg$?$product-details-thumbnail-jpg$',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 999,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'iPad Pro 12.9"',
    price: 1099,
    img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: 349,
    img: 'https://www.bhphotovideo.com/images/images2000x2000/sony_wh1000xm5_s_wh_1000xm5_noise_canceling_wireless_over_ear_1706394.jpg',
    rating: 4.9,
  },
]

const promos = [
  { title: 'Free Shipping', desc: 'On orders over $49', icon: '🚚' },
  { title: '1-Year Warranty', desc: 'On most products', icon: '🛡️' },
  { title: 'Easy Returns', desc: '30-day return policy', icon: '🔁' },
]

const Home = () => {
  const [showCarouselFullscreen, setShowCarouselFullscreen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Shop Mobiles & Gadgets
              </h1>
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                Discover the latest smartphones, laptops, wearables, audio gear, and accessories—all in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/ProductDetail" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2.5 text-white shadow hover:bg-indigo-700">
                  Shop Smartphones
                </Link>
                <Link to="/ProductDetail" className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2.5 text-white shadow hover:bg-gray-800">
                  Browse Deals
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-100 p-6 sm:p-8 lg:p-10 shadow">
                <img
                  className="rounded-md w-full object-cover"
                  alt="Gadgets"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Carousel Section with fullscreen trigger */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4">
          <Carousel />
        </div>
      </section>

      {/* Fullscreen Carousel Overlay */}
      {showCarouselFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <button
            onClick={() => setShowCarouselFullscreen(false)}
            className="absolute top-4 right-4 z-[60] rounded-full bg-white/90 px-3 py-1 text-sm text-gray-900 shadow hover:bg-white"
          >
            Close
          </button>
          <Carousel fullscreen className="" />
        </div>
      )}

      {/* Promo Strip */}
      {/* <section className="bg-white border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {promos.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <p className="font-medium text-gray-900">{p.title}</p>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* <LocationPopup/> */}

      

      {/* Hot Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase">Hot Categories</h2>
        <div className="relative mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Mobile Cover', img: 'https://tse3.mm.bing.net/th/id/OIP._MV_H5po5mCwLgaataoZCgHaFk?pid=Api&P=0&h=180' },
              { label: 'Head Phone', img: 'https://img.freepik.com/premium-photo/picture-headphones_931878-357051.jpg' },
              { label: 'Phone', img: 'https://tse1.mm.bing.net/th/id/OIP.jgiyH3bNoAZJEXc2eFJ2DQHaF_?pid=Api&P=0&h=180' },
              { label: 'Phone Stand', img: 'https://m.media-amazon.com/images/I/71G7hzB8ekL.jpg' },
              { label: 'Mobile Cover', img: 'https://tse3.mm.bing.net/th/id/OIP._MV_H5po5mCwLgaataoZCgHaFk?pid=Api&P=0&h=180' },
              { label: 'Head Phone', img: 'https://img.freepik.com/premium-photo/picture-headphones_931878-357051.jpg' },
              { label: 'Phone', img: 'https://tse1.mm.bing.net/th/id/OIP.jgiyH3bNoAZJEXc2eFJ2DQHaF_?pid=Api&P=0&h=180' },
              { label: 'Phone Stand', img: 'https://m.media-amazon.com/images/I/71G7hzB8ekL.jpg' },
              
            ].map((c, idx) => (
              <div key={`${c.label}-${idx}`} className="rounded-xl bg-white border overflow-hidden hover:shadow">
                <div className="w-full h-28 sm:h-40 overflow-hidden">
                  <img src={c.img} alt={c.label} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 text-center text-xs sm:text-sm font-medium text-gray-900">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="hidden sm:flex items-center justify-center absolute -right-2 bottom-2">
            <div className="rounded-full bg-rose-600 text-white px-3 py-2 text-xs font-bold shadow">COUPON 25% OFF</div>
          </div>
        </div>
      </section>
            {/* Price Drop Corner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900 uppercase">Price Drop Corner</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-600 to-red-500 p-6 sm:p-8 text-white">
            <div className="text-center">
              <p className="text-xs uppercase opacity-80">Under</p>
              <h3 className="mt-1 text-5xl sm:text-6xl font-extrabold tracking-wider">₹690</h3>
              <p className="mt-2 text-sm opacity-95">Everything iconic</p>
              <div className="mt-4">
                <Link to="/ProductDetail" className="inline-block px-5 py-2 rounded-full bg-white text-rose-700 font-semibold hover:bg-rose-50">Shop Now</Link>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-600 to-amber-500 p-6 sm:p-8 text-white">
            <div className="text-center">
              <p className="text-xs uppercase opacity-80">From</p>
              <h3 className="mt-1 text-5xl sm:text-6xl font-extrabold tracking-wider">₹90</h3>
              <p className="mt-2 text-sm opacity-95">Accessory Finds</p>
              <div className="mt-4">
                <Link to="/ProductDetail" className="inline-block px-5 py-2 rounded-full bg-white text-orange-700 font-semibold hover:bg-orange-50">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Shop by Category</h2>
          <Link to="/ProductDetail" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</Link>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: 'Smartphones', Icon: Smartphone },
            { name: 'Laptops', Icon: Laptop },
            { name: 'Tablets', Icon: Tablet },
            { name: 'Smartwatch', Icon: Watch },
            { name: 'Headphones', Icon: Headphones },
            { name: 'Accessories', Icon: Plug },
            { name: 'Gaming', Icon: Gamepad2 },
            { name: 'Cameras & Drones', Icon: Camera },
          ].map(({ name, Icon }) => (
            <Link key={name} to="/ProductDetail" className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-indigo-50 transition-colors">
                  <Icon className="text-gray-900 group-hover:text-indigo-700" size={24} />
                </div>
                <p className="font-medium text-gray-900 group-hover:text-indigo-700">{name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Featured Picks</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <div key={p.id} className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square w-full overflow-hidden bg-gray-50">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform" />
              </div>
              <div className="p-4">
                <p className="text-gray-900 font-semibold tracking-tight">{p.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-indigo-700 font-bold">${p.price}</span>
                  <span className="text-xs text-yellow-600">★ {p.rating}</span>
                </div>
                <Link
                  to="/ProductDetail"
                  state={{
                    product: {
                      title: p.name,
                      price: p.price,
                      image: p.img,
                      images: [p.img],
                      sale: false,
                      oldPrice: Math.round(p.price * 1.2),
                    },
                  }}
                  className="mt-3 inline-block px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl bg-gray-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg sm:text-xl font-semibold">Get exclusive deals and early access</h3>
              <p className="text-gray-300 text-sm mt-1">Sign up to receive promotions on mobiles and gadgets.</p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input type="email" placeholder="Your email" className="flex-1 rounded-l-md px-4 py-2 bg-gray-700 text-white placeholder-gray-300 focus:outline-none" />
              <button className="rounded-r-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home