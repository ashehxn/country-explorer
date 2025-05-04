import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SessionContext = createContext();
const API_URL = 'http://localhost:5000/api/auth'; // Adjust if port differs

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/check-session`, { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('No active session', error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
      setUser({ id: response.data.user?.id, username });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password }, { withCredentials: true });
      setUser({ id: response.data.user?.id, username });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <SessionContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
