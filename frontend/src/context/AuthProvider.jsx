import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    const res = await axios.post("/auth/register", { name, email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUser(res.data);
        return res.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
