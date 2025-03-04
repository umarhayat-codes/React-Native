import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Auth = createContext();

const initialState = { isAuthenticated: false, user: {}, isAdmin: false, token: null };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOGGED_IN':
      return { ...state, isAuthenticated: true, user: payload.userData, isAdmin: payload.isAdmin, token: payload.token };
    case 'SET_PROFILE':
      return { ...state, user: payload.userData };
    case 'SET_LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
};

export default function AuthContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsAppLoading(true);
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          await fetchUserProfile(token); // Verify and fetch user details if token exists
        } else {
          setIsAppLoading(false);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        setIsAppLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const fetchUserProfile = async (token) => {
    console.log('token ', token )
  
    try {
      const response = await axios.get('https://server-delta-lime.vercel.app/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.user;
      console.log('userData in auth context', userData)
      const isAdmin = userData?.roles?.includes('admin');
      dispatch({ type: 'SET_LOGGED_IN', payload: { userData, isAdmin, token } });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SET_LOGGED_OUT' });
    } finally {
      setIsAppLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SET_LOGGED_OUT' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Auth.Provider value={{ ...state, dispatch, isAppLoading, logout }}>
      {children}
    </Auth.Provider>
  )
}

export const useAuthContext = () => useContext(Auth)