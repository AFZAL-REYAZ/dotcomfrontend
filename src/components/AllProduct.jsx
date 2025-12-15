import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProductsThunk } from "../redux/thunks/productThunk";

export default function AllProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const { products, loading } = useSelector((state) => state.product);

  const hasFilter = Boolean(category || search);

  useEffect(() => {
    dispatch(fetchProductsThunk({ category, search }));
  }, [dispatch, category, search]);

  if (loading) {
    return <div className="text-center pt-20">Loading...</div>;
  }

  return (
    <section
      className={`max-w-7xl mx-auto px-6 md:px-10 pb-20 ${
        hasFilter ? "pt-20" : "pt-0"
      }`}
    >
      {/* HEADER */}
      {hasFilter && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {category && category.replace("-", " ")}
            {search && ` "${search}"`}
          </h2>

          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => navigate("/")}
          >
            See All →
          </button>
        </div>
      )}

      {/* PRODUCT GRID */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="group bg-white rounded-2xl border shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/ProductDetail/${p._id}`)}
            >
              <div className="aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
                <img
                  src={p.image?.[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <h5 className="text-gray-700 font-semibold text-sm">
                  {p.name}
                </h5>
                <span className="text-indigo-600 font-bold">
                  ₹{p.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

