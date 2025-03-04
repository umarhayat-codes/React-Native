import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

export default function Cart({ navigation }) {
  const [products, setProducts] = useState([]);

  const {user} = useAuthContext()

  const fetchProducts = async () => {
   
    try {
      const response = await axios.get(`https://server-delta-lime.vercel.app/get/${user.user_id}`);
      console.log('response', response)
      console.log('response.data.todos', response.data.todos)
      setProducts(response.data.todos); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
      fetchProducts();
    
  }, []);
  console.log('products', products)
  const handleDelete = async (productId) => {
    console.log('productId', productId)
    try {
      const response = await axios.delete(`https://server-delta-lime.vercel.app/delete/${productId}`);
      console.log('response', response)
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      Alert.alert('Success', 'Product successfully deleted!');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product.');
    }
  };

  
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/80' }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productTitle}>{item.location}</Text>
        <Text style={styles.productTitle}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
      />

        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#28a745',
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff4d4f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  discountInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
});
