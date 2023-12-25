// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
 // const [cryptedUser,setCryptedUser] =useState()
  const login = async (username, password) => {
    const userProps = {
      username: username,
      password: password
    };

    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username: username,
        password: password
      });

      setUser(response.data); // Assuming that the server returns user data including token and role
      setAuthenticated(true);
      console.log(user)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Your logout logic
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
