import { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Products from "../../Pages/Home/Products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  action: string;
};

function HomeSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    adaptiveHeight: true,
    beforeChange: (_: number, newIndex: number) => setCurrentSlide(newIndex),
    appendDots: () => (
      <div className="mt-4">
        <ul className="flex justify-center gap-3">
          {Products.map((_, index) => (
            <li key={index}>
              <div
                className={`rounded-full transition-all ${
                  currentSlide === index
                    ? "w-4 h-4 bg-blue-600"
                    : "w-2 h-2 bg-white/50"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    ),
    customPaging: () => <div />, // لتجنب الدوت الافتراضي
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <section className="home-section py-6">
      <Slider {...settings}>
        {Products.map((product: Product) => (
          <div key={product.id} className="px-2">
            <div
              className="relative w-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg leading-tight">
                  {product.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 opacity-90 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                  {product.description}
                </p>
                <Link
                  to="/cart"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 shadow-lg text-xs sm:text-sm md:text-base"
                >
                  {product.action}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HomeSlide;
