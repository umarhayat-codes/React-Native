import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PersonalInfo from './PersonalInfo';
import Order from './Order';
import WishList from './WishList';
// import {
//   MaterialIcons,
//   MaterialCommunityIcons,
//   FontAwesome,
//   Ionicons,
// } from '@expo/vector-icons';


export default function UserProfile() {
  const [selectedMenu, setSelectedMenu] = useState('1');

  const menuItems = [
    { key: '1', title: 'Info'   },
    { key: '2', title: 'Event' },
    { key: '3', title: 'Wishlist' },
    { key: '4', title: 'Manage Addresses'},
    { key: '5', title: 'Saved Cards' },
    { key: '6', title: 'Notifications' },
    { key: '7', title: 'Settings' },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <PersonalInfo />;
      case '2':
        return <Order />;
      case '3':
        return <WishList />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.profileAvatar}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>Robert Fox</Text>
          <View style={styles.divider} />
        </View>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedMenu === item.key && styles.selectedMenuItem,
              ]}
              onPress={() => setSelectedMenu(item.key)}
            >
              {item.icon}
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    backgroundColor: '#1f1f1f',
    paddingVertical: 20,
    alignItems: 'center',
  },
  profileAvatar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  greeting: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  selectedMenuItem: {
    backgroundColor: '#575757',
  },
  menuText: {
    color: '#fff',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});


