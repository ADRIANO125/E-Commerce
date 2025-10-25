import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Products from "../../Pages/Home/Products";
import "swiper/css";
import "swiper/css/pagination";
import "../../Pages/Home/Home.css";

type Product = {
  id: number;
  title: string;
    description: string;
    image: string;
    action: string;
};

function HomeSlide() {
  return (
    <section className="home-section py-6">
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
      >
        {Products.map((product : Product) => (
          <SwiperSlide key={product.id}>
            <div
              className="relative w-full min-h-[350px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay لتغميق الصورة شوي */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* المحتوى فوق الصورة */}
              <div className="relative z-10 text-center text-white px-3 sm:px-6">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg leading-snug">
                  {product.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl mb-6 opacity-90 max-w-xl mx-auto">
                  {product.description}
                </p>
                <Link
                  to="/cart"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 sm:px-8 rounded-full transition duration-300 shadow-lg text-sm sm:text-base"
                >
                  {product.action}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>  )
}

export default HomeSlide