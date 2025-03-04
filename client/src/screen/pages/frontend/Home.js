import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import heroSection from '../../../assets/hero-section.jpg';
import { categories } from '../../../data/dummy';



export default function Home({navigation}) {

    const handleToGo = (path) => {
        navigation.navigate(path);
  };

  return (
      <View style={styles.container}>
        <View style={styles.heroSection}>
  
          <Image source={heroSection} style={styles.heroImage} resizeMode="contain" />
        </View>
  
      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Select by Categories</Text>

        <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardContainer} onPress={() => handleToGo(item.name)}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
            )}
          />

        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
        },
        heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  

        heroImage: {
            flex: 1,
            height: 200,
          },
          categoriesSection: {
              flex: 1,
              padding: 20,
            },
            sectionTitle: {
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              },
              cardContainer: {
                  flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

