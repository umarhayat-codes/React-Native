import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuthContext } from '../../../context/AuthContext';

export default function PersonalInfo() {
  const { user } = useAuthContext();
  console.log('user', user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Ali',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '01234567',
    address: 'FSD',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View style={styles.container}>
      {/* First Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
          placeholder="Enter your first name"
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          placeholder="Enter your last name"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          placeholder="Enter your address"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});
