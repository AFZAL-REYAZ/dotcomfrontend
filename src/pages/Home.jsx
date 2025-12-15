import React from 'react'
import ProductCategories from '../components/ProductCategories'
import AllProduct from '../components/AllProduct'

// const featured = [
//   {
//     id: 1,
//     name: 'Galaxy S24 Ultra',
//     price: 1199,
//     img: 'https://image-us.samsung.com/us/smartphones/galaxy-s24/all-gallery/01_E3_TitaniumBlack_Lockup_1600x1200.jpg?$product-details-jpg$?$product-details-thumbnail-jpg$',
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: 'MacBook Air M2',
//     price: 999,
//     img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: 'iPad Pro 12.9"',
//     price: 1099,
//     img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop',
//     rating: 4.6,
//   },
//   {
//     id: 4,
//     name: 'Sony WH-1000XM5',
//     price: 349,
//     img: 'https://www.bhphotovideo.com/images/images2000x2000/sony_wh1000xm5_s_wh_1000xm5_noise_canceling_wireless_over_ear_1706394.jpg',
//     rating: 4.9,
//   },
// ]

const Home = () => {

  return (
    <div className="min-h-screen pt-15 bg-gray-50">
      <ProductCategories/>     
      <AllProduct/>
    </div>
  )
}

export default Home