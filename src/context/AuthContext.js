import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (you can implement your own authentication logic here)
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && token.length > 0) {
          const response = await axios.get(
            "http://localhost:8080/api/v1/auth",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response?.status === 200) {
            setUser(response.data[0]);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        }
      } catch (error) {
        logout();
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/login",
        { email, password }
      );

      console.log(response);

      if (response) {
        localStorage.setItem("token", response?.data?.token);
        setUser(response?.data?.customer);
        setIsAuthenticated(true);
        window.location.href = "/dashboard";
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
