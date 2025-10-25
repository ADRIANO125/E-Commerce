import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Define Context type
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
  }) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create Context
export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
  updateUser: () => {},
});

// Define Provider props
interface UserProviderProps {
  children: ReactNode;
}

// Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
      // Clear problematic data
      try {
        localStorage.removeItem("user");
      } catch (removeError) {
        console.error("Failed to remove user from localStorage", removeError);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (e) {
      console.error("Failed to save user to localStorage", e);
      // If storage is full, try to clear some data
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.warn("LocalStorage quota exceeded. Clearing user data.");
        try {
          localStorage.clear();
        } catch (clearError) {
          console.error("Failed to clear localStorage", clearError);
        }
      }
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate authentication
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u: User & { password: string }) =>
          u.email === email && u.password === password
      );

      if (foundUser) {
        // Remove password before setting user
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        return true;
      }
    } catch (e) {
      console.error("Failed to login", e);
    }
    return false;
  };

  const register = (userData: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
  }): boolean => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: User) => u.email === userData.email);

      if (existingUser) {
        return false; // User already exists
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        avatar: userData.avatar || "",
      };

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      return true;
    } catch (e) {
      console.error("Failed to register user", e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      try {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);

        // Update in users list as well
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((u: User & { password: string }) =>
          u.id === updatedUser.id ? { ...u, ...userData } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (e) {
        console.error("Failed to update user", e);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
