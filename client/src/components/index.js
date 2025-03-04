import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Header'
import Footer from './Footer'


export default function Component() {
    const Stack = createNativeStackNavigator()
  return (
    <>
    

      <Stack.Navigator>
        <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
        <Stack.Screen name="Footer" component={Footer} options={{ headerShown: false }} />
      </Stack.Navigator>

    </>
  )
}