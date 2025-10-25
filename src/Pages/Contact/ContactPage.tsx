import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="mt-6 min-h-screen bg-gradient-to-br from-[#E7ECEF] via-white to-[#A3CEF1] text-[#274C77]">
      {/* 🏷️ Header */}
      <div className="text-center py-16 bg-gradient-to-r from-[#274C77] to-[#6096BA] text-white shadow-md">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto text-[#E7ECEF]">
          We’d love to hear from you! Whether you have questions, feedback, or
          partnership ideas — feel free to reach out.
        </p>
      </div>

      {/* 🧭 Contact Section */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* 📩 Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 text-[#274C77]">
            Send us a message
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-[#274C77] font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-[#A3CEF1] focus:outline-none focus:ring-2 focus:ring-[#6096BA] transition"
              />
            </div>
            <div>
              <label className="block text-[#274C77] font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-[#A3CEF1] focus:outline-none focus:ring-2 focus:ring-[#6096BA] transition"
              />
            </div>
            <div>
              <label className="block text-[#274C77] font-semibold mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-lg border border-[#A3CEF1] focus:outline-none focus:ring-2 focus:ring-[#6096BA] transition resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#274C77] to-[#6096BA] text-white py-3 rounded-full font-semibold hover:from-[#1e3b5b] hover:to-[#4a85a5] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* 📍 Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-[#E7ECEF] rounded-2xl p-6 flex items-start gap-4 shadow-md hover:shadow-lg transition">
            <FaEnvelope className="text-3xl text-[#6096BA]" />
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#274C77]">Email</h3>
              <p className="text-[#8B8C89]">support@shopease.com</p>
            </div>
          </div>
          <div className="bg-[#E7ECEF] rounded-2xl p-6 flex items-start gap-4 shadow-md hover:shadow-lg transition">
            <FaPhoneAlt className="text-3xl text-[#6096BA]" />
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#274C77]">Phone</h3>
              <p className="text-[#8B8C89]">+20 111 234 5678</p>
            </div>
          </div>
          <div className="bg-[#E7ECEF] rounded-2xl p-6 flex items-start gap-4 shadow-md hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-3xl text-[#6096BA]" />
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#274C77]">Address</h3>
              <p className="text-[#8B8C89]">123 Nile Street, Cairo, Egypt</p>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 Footer CTA */}
      <div className="text-center py-16 bg-[#F7FAFC]">
        <h2 className="text-3xl font-bold mb-4 text-[#274C77]">
          Have any questions?
        </h2>
        <p className="text-[#555] mb-8">
          We’re here to help — reach out anytime and we’ll respond as soon as
          possible.
        </p>
        <button className="bg-gradient-to-r from-[#6096BA] to-[#A3CEF1] text-white px-10 py-3 rounded-full font-semibold hover:from-[#274C77] hover:to-[#6096BA] transition-all">
          Chat With Us
        </button>
      </div>
    </div>
  );
}

export default ContactPage;
