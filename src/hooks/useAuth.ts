import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }

  const { user, login, register, logout, updateUser } = context;

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };
};
