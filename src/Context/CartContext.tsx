import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

// ✅ تحديد نوع العنصر في الكارت (تقدر تعدل حسب API)
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

// ✅ نوع الـContext
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  IncreaseQuantity: (id: number) => void;
  DecreaseQuantity: (id: number) => void;
  DeleteItems: (id: number) => void;
  favoriteItems: CartItem[];
  addToFavorites: (item: CartItem) => void;
  removeFromFavorites: (id: number) => void;
}

// ✅ إنشاء Context
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  IncreaseQuantity: () => {},
  DecreaseQuantity: () => {},
  DeleteItems: () => {},
  favoriteItems: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

// ✅ Props للكومبوننت Provider
interface CartProviderProps {
  children: ReactNode;
}

// ✅ Provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("CartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Increase Items In Cart
  const IncreaseQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Decrease Items In Cart
  const DecreaseQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      );
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Delete Items From Cart
  const DeleteItems = (id: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const updated = [...prev, item];
      localStorage.setItem("CartItems", JSON.stringify(updated));
      return updated;
    });
  };

  const [favoriteItems, setFavoriteItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("FavoriteItems");
    return saved ? JSON.parse(saved) : [];
  });

  const addToFavorites = (item: CartItem) => {
    setFavoriteItems((prev) => {
      const updated = [...prev, item];
      localStorage.setItem("FavoriteItems", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("FavoriteItems", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        IncreaseQuantity,
        DecreaseQuantity,
        DeleteItems,
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
