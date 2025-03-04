// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { useAuthContext } from '../../../context/AuthContext';


// export default function WishList() {
//   const { user } = useAuthContext();
//   const [wishlist, setWishlist] = useState([]);

//   // Fetch wishlist from Node.js backend
  const getWishList = async () => {
    try {
    //   const response = await axios.get(`http://192.168.100.13:8001/get/:${user.uid}`, {
    //     params: { userId: user.uid },
    //   });
    const response = await axios.get(`http://192.168.100.13:8001/get/:${user.uid}`);
      setWishlist(response.data);
    } catch (err) {
      console.error('Error fetching wishlist: ', err);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//         <Text style={styles.price}>${item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={wishlist}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderProduct}
//         numColumns={2} // For a grid-like layout
//         columnWrapperStyle={styles.row}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   card: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     overflow: 'hidden',
//     elevation: 3, // For shadow on Android
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//   },
//   infoContainer: {
//     padding: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

import { View, Text } from 'react-native'
import React from 'react'

export default function WishList() {
  return (
    <View>
      <Text>No WishList</Text>
    </View>
  )
}