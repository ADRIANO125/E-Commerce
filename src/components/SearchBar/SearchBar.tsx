import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaStar } from "react-icons/fa";

function SearchBar() {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    axios
      .get(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      )
      .then((response) => {
        setResults(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container py-3 pb-6">
      <h2 className="text-2xl font-bold m-6 text-center">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="no-underline"
            >
              <div className="border rounded-2xl shadow-lg p-4 hover:shadow-2xl transition">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {product.description.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaStar /> {product.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <FaSearch className="text-gray-400 text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Results Found
          </h3>
          <p className="text-gray-500 max-w-md">
            We couldn’t find any products matching your search. Try different
            keywords or check your spelling.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
