import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import ProductCategories from '../components/ProductCategories'
import MostLoved from '../components/MostLoved'

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

const Home = () => {

  return (
    <div className="min-h-screen pt-15 bg-gray-50">
      <ProductCategories/>
      {/* Carousel Section with fullscreen trigger */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4">
          <Carousel />
        </div>
      </section>

      <MostLoved/>
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

    </div>
  )
}

export default Home