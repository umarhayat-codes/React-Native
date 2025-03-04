import React from 'react'
import Register from './Register'
import Login from './Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShowTodo from './Show'
import Main from './Main'

export default function Auth() {
    const stack = createNativeStackNavigator()
    
    return (
      
    <stack.Navigator>   
        <stack.Screen name='Register' component={Register} options={{headerShown : false}} />
        <stack.Screen name='Login' component={Login} options={{headerShown : false}} />
        <stack.Screen name='Main' component={Main} options={{headerShown : false}} />
        <stack.Screen name='Show' component={ShowTodo} options={{headerShown : false}} />
    </stack.Navigator>
  )
}
