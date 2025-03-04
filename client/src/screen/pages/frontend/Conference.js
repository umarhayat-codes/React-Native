import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useProductContext } from '../../../context/ProductContext';

export default function Conference({navigation}) {
  const { dispatch } = useProductContext(); // Access the dispatch method from the context
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: ''
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { title, description, category, location, image } = formData;
    const productData = {
      title,
      description,
      category,
      location,
      image,
    };

    console.log('productData', productData);

    // Dispatch the product data to the context
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: productData });
    navigation.navigate("ShowDetail")
    alert('See Wedding details !');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Conference Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={formData.title}
        onChangeText={(value) => handleInputChange('title', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={formData.category}
        onChangeText={(value) => handleInputChange('category', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={formData.location}
        onChangeText={(value) => handleInputChange('location', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.image}
        onChangeText={(value) => handleInputChange('image', value)}
      />
  
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
