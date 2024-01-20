// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import BASEURL from '../config';
import useFetchSecure from '../hook/useFetchSecure';
import { err } from 'react-native-svg';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState(null);
 // const [cryptedUser,setCryptedUser] =useState()
  const login = async (username, password) => {
    const userProps = {
      username: username,
      password: password
    };

    try {
      setIsLoading(true);
      const response = await axios.post(BASEURL+'/login/', {
        username: username,
        password: password
      });

      setUser(response.data); // Assuming that the server returns user data including token and role
      setAuthenticated(true);
      console.log("context :",user.User)
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async() => {
    const options = {
      method :'GET',
      url: BASEURL+'/logout/',
      params: {},
      // Add other options as needed (headers, data for POST/PUT, etc.)
      headers: { 
          Authorization:"Token "+user.Token },
  };
    const response = await axios.request(options);
    setAuthenticated(false);
    setUser(null);
    console.log('logout:',isAuthenticated,user)
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
