import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList,Image,ScrollView } from 'react-native';
import OrderCard from './OrederCard'
const MyFashionistas = () => {
  const [activeButton, setActiveButton] = useState('Orders'); // Track the active button

  const handlePress = (button) => {
    setActiveButton(button); // Update the active button state
  };

  // Animated styles based on the active button
  const buttonStyle = (button) => ({
    backgroundColor: activeButton === button ? "#AD669E" : "#FFFFFF8F",
    borderColor: '#FFB6C8',
  });
  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.source }}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
    </View>
  );
  const renderDivider = () => <View style={styles.divider} />;

  return (
    <View>
      <View style={styles.view2}>
        <TouchableOpacity
          style={[styles.button, buttonStyle('Orders')]} // Apply styles based on active button
          onPress={() => handlePress('Orders')}
        >
          <Text style={[styles.text, { color: activeButton === 'Orders' ? 'white' : '#AD669E' }]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, buttonStyle('statistics')]} // Apply styles based on active button
          onPress={() => handlePress('statistics')}
        >
          <Text style={[styles.text2, { color: activeButton === 'statistics' ? 'white' : '#AD669E' }]}>
          statistics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, buttonStyle('Facturations')]} // Apply styles based on active button
          onPress={() => handlePress('Facturations')}
        >
          <Text style={[styles.text2, { color: activeButton === 'Facturations' ? 'white' : '#AD669E' }]}>
          Facturations
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:5}}>
      <OrderCard/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view2: {
    flexDirection: 'row',
    margin: 15,
  },
  button: {
    padding: 8,
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
  },
  button2: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
//   imageGrid: {
//     flexGrow: 3, // Allow the FlatList to grow
//     paddingBottom: 10, // Optional: Add some padding at the bottom
//   },
  imageContainer: {
    width: '50%', // Each image will take half the width
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Add space between rows
    margin:2
  },
  image: {
    width: '100%', // Full width of the container
    height: 300, // Set a fixed height or adjust as needed
    borderRadius: 10, // Optional: to round the corners of the images
  },
  divider: {
    height: 3, // Height of the divider
    backgroundColor: '#FFB6C8', // Color of the divider
  },
});

export default MyFashionistas;
