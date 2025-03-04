import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../screen/pages/auth';
// import Frontend from '../screen/pages/frontend';
import { useAuthContext } from '../context/AuthContext';
import Frontend from '../screen/pages/frontend';
import Dashboard from '../screen/pages/dashboard';
import Component from '../components';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const {isAuthenticated} = useAuthContext()
  // const isAuthenticated = false
  console.log('isAuthenticated', isAuthenticated)
  return (

  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isAuthenticated ? (
      <Stack.Screen name="Auth" component={Auth} />
    ) : (
      <>
        {/* Protected Routes */}
        <Stack.Screen name="Frontend" component={Frontend} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Component" component={Component} />
      </>
    )}
  </Stack.Navigator>
  );
}


