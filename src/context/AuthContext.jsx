import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("'useAuth must be used within an AuthProvider'");
  }
  return context;
};

export const AuthProvider = ( {children} ) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <authContext.Provider value={{ token, user, login, logout }}>
        {children}
    </authContext.Provider>
  );
};
