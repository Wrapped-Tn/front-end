import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList,Image,ScrollView } from 'react-native';

const MyActivitie = () => {
  const [activeButton, setActiveButton] = useState('favorites'); // Track the active button

  const handlePress = (button) => {
    setActiveButton(button); // Update the active button state
  };

  const images = [
    { id: '1', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    { id: '2', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaP-Rji0gsGL_IgIk2a1hpevSaH1wBJtkCiw&s' },
    { id: '3', source: 'https://t4.ftcdn.net/jpg/04/84/87/61/360_F_484876187_u6HIlCgA2iZdfkoOamuQa43OJH2zaDVR.jpg' },
    { id: '4', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    { id: '5', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    { id: '6', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    { id: '7', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    { id: '8', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' },
    // Add more images as needed
  ];
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
          style={[styles.button, buttonStyle('favorites')]} // Apply styles based on active button
          onPress={() => handlePress('favorites')}
        >
          <Text style={[styles.text, { color: activeButton === 'favorites' ? 'white' : '#AD669E' }]}>
            My Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, buttonStyle('likes')]} // Apply styles based on active button
          onPress={() => handlePress('likes')}
        >
          <Text style={[styles.text2, { color: activeButton === 'likes' ? 'white' : '#AD669E' }]}>
            My Likes
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:5}}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display items in two columns
        scrollEnabled={true} // Enable scrolling
        contentContainerStyle={styles.imageGrid} // Style for the container
      />
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

export default MyActivitie;
