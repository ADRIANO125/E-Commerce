import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import navLinks from "./NavData";
import type { NavItem } from "./NavData";
import { useAuth } from "../../hooks/useAuth";

interface Category {
  slug: string;
  name: string;
}

function BtmHeader() {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    axios
      .get<Category[]>("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      navigate("/");
    } else {
      navigate(`/category/${value}`);
    }
  };

  const handleMobileCategoryChange = (slug: string) => {
    setMobileCategoryOpen(false);
    if (slug === "all") {
      navigate("/");
    } else {
      navigate(`/category/${slug}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Categories Dropdown */}
          <div className="flex-shrink-0 hidden md:block">
            <select
              name="category"
              id="category"
              disabled={isLoading}
              className="px-4 py-2.5 rounded-lg bg-white text-gray-700 border-2 border-transparent 
               focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300
               hover:border-blue-200 transition-all duration-200 cursor-pointer
               disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm appearance-none pr-8"
              onChange={handleCategoryChange}
              value={
                location.pathname.startsWith("/category/")
                  ? location.pathname.split("/")[2]
                  : "all"
              }
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Navigation Links (desktop only) */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex flex-wrap justify-center items-center gap-2">
              {navLinks.map((link: NavItem) => (
                <li key={link.id}>
                  <Link
                    to={link.url}
                    className={`inline-block px-4 sm:px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200
                      ${
                        location.pathname === link.url
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-white hover:bg-blue-400 hover:shadow-sm"
                      }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-blue-600 shadow-md font-medium text-sm transition-all">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm
                    ${
                      location.pathname === "/login"
                        ? "bg-white text-blue-600 shadow-md"
                        : "text-white hover:bg-blue-400 hover:shadow-sm"
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm
                    ${
                      location.pathname === "/register"
                        ? "bg-white text-blue-600 shadow-md"
                        : "text-white hover:bg-blue-400 hover:shadow-sm"
                    }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-2 hover:bg-blue-400 rounded-lg transition"
          >
            <HiOutlineMenuAlt3 size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-50"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-72 h-full shadow-2xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Categories for Mobile */}
              <div className="mb-6">
                <button
                  onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium"
                >
                  <span>Categories</span>
                  <FiChevronDown
                    className={`transform transition-transform ${
                      mobileCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileCategoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 pl-4 space-y-2">
                        <button
                          onClick={() => handleMobileCategoryChange("all")}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                            location.pathname === "/"
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() => handleMobileCategoryChange(cat.slug)}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                              location.pathname === `/category/${cat.slug}`
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto mb-6">
                <ul className="space-y-2">
                  {navLinks.map((link: NavItem) => (
                    <li key={link.id}>
                      <Link
                        to={link.url}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
                          ${
                            location.pathname === link.url
                              ? "bg-blue-600 text-white shadow"
                              : "text-gray-700 hover:bg-blue-100"
                          }`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full text-center px-3 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-center px-3 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="block text-center px-3 py-2 rounded-lg bg-white border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default BtmHeader;
