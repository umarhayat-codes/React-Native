// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import Auth from './src/screen/pages/auth'
// // import Frontend from './src/screen/pages/frontend'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import ProductProvider from './src/context/ProductContext'

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <ProductProvider>

//     <NavigationContainer >
//       <Auth/>
//       <Frontend/>
      
//     </NavigationContainer>
//       </ProductProvider>
//     </SafeAreaProvider> 
//   )
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import ProductProvider from './src/context/ProductContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from './src/context/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductProvider>
      <AuthContext>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <MainNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </AuthContext>
      </ProductProvider>
    </SafeAreaProvider>
  );
}