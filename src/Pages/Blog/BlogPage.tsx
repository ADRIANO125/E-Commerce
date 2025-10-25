import React from "react";
import { FaClock, FaUserAlt, FaArrowRight } from "react-icons/fa";

function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "5 Smart Shopping Tips for Every Buyer",
      author: "Sarah Ahmed",
      date: "October 10, 2025",
      image: "https://media.kingston.com/kingston/hero/ktc-hero-blog-gaming-set-up-after-pc-build-lg.jpg",
      excerpt:
        "Shopping online can be tricky — here are the best tips to help you get great deals, save time, and make the most out of your shopping experience.",
    },
    {
      id: 2,
      title: "How Technology is Changing Modern Retail",
      author: "Omar Khaled",
      date: "September 25, 2025",
      image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=800",
      excerpt:
        "From AI recommendations to same-day delivery — explore how technology is transforming the retail world into a faster, smarter experience.",
    },
    {
      id: 3,
      title: "The Rise of Sustainable Fashion Brands",
      author: "Laila Mansour",
      date: "August 18, 2025",
      image: "https://www.samma3a.com/tech/ar/wp-content/uploads/sites/3/2019/08/Main.jpg",
      excerpt:
        "Discover how sustainable fashion is shaping the future of style — with eco-friendly materials and conscious design choices.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7ECEF] via-white to-[#A3CEF1] text-[#274C77] mt-6">
      {/* 📰 Header */}
      <div className="text-center py-16 bg-gradient-to-r from-[#274C77] to-[#6096BA] text-white shadow-md">
        <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg max-w-2xl mx-auto text-[#E7ECEF]">
          Discover stories, tips, and insights about shopping, technology, and
          lifestyle — all in one place.
        </p>
      </div>

      {/* 🧩 Blog Cards */}
      <div className="container mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover  bg-gray-100"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 hover:text-[#6096BA] transition-colors">
                {blog.title}
              </h2>
              <div className="flex items-center text-sm text-[#8B8C89] mb-4 gap-4">
                <span className="flex items-center gap-1">
                  <FaUserAlt /> {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock /> {blog.date}
                </span>
              </div>
              <p className="text-[#555] mb-6 leading-relaxed">{blog.excerpt}</p>
              <button className="flex items-center gap-2 text-[#274C77] font-semibold hover:text-[#6096BA] transition-colors">
                Read More <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📬 Newsletter */}
      <div className="bg-[#274C77] text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-[#A3CEF1] mb-8">
          Subscribe to our newsletter for the latest posts and offers.
        </p>
        <div className="flex justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full w-full outline-none text-[#274C77]"
          />
          <button className="bg-[#A3CEF1] text-[#274C77] px-6 py-3 rounded-full font-semibold hover:bg-[#6096BA] hover:text-white transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
