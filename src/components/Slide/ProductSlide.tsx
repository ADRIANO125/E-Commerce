import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Product from "../../Pages/Products/Product";



const categories = [
  "smartphones",
  "laptops",
  "mobile-accessories",
  "tablets",
  "sports-accessories",
];

function ProductSlide() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = categories.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}`)
            .then((res) => res.json())
            .then((data) => ({ cat, products: data.products }))
            .catch(() => ({ cat, products: [] }))
        );

        const results = await Promise.all(promises);
        const data = {};
        results.forEach(({ cat, products }) => (data[cat]  = products));
        setProductsByCategory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className=" mx-auto max-w-7xl">
        {categories.map((cat) => {
          const products = productsByCategory[cat] || [];
          if (!products.length) return null;

          const loopEnabled = products.length > 4;

          return (
            <div key={cat} className="mb-20">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-3 capitalize">
                  {cat.replace("-", " ")}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover our best {cat.replace("-", " ")} collection with
                  amazing deals!
                </p>
              </div>

              {/* Decorative Line */}
              <div className="flex justify-center items-center gap-3 mb-10">
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
              </div>

              {/* Slider */}
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
                loop={loopEnabled}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 16 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="mySwiper pb-12"
              >
                {products.map((item) => (
                  <SwiperSlide key={item.id} className="flex justify-center">
                    <Product product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductSlide;
