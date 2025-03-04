import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isAdmin, logout } = useAuthContext();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.placeholder} />

      {/* Centered Text */}
      <View style={styles.centerContainer}>
        <Text style={styles.centerText}>Event Manage</Text>
      </View>

      {/* Right-aligned buttons */}
      <View style={styles.iconContainer}>
        {!isAuthenticated ? (
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.iconButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <>
            {!isAdmin && (
              <Button
                onPress={() => navigation.navigate('Dashboard', { screen: 'UserProfile' })}
                title="Profile"
                color="#007BFF"
              />
            )}
            {isAdmin && (
              <Button
                onPress={() => navigation.navigate('Dashboard', { screen: 'Admin' })}
                title="Admin"
                color="#007BFF"
              />
            )}
            <Button onPress={logout} title="Logout" color="#FF0000" />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  placeholder: {
    flex: 1,
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  iconButton: {
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 8,
    color: '#000',
  },
});

export default Header;
