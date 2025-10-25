import TopHeader from "./components/Header/TopHeader.tsx";
import BtmHeader from "./components/Header/BtmHeader.tsx";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Pages/Products/ProductDetails";
import { Toaster } from "react-hot-toast";
import Cart from "./Pages/Cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import Category from "./Pages/Category/Category";
import SearchBar from "./components/SearchBar/SearchBar";
import FavoritesPage from "./Pages/Favorites/FavoritesPage";
import AboutPage from "./Pages/About/AboutPage";
import BlogPage from "./Pages/Blog/BlogPage";
import ContactPage from "./Pages/Contact/ContactPage";
import Login from "./Pages/Auth/Login.tsx";
import Register from "./Pages/Auth/Register.tsx";
import Profile from "./Pages/Auth/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-right" />
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
