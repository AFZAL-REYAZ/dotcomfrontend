import React from 'react'

const MostLoved = () => {
  return (
    <div>
        {/* Hot Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 ">Customer's Most Loved products</h2>
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
    </div>
  )
}

export default MostLoved