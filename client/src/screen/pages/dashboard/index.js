import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Admin from './Admin';
import UserProfile from './UserProfile';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Dashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Pass the navigation prop to Header */}
      <Header navigation={navigation} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Admin" component={Admin} />
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