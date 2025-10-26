import { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../../Pages/Products/Product";
import type { ProductType } from "../../types/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  "smartphones",
  "laptops",
  "mobile-accessories",
  "tablets",
  "sports-accessories",
];

type ProductsByCategory = {
  [key: string]: ProductType[];
};

function ProductSlide() {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});
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

        const data: ProductsByCategory = {};
        results.forEach(({ cat, products }) => {
          data[cat] = products;
        });

        setProductsByCategory(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
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

  // Slick settings for different screen sizes
  const getSliderSettings = (productsCount: number) => {
    const loopEnabled = productsCount > 4;

    return {
      dots: false,
      infinite: loopEnabled,
      speed: 500,
      slidesToShow: 4, // default for large screens
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1536, // 2xl
          settings: {
            slidesToShow: 4,
            arrows: true,
          },
        },
        {
          breakpoint: 1280, // xl
          settings: {
            slidesToShow: 3,
            arrows: true,
          },
        },
        {
          breakpoint: 1024, // lg
          settings: {
            slidesToShow: 3,
            arrows: true,
          },
        },
        {
          breakpoint: 768, // md (تابلت)
          settings: {
            slidesToShow: 2, // خليها كاردين فقط
            arrows: true,
          },
        },
        {
          breakpoint: 640, // sm (موبايل)
          settings: {
            slidesToShow: 1, // كارد واحد فقط
            arrows: false,
            dots: false, // يفضل تضيف Dots للموبايل
          },
        },
      ],
    };
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-3 sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {categories.map((cat) => {
          const products = productsByCategory[cat] || [];
          if (!products.length) return null;

          return (
            <div key={cat} className="mb-16 sm:mb-20">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-2 sm:mb-3 capitalize">
                  {cat.replace("-", " ")}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-lg md:max-w-xl mx-auto px-2">
                  Discover our best {cat.replace("-", " ")} collection with
                  amazing deals!
                </p>
              </div>

              {/* Slick Slider */}
              <Slider {...getSliderSettings(products.length)}>
                {products.map((item: ProductType) => (
                  <div key={item.id} className="px-2 h-full">
                    <Product product={item} />
                  </div>
                ))}
              </Slider>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductSlide;
