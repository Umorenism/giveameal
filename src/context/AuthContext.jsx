





import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initAuth = () => {
      const admin = localStorage.getItem("admin");
      if (admin) {
        setUser(JSON.parse(admin));
        console.log("Initial user from localStorage:", JSON.parse(admin)); // Debug
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (data) => {
    console.log("Storing in AuthContext:", data);
    if (data.admin && data.access_token) {
      localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem("access_token", data.access_token);
      setUser(data.admin);
      console.log("User set in AuthContext:", data.admin);
    } else {
      console.error("Invalid login data:", data);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

