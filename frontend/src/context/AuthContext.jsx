import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE =
    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error(err?.response?.data || err.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
      fetchProfile();
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const setUserProfile = (profile) => setUser(profile);

  return (
    <AuthContext.Provider value={{ user, setUserProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
