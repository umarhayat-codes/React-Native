// import AsyncStorage from '@react-native-async-storage/async-storage'
// import axios from 'axios'
// import React, { useState } from 'react'
// import {   StyleSheet,Button, Text, TextInput, View } from 'react-native'
// // import { Button } from 'react-native-paper'


// const initialState = {
//   email : "",
//   password : ""
// }
// export default function Login({navigation}) {
 
//   const [state,setState] = useState(initialState)
//   const handleChange = (name,value) => {
//     setState(s => ({...s,[name] : value}))
//   }
//   const handleLogin = () => {
//     const {email,password} = state
//     if (!email) {
//       return alert("Enter email: ")
//     }
//     if (!password) {
//       return alert("Enter password: ")
//     }


//     const user = {email,password}
//     loginUser(user)
//   }

//   const loginUser  = async (user) => {
//     try {
//       const response = await axios.post('http://192.168.100.13:8000/auth/login', user);
//       if (response.status === 200) {
//         console.log('Login successful:', response.data);
//         alert(response.data.message, 'success');
//         await AsyncStorage.setItem('token', response.data.token)
//         // Navigate to the next screen or perform any other action
//       }
//     } catch (err) {
//       console.error('Login error:', err.message);
//       // alert(err.response ? err.response.data.message : 'An error occurred');
//     }
//   };

//   return (
//     <View style={styles.flexContainer}>
      
//       <View style={{width : '100%'}}>
//         <Text style={styles.heading} >Login</Text>
//         <TextInput
//         mode="outlined"
//         label="Type your email"
//         placeholder="Type something"
//         placeholderTextColor={'black'}
//         style={{backgroundColor : 'white'}} 
//         // onChangeText={(email) => {() => {setState(s => ({...s,email}))}}}     
//         onChangeText={(value) => {handleChange("email",value)}}
//         keyboardType='email'
//         />
//         <TextInput
//         label="Password"
//         placeholderTextColor={'black'}
//         style={{backgroundColor : 'white',marginVertical : 8}}
//         placeholder="Password"
//         // onChangeText={(password) => {() => {setState(s => ({...s,password}))}}}
//         onChangeText={(value) => {handleChange("password",value)}}
//         secureTextEntry
//         // right={<TextInput.Icon icon="eye" />}
//         />
//         <Button style={{borderRadius : 4}} title='Login' onPress={handleLogin} />
//       </View>

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   flexContainer : {
//     flex : 1,
//     justifyContent : 'center',
//     backgroundColor : '#1d3557',
//     alignContent : 'center',
//     borderColor : 'white'

//   },
//   heading : {
//     color : 'white',
//     textAlign : 'center',
//     marginBottom : 6,
//     fontSize : 30
//   },
//   box : {
//     width : 150,
//     height : 150,
//     backgroundColor : 'red',
//     borderColor : 'black'
//   },
//   container : {
//     flex : 1
//   },
//   row : {
//     padding : 15,
//     marginBottom : 5,
//     backgroundColor : 'blue'
//   },
//   button : {
//     backgroundColor : 'blue',
//     padding : 5
//   }
// })


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
import { useAuthContext } from '../../../context/AuthContext';

const initialState = {
  email: '',
  password: '',
};

export default function Login({ navigation }) {
  const [state, setState] = useState(initialState);
  // const [loading, setLoading] = useState(false);
  const {dispatch} = useAuthContext()
  const handleChange = (name, value) => {
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = state;
    if (!email) {
      return alert('Enter email');
    }
    if (!password || password.length < 5) {
      return alert('Enter password');
    }

    const user = { email, password };
    console.log('user', user)
    loginUser(user);
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post('https://server-delta-lime.vercel.app/auth/login', user);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        alert(response.data.message, 'success');
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SET_LOGGED_IN', payload: { token: response.data.token } });
        navigation.navigate('Frontend');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response error:', error.response.data);
        alert(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Request error:', error.request);
        alert('No response from server. Check your network.');
      } else {
        // Other errors
        console.error('General error:', error.message);
        alert('An unexpected error occurred: ' + error.message);
      }
    }
  };
  

  return (
    <View style={styles.flexContainer}>
      <View style={{ width: '100%' }}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          mode="outlined"
          label="Type your email"
          placeholder="Type something"
          placeholderTextColor={'black'}
          style={{ backgroundColor: 'white' }}
          onChangeText={(value) => handleChange('email', value)}
          keyboardType="email-address"
          value={state.email}
        />

        <TextInput
          label="Password"
          placeholderTextColor={'black'}
          style={{ backgroundColor: 'white', marginVertical: 8 }}
          placeholder="Password"
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
          value={state.password}
        />

        <Button
          style={{ borderRadius: 4 }}
          title={'Login'}
          onPress={handleLogin}
          // disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d3557',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 30,
  },
});
