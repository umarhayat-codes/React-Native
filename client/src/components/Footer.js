import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

const Footer = () => {
  return (    
      <View style={styles.footerBottom}>
        <Text style={styles.footerText}>&copy; 2024 Krist. All Rights Reserved.</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  footerBottom: {
    padding: 10,
    alignItems: 'center',
    backgroundColor : 'black'
  },
  footerText: {
    color: 'white',
  },
});

export default Footer;
