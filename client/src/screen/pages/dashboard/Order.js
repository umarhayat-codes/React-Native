import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';


export default function Order() {
  const { user } = useAuthContext(); // Access user context
  console.log('user', user)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('user.user_id', user.user_id)
  // Fetch orders from the Node.js API
  const getOrders = async () => {
    try {
      const response = await axios.get(`https://server-delta-lime.vercel.app/get/${user.user_id}`);
      if (response.status === 200) {
        setOrders(response.data.todos); // Assuming the response has an `orders` array
      } else {
        console.error('Failed to fetch orders: ', response.status);
      }
    } catch (err) {
      console.error('Error fetching orders: ', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1d3557" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item, index) => index.toString()} // Ensures unique keys
      // numColumns={1} // Set to 1 for one item per row
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image source={{ uri: item.image || 'https://via.placeholder.com/80' }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
  
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    flex: 1,
    marginVertical: 8, // Adjust margin for vertical spacing
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d3557',
  },
});
