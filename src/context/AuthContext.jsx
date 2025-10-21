import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Load user saat token berubah
  useEffect(() => {
    if (token) {
      apiRequest("/me", "GET", null, token)
        .then((data) => setUser(data.user))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await apiRequest("/login", "POST", { email, password });
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (username, email, password) => {
  await apiRequest("/register", "POST", { username, email, password });
};

  const logout = async () => {
  try {
    await apiRequest("/logout", "POST", null, token); // token dikirim di header
  } catch (err) {
    console.warn("Logout error:", err.message);
  }
  localStorage.removeItem("token");
  setUser(null);
  setToken(null);
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
