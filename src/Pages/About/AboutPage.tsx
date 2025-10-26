import {
  FaShoppingBag,
  FaHeart,
  FaUsers,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaAward,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#E7ECEF] text-gray-800 mt-6 ">
      {/* 🏷️ Hero Section */}
      <div className="bg-[#274C77] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-[#A3CEF1]">Venom Store</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#E7ECEF]/90 leading-relaxed">
            Your trusted destination for quality products, great prices, and a smooth shopping experience — designed for your comfort.
          </p>
        </div>
      </div>

      {/* 🧾 Our Story */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* النص */}
        <div>
          <h2 className="text-3xl font-semibold text-[#274C77] mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At <strong className="text-[#274C77]">ShopEase</strong>, we believe
            shopping should be simple, secure, and enjoyable. We offer premium
            quality products that make your everyday life easier — from
            electronics and fashion to home essentials and more.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With years of experience, our mission is to deliver value, trust,
            and satisfaction to every customer. Your happiness is our priority.
          </p>
        </div>

        {/* الصورة */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
            alt="About ShopEase"
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 🌟 Why Choose Us */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#274C77] mb-8">
            Why Choose Us?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1 */}
            <div className="bg-[#E7ECEF] rounded-xl p-6 shadow hover:shadow-md transition">
              <FaShoppingBag className="text-[#274C77] text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Wide Variety</h3>
              <p className="text-gray-600 text-sm">
                Thousands of products across different categories to meet all
                your needs.
              </p>
            </div>
            {/* 2 */}
            <div className="bg-[#E7ECEF] rounded-xl p-6 shadow hover:shadow-md transition">
              <FaHeart className="text-[#6096BA] text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Customer Care</h3>
              <p className="text-gray-600 text-sm">
                We value your satisfaction — providing support whenever you need
                it.
              </p>
            </div>
            {/* 3 */}
            <div className="bg-[#E7ECEF] rounded-xl p-6 shadow hover:shadow-md transition">
              <FaTruck className="text-[#8B8C89] text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Reliable shipping that gets your items to you quickly and
                safely.
              </p>
            </div>
            {/* 4 */}
            <div className="bg-[#E7ECEF] rounded-xl p-6 shadow hover:shadow-md transition">
              <FaUsers className="text-[#A3CEF1] text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Dedicated Team</h3>
              <p className="text-gray-600 text-sm">
                A professional and passionate team always here to help you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🛡️ Trust Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="bg-[#6096BA] text-white rounded-3xl p-10 shadow-lg">
          <FaShieldAlt className="text-5xl mx-auto mb-4 text-[#E7ECEF]" />
          <h2 className="text-3xl font-bold mb-3">Your Trust, Our Promise</h2>
          <p className="text-[#E7ECEF]/90 max-w-2xl mx-auto mb-6">
            Every transaction is secured with industry-grade encryption and
            privacy protection. We make sure your data and payments are always
            safe.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex flex-col items-center">
              <FaStar className="text-yellow-300 text-2xl mb-1" />
              <span>Quality Products</span>
            </div>
            <div className="flex flex-col items-center">
              <FaRocket className="text-yellow-300 text-2xl mb-1" />
              <span>Fast Service</span>
            </div>
            <div className="flex flex-col items-center">
              <FaAward className="text-yellow-300 text-2xl mb-1" />
              <span>Customer Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 CTA */}
      <div className="bg-[#274C77] text-center text-white py-14">
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Shopping?</h2>
        <p className="text-[#E7ECEF]/90 mb-6">
          Join thousands of happy customers today and enjoy a seamless shopping experience.
        </p>
        <Link to="/category/all" className="bg-[#A3CEF1] hover:bg-[#6096BA] text-[#274C77] font-semibold px-8 py-3 rounded-full transition">
          Explore All Categories
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
