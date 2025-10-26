import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.png";
import { FiSearch,FiHeart, FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";

interface SearchResult {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images?: string[];
}

function TopHeader() {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
  const { favoriteItems } = cartContext;
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSuggestions([]);
    setIsSearchFocused(false);
  };

  // Fetch search suggestions with debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setSuggestions(data.products.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Clear search when location changes
  useEffect(() => {
    setSearchQuery("");
    setSuggestions([]);
    setIsSearchFocused(false);
  }, [location]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <Link to="/">
              <img
                src={Logo}
                alt="E-commerce Logo"
                className="h-20 object-contain"
              />
            </Link>
          </motion.div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    // Delay hiding suggestions to allow clicking on them
                    setTimeout(() => setIsSearchFocused(false), 200);
                  }}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-colors"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Search Suggestions */}
            <AnimatePresence>
              {isSearchFocused && suggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 mt-2 overflow-hidden"
                >
                  <li className="px-4 py-2 text-gray-500 text-sm border-b border-gray-100 flex items-center gap-2 bg-gray-50 font-semibold">
                    <FiSearch /> Search Results
                  </li>
                  {suggestions.map((item) => (
                    <motion.li
                      key={item.id}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      onClick={() => {
                        setSearchQuery(item.title);
                        navigate(
                          `/search?query=${encodeURIComponent(item.title)}`
                        );
                        setSuggestions([]);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 cursor-pointer border-b border-gray-100 last:border-none"
                    >
                      <img
                        src={
                          item.thumbnail ||
                          item.images?.[0] ||
                          "https://via.placeholder.com/60?text=No+Image"
                        }
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-sm text-blue-600 font-semibold">
                          ${item.price}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-5">
            {/* Favorites Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to="/favorites"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FiHeart className="w-6 h-6" />
                {favoriteItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteItems.length}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to="/cart"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
