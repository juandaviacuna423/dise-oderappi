import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const parseToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    const payload = stored ? parseToken(stored) : null;
    if (!payload) {
      localStorage.removeItem('token');
      return null;
    }
    return stored;
  });
  const [user, setUser] = useState(() => (token ? parseToken(token) : null));

  useEffect(() => {
    if (token) {
      const payload = parseToken(token);
      if (!payload) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        return;
      }
      setUser(payload);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
