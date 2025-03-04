// import axios from 'axios'
// import React, { useState } from 'react'
// import { StyleSheet,Button, Text, TextInput, View } from 'react-native'
// import Header from '../../../components/Header'
// // import { Button } from 'react-native-paper'


// const initialState = {
//   title : "",
//   description : "",
//   price : ""
// }
// export default function Home({navigation}) {
 
//   const [state,setState] = useState(initialState)
//   const handleChange = (name,value) => {
//     setState(s => ({...s,[name] : value}))
//   }
//   const Submit = () => {
//     const {title,description,price} = state
//     if (!title) {
//       return alert("Enter title: ")
//     }
//     if (!description) {
//       return alert("Enter description: ")
//     }
//     if (!price) {
//         return alert("Enter price: ")
//       }
//     const uid = Math.random().toString(36).slice(2)
//     const todo = {title,description,uid,price}
//     console.log('todo', todo)
//     createTodo(todo)
//   }

//   const createTodo = async (todo) => {
//     await axios.post('http://192.168.100.13:8000/create', todo)
//     .then(({status,data}) => {
//       if (status == 201) {
//         console.log('data :>> ', data);
//         alert(data.message,'success')
//       }
//     })
//     .catch(err => {
//       alert(err)
//       console.log('err :>> ', err);
//     })
    
//   }

//   return (
//     <>
//     <Header/>
//     <View style={styles.flexContainer}>
      
//       <View style={{width : '100%'}}>
//         <Text style={styles.heading} >Todo</Text>
//         <TextInput
//         mode="outlined"
//         label="Title"
//         placeholder="Title"
//         placeholderTextColor={'black'}
//         style={{backgroundColor : 'white'}} 
//         // onChangeText={(email) => {() => {setState(s => ({...s,email}))}}}     
//         onChangeText={(value) => {handleChange("title",value)}}
//         />
//         <TextInput
//         label="Description"
//         placeholderTextColor={'black'}
//         style={{backgroundColor : 'white',marginVertical : 8}}
//         placeholder="Description"
//         // onChangeText={(password) => {() => {setState(s => ({...s,password}))}}}
//         onChangeText={(value) => {handleChange("description",value)}}
//         secureTextEntry
//         // right={<TextInput.Icon icon="eye" />}
//         />
//         <TextInput
//         label="Price"
//         placeholderTextColor={'black'}
//         style={{backgroundColor : 'white',marginVertical : 8}}
//         placeholder="Price"
//         keyboardType='number'
//         // onChangeText={(password) => {() => {setState(s => ({...s,password}))}}}
//         onChangeText={(value) => {handleChange("price",value)}}
//         secureTextEntry
//         // right={<TextInput.Icon icon="eye" />}
//         />
        
//         <Button style={{borderRadius : 4, marginBottom : 3}} title='Todo' onPress={Submit} />
//         <Button onPress={() => {navigation.navigate("Show")}} title='Show Todo' />
//       </View>

//     </View>
// </>
//   )
// }

// const styles = StyleSheet.create({
//     flexContainer : {
//         flex : 1,
//         justifyContent : 'center',
//         backgroundColor : '#1d3557',
//     alignContent : 'center',
//     borderColor : 'white'

//   },
//   heading : {
//     color : 'white',
//     textAlign : 'center',
//     marginBottom : 6,
//     fontSize : 30
//   }
  
// })



import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Main({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('data', data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('token', token)
        if (!token) {
          return navigation.navigate('Login'); // Navigate to Login if token doesn't exist
        }

        const response = await axios.get('http://192.168.100.13:8000/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data); // Store the response data in the state
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1d3557" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Page</Text>
      <Text style={styles.dataText}>{JSON.stringify(data)}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );

  function handleLogout() {
    AsyncStorage.removeItem('token');
    navigation.navigate('Login'); // Navigate back to the login screen after logout
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d3557',
    padding: 16,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    marginBottom: 16,
  },
  dataText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
