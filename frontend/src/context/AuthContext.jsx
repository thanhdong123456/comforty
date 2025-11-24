import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE =
    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      }
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.warn(
          "Token expired or error occurred, but DO NOT log out automatically."
        );
      }

      setLoading(false);
    };

    init();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;

      if (token) localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      return user;
    } catch (err) {
      throw err.response?.data || { message: "Login failed" };
    }
  };

  const setUserProfile = (profile) => {
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUserProfile, loading, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
