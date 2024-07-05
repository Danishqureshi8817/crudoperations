// AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    name: null,
    authenticated: false,
  });

  // Load auth state from AsyncStorage when the app initializes
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedAuthState = await AsyncStorage.getItem('authState');
        if (savedAuthState) {
          setAuthState(JSON.parse(savedAuthState));
        }
      } catch (error) {
        console.error('Failed to load auth state from storage', error);
      }
    };

    loadAuthState();
  }, []);

  // Save auth state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveAuthState = async () => {
      try {
        await AsyncStorage.setItem('authState', JSON.stringify(authState));
      } catch (error) {
        console.error('Failed to save auth state to storage', error);
      }
    };

    saveAuthState();
  }, [authState]);

  return (
    <Provider
      value={{
        authState,
        setAuthState,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
