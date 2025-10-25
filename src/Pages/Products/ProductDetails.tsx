import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CartContext } from "../../Context/CartContext";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  // ✅ خصائص إضافية من الكود بتاعك
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bigImg, setBigImg] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cartItems } = useContext(CartContext);
  const isInCart = cartItems.some((item) => item.id === product?.id);

  // ✅ جلب بيانات المنتج الأساسي
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setBigImg(res.data.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ جلب المنتجات المشابهة بناءً على الكاتيجوري
  useEffect(() => {
    if (!product) return;

    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${product.category}`
        );
        setRelatedProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product?.category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-10">Product not found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      {/* ✅ تفاصيل المنتج */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
        {/* الصور */}
        <div className="flex flex-col items-center">
          <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden mb-6 shadow-md">
            <img
              src={bigImg}
              alt={product.title}
              className="object-contain h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                onClick={() => setBigImg(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                  bigImg === img
                    ? "border-blue-600 scale-105 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.title}
            </h1>
            <h3 className="text-lg text-gray-500 font-semibold mb-2">
              {product.brand}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="text-green-600 font-medium">
                -{product.discountPercentage}%
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Availability:
                </span>{" "}
                <span
                  className={`${
                    product.availabilityStatus === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-medium`}
                >
                  {product.availabilityStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Warranty:</span>{" "}
                {product.warrantyInformation}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Shipping:</span>{" "}
                {product.shippingInformation}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Return Policy:
                </span>{" "}
                {product.returnPolicy}
              </p>
            </div>
          </div>

          {/* زرار */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/cart"
              className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700
               hover:to-blue-600 transition-all transform hover:-translate-y-0.5"
            >
              {isInCart ? "Item In Cart" : "Add to Cart"}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-3 capitalize">
          Related Products
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mb-10">
          Discover our best {product.category.replace("-", " ")} collection with
          amazing deals!
        </p>

        {relatedProducts.length > 0 ? (
          <Swiper
            navigation
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="mySwiper pb-12"
          >
            {relatedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 8)
              .map((item) => (
                <SwiperSlide key={item.id} className="flex justify-center">
                  <Link
                    to={`/products/${item.id}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-64"
                  >
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-blue-600 font-bold">${item.price}</p>
                        <p className="text-yellow-500 text-sm font-semibold">
                          ⭐ {item.rating}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <p className="text-gray-500 text-center">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
