import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  images: string[];
  thumbnail: string;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
};

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [bigImg, setBigImg] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const { cartItems } = useContext(CartContext);

  const isInCart = product
    ? cartItems.some((item) => item.id === product.id)
    : false;

  // Fetch product data
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

  // Fetch related products
  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${product.category}`
        );
        setRelatedProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelated();
  }, [product]);

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

  // Slider settings
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 2, arrows: false } },
    ],
  };

  const relatedSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 4, arrows: true },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, arrows: true },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, arrows: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, arrows: true },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true, // ✅ مهم جداً للموبايل
          appendDots: (dots: React.ReactNode) => (
            <div
              style={{
                bottom: "-25px",
                display: "flex",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <ul style={{ margin: "0px", display: "flex" }}> {dots} </ul>
            </div>
          ),
          customPaging: () => (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#A3CEF1",
                transition: "all 0.3s ease",
              }}
            ></div>
          ),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-20">
      {/* Product Details */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Images */}
        <div className="flex flex-col items-center">
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-4 sm:mb-6 shadow-lg">
            <img
              src={bigImg}
              alt={product.title}
              className="object-contain h-full w-full p-2 sm:p-4 transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full px-2">
            <Slider {...thumbnailSettings}>
              {product.images.map((img, idx) => (
                <div key={idx} className="px-1">
                  <img
                    src={img}
                    alt={product.title}
                    onClick={() => setBigImg(img)}
                    className={`w-full h-16 sm:h-20 md:h-24 mt-1 sm:mt-2 object-contain rounded-lg sm:rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                      bigImg === img
                        ? "border-blue-600 scale-105 shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>
            <h3 className="text-base sm:text-lg md:text-xl text-gray-500 font-semibold mb-3 sm:mb-4">
              {product.brand}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-green-600 font-medium text-xs sm:text-sm">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {product.category}
              </p>
              {product.availabilityStatus && (
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
              )}
              {product.warrantyInformation && (
                <p>
                  <span className="font-semibold text-gray-700">Warranty:</span>{" "}
                  {product.warrantyInformation}
                </p>
              )}
              {product.shippingInformation && (
                <p>
                  <span className="font-semibold text-gray-700">Shipping:</span>{" "}
                  {product.shippingInformation}
                </p>
              )}
              {product.returnPolicy && (
                <p>
                  <span className="font-semibold text-gray-700">
                    Return Policy:
                  </span>{" "}
                  {product.returnPolicy}
                </p>
              )}
            </div>
          </div>

          {/* Cart Button */}
          <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 flex-wrap">
            <Link
              to="/cart"
              className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:from-blue-700
               hover:to-blue-600 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              {isInCart ? "Item In Cart" : "Add to Cart"}
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-10 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-2 sm:mb-3 capitalize">
          Related Products
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xs sm:max-w-lg md:max-w-xl mb-6 sm:mb-8 px-1">
          Discover our best {product.category.replace("-", " ")} collection with
          amazing deals!
        </p>

        {relatedProducts.length > 0 ? (
          <Slider {...relatedSettings}>
            {relatedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 8)
              .map((item) => (
                <div key={item.id} className="px-2 w-full h-full">
                  <Link
                    to={`/products/${item.id}`}
                    className="group bg-white rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden w-full h-full block"
                  >
                    <div className="relative h-48 sm:h-52 md:h-56 flex items-center justify-center bg-gray-50">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />

                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-1 sm:px-2 sm:py-1 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-blue-600 font-bold text-sm">
                          ${item.price}
                        </p>
                        <p className="text-yellow-500 text-xs sm:text-sm font-semibold">
                          ⭐ {item.rating}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
