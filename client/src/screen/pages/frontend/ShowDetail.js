import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { useAuthContext } from '../../../context/AuthContext';
import { useProductContext } from '../../../context/ProductContext';

export default function ShowDetail({ navigation }) {
  const { selectedProduct } = useProductContext();
  const { user} = useAuthContext();
  const [loading, setLoading] = useState(false);

  console.log('user in show detail', user)

  const handleAction = async (url, data, successMessage) => {
 
    console.log('data', data)
    setLoading(true);

    try {
      const response = await axios.post(url, data);
      console.log('response.data', response.data)
      console.log('Server Response:', response.data);
      Alert.alert('Success', successMessage);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      Alert.alert('Error', 'An issue occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const productData = {
      ...selectedProduct,
      id: Math.random().toString(36).slice(2),
      createBy: user.user_id,
    };
    console.log('productData', productData)
    handleAction(
      'https://server-delta-lime.vercel.app/create',
      productData,
      'Product added to the cart!'
    );
  };

  const handleToWishList = () => {
    const wishListData = {
      ...selectedProduct,
      createdAt: new Date().toISOString(),
      createdBy: user?.user_id,
    };

    handleAction(
      'https://server-delta-lime.vercel.app/wishlist',
      wishListData,
      'Product added to the wishlist!'
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: selectedProduct?.image || 'https://via.placeholder.com/80' }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{selectedProduct?.title}</Text>
        <Text style={styles.description}>{selectedProduct?.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddToCart}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.wishlistButton]}
            onPress={handleToWishList}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
          <Button onPress={() => navigation.navigate('Cart')}>Show Cart</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  wishlistButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
