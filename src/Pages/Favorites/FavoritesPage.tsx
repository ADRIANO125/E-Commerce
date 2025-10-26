import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { FaHeart, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const { favoriteItems, removeFromFavorites, addToCart } =
    useContext(CartContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* 🩷 العنوان المحسّن */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <FaHeart className="text-red-500 text-4xl animate-pulse drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              My Favorites
            </h1>
            <FaHeart className="text-red-500 text-4xl animate-pulse drop-shadow-lg" />
          </div>
          <p className="text-gray-600 text-lg">
            {favoriteItems.length > 0
              ? `You have ${favoriteItems.length} favorite ${
                  favoriteItems.length === 1 ? "item" : "items"
                }`
              : "Your wishlist is waiting to be filled"}
          </p>
        </div>

        {/* 🛍️ حالة المفضلة الفاضية */}
        {favoriteItems.length === 0 ? (
          <div className="text-center mt-20 mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <FaHeart className="text-gray-200 text-8xl mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Favorites Yet
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Start adding products you love to your wishlist!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaShoppingCart />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                {/* 🎀 شارة المفضلة */}
                <div className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg">
                  <FaHeart className="text-sm" />
                </div>

                {/* 🖼️ صورة المنتج المحسّنة */}
                <Link to={`/product/${item.id}`} className="block relative overflow-hidden bg-gray-50">
                  <img
                    src={item.images?.[0] || item.thumbnail}
                    alt={item.title}
                    className="w-full h-56 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* 🧾 تفاصيل المنتج المحسّنة */}
                <div className="p-5 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        ${item.price}
                      </span>
                      {item.discountPercentage && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(item.price * (1 + item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 🔘 الأزرار المحسّنة */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaShoppingCart className="text-lg" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaTrashAlt />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;