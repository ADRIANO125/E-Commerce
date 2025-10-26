import { useContext } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegHeart,
  FaCartPlus,
  FaShare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "./../../Context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../components/Toast";
import type { ProductType } from "../../types/Product";

function Product({ product }: { product: ProductType }) {
  const cartContext = useContext(CartContext);
  const { cartItems, addToCart } = cartContext;
  const { favoriteItems, addToFavorites, removeFromFavorites } = cartContext;
  const { isAuthenticated } = useAuth();
  const isInCart = cartItems.some(
    (item: { id: number }) => item.id === product.id
  );

  const isInFavorites = favoriteItems.some(
    (item: { id: number }) => item.id === product.id
  );

  const handleAddFav = () => {
    if (!isAuthenticated) {
      showToast({
        message: "Please login to add items to favorites.",
        type: "error",
      });
      return;
    }

    if (isInFavorites) {
      removeFromFavorites(product.id);
      showToast({
        message: "Product removed from your favorites.",
        image: product.images[0],
        type: "error",
      });
    } else {
      addToFavorites(product);
      showToast({
        message: "Product added to your favorites!",
        image: product.images[0],
        type: "success",
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto">
      {/* Product Image */}
      <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Tag */}
        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md">
          {product.category.split("-")[0].toUpperCase()}
        </span>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Title */}
        <h3 className="text-gray-800 text-base sm:text-lg font-bold line-clamp-1 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <div className="flex items-center">
            {[...Array(Math.floor(product.rating?.rate ?? 0))].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
            ))}
            {(product.rating?.rate ?? 0) % 1 !== 0 && (
              <FaStarHalfAlt className="text-yellow-400 text-xs sm:text-sm" />
            )}
          </div>
          <span className="text-xs text-gray-500">
            ({(product.rating?.rate ?? 0).toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-2xl font-bold text-blue-600">
              ${product.price}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs sm:text-sm text-gray-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          View Details
        </Link>
      </div>

      {/* Social Icons */}
      <div className="absolute top-16 sm:top-20 -right-16 flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 group-hover:right-3">
        <button
          onClick={handleAddFav}
          className="bg-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <FaRegHeart
            className={`text-base sm:text-lg cursor-pointer transition-colors ${
              isInFavorites
                ? "text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              showToast({
                message: "Please login to add items to cart.",
                type: "error",
              });
              return;
            }

            if (!isInCart) {
              addToCart(product);
              showToast({
                message: "Product added to your cart successfully!",
                image: product.images[0],
                type: "success",
              });
            }
          }}
          className={`bg-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 ${
            isInCart ? "opacity-50 cursor-not-allowed bg-green-500" : ""
          }`}
          disabled={isInCart}
        >
          <FaCartPlus
            className={`text-gray-600 text-base sm:text-lg transition-colors ${
              isInCart ? "text-green-600" : "hover:text-green-600"
            }`}
          />
        </button>

        <button className="bg-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
          <FaShare className="text-gray-600 hover:text-blue-600 text-base sm:text-lg transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default Product;
