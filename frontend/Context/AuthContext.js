import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import getBaseUrl from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [BASEURL, setBaseUrl] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const BASEURL = await getBaseUrl();
        setBaseUrl(BASEURL);
      } catch (error) {
        console.error("Error fetching BASEURL:", error);
      }
    };

    fetchBaseUrl(); // Call the async function immediately
  }, []);

  useEffect(() => {
    // Check if user is authenticated from local storage
    const checkAuthState = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      }
    };

    checkAuthState();
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(BASEURL + '/login/', {
        username: username,
        password: password
      });

      setUser(response.data);
      setAuthenticated(true);
      
      // Save user data to local storage
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error("Error removing user data from storage:", error);
    }
    setAuthenticated(false);
    setUser(null);
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
