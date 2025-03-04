import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



function Order() {
  const [order, setOrder] = useState([]);
  const navigation = useNavigation();

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get(`https://server-delta-lime.vercel.app/todo`); // Replace USER_ID dynamically
      console.log('response', response.data)
      setOrder(response.data.todo);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleDeleteCart = async (productId) => {
    try {
      await axios.delete(`http://192.168.100.13:8001/delete/${productId}`);
      setOrder((prev) => prev.filter((item) => item._id !== productId));
      Alert.alert('Success', 'Product successfully deleted!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateCart = (productId) => {
    navigation.navigate('UpdateDish', { id: productId });
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.date}>
          {new Date(item.createProduct * 1000).toLocaleString()}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => handleUpdateCart(item._id)} />
        <Button title="Delete" color="red" onPress={() => handleDeleteCart(item._id)} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={order}
      keyExtractor={(item) => item._id}
      renderItem={renderOrderItem}
      ListEmptyComponent={() => <Text style={styles.empty}>No Orders Found</Text>}
    />
  );
}

function WishList() {
  const [wishlist, setWishlist] = useState([]);

  const getWishList = useCallback(async () => {
    try {
      const response = await axios.get('http://192.168.100.13:8001/getWishlist/USER_ID'); // Replace USER_ID dynamically
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList]);

  const handleDeleteWishlistItem = async (productId) => {
    try {
      await axios.delete(`http://192.168.100.13:8001/deleteWishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      Alert.alert('Success', 'Wishlist item successfully deleted!');
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.date}>
          {new Date(item.createAt * 1000).toLocaleString()}
        </Text>
      </View>
      <Button
        title="Delete"
        color="red"
        onPress={() => handleDeleteWishlistItem(item._id)}
      />
    </View>
  );

  return (
    <FlatList
      data={wishlist}
      keyExtractor={(item) => item._id}
      renderItem={renderWishlistItem}
      ListEmptyComponent={() => <Text style={styles.empty}>No Wishlist Items Found</Text>}
    />
  );
}

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState('Order');

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSelectedTab('Order')}>
          <Text style={selectedTab === 'Order' ? styles.activeTab : styles.tab}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('WishList')}>
          <Text style={selectedTab === 'WishList' ? styles.activeTab : styles.tab}>Wishlist</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {selectedTab === 'Order' ? <Order /> : <WishList />}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  navbar: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#f8f8f8' },
  tab: { fontSize: 16 },
  activeTab: { fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
  content: { flex: 1, padding: 10 },
  itemContainer: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
  image: { width: 70, height: 70, marginRight: 10 },
  itemDetails: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { color: 'green' },
  date: { fontSize: 12, color: 'gray' },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 18, color: 'gray' },
});
