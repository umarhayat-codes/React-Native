import React from 'react';
import {  StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShowDetail from './ShowDetail';
import Cart from './Cart';

import Coference from './Conference';
import Sport from './Sport';
import Wedding from './Wedding';
import Trading from './Trading';

export default function Frontend() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Wedding" component={Wedding} options={{ headerShown: false }} />
        <Stack.Screen name="Conference" component={Coference} options={{ headerShown: false }} />
        <Stack.Screen name="Sport" component={Sport} options={{ headerShown: false }} />
        <Stack.Screen name="Trading" component={Trading} options={{ headerShown: false }} />
        <Stack.Screen name="ShowDetail" component={ShowDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      </Stack.Navigator>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})

