import axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet,Button, Text, TextInput, View } from 'react-native'
// import { Button } from 'react-native-paper'


const initialState = {
  email : "",
  password : "",
}
export default function Register({navigation}) {
 
  const [state,setState] = useState(initialState)
  const handleChange = (name,value) => {
    setState(s => ({...s,[name] : value}))
  }
  const handleRegister = () => {
    const {email,password} = state
    if (!email) {
      return alert("Enter email: ")
    }
    if (!password ) {
      return alert("Enter password: ")
    }
    const user = {email,password}
    console.log('user', user)
    createUser(user)
  }
  const createUser = async (user) => {
    try {
      const response = await axios.post('https://server-delta-lime.vercel.app/auth/register', user);
      console.log('response', response)
      if (response.status === 201) {
        alert(response.data.message, 'success');
        navigation.navigate('Login');
      }
    } catch (err) {
      console.error('Error during registration:', err.message); // Log error message
      if (err.response) {
        console.error('Server error:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error:', err.message);
      }
      alert("User Already Exists or Network Issue!");
    }
  };
  
  return (
    <View style={styles.flexContainer}>
      
      <View style={{width : '100%'}}>
        <Text style={styles.heading} >Register</Text>
        <TextInput
        mode="outlined"
        label="Type your email"
        placeholder="Email"
        placeholderTextColor={'black'}
        style={{backgroundColor : 'white'}} 
        // onChangeText={(email) => {() => {setState(s => ({...s,email}))}}}     
        onChangeText={(value) => {handleChange("email",value)}}
        keyboardType='email'
        />
        <TextInput
        label="Password"
        placeholderTextColor={'black'}
        style={{backgroundColor : 'white',marginVertical : 8}}
        placeholder="Password"
        // onChangeText={(password) => {() => {setState(s => ({...s,password}))}}}
        onChangeText={(value) => {handleChange("password",value)}}
        secureTextEntry
        // right={<TextInput.Icon icon="eye" />}
        />
        <Button style={{borderRadius : 4}} title='Register' onPress={handleRegister} />
        <View style={styles.loginContainer}>
          <Text style={styles.registerText}>If you are already registered?</Text>
          <Text style={styles.loginLink} onPress={() => { navigation.navigate('Login') }}>Login</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer : {
    flex : 1,
    justifyContent : 'center',
    backgroundColor : '#1d3557',
    alignContent : 'center',
    borderColor : 'white'

  },
  heading : {
    color : 'white',
    textAlign : 'center',
    marginBottom : 6,
    fontSize : 30
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
  },
  loginLink: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 5,
    fontWeight: 'bold',
  }
  
})


