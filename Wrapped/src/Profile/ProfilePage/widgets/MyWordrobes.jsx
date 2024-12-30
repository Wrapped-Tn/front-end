import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import DeleteIcon from '../../../../assets/delete.png';

const MyWordrobes = () => {
  // State to track images and selected images
  const [images, setImages] = useState([
    { id: '1', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
    { id: '2', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaP-Rji0gsGL_IgIk2a1hpevSaH1wBJtkCiw&s', selected: false },
    { id: '3', source: 'https://t4.ftcdn.net/jpg/04/84/87/61/360_F_484876187_u6HIlCgA2iZdfkoOamuQa43OJH2zaDVR.jpg', selected: false },
    { id: '4', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
    { id: '5', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
    { id: '6', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
    { id: '7', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
    { id: '8', source: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', selected: false },
  ]);

  const [isSelecting, setIsSelecting] = useState(false); // Track if the user is in selecting mode

  // Toggle selection mode when the "Select" button is clicked
  const handleSelectToggle = () => {
    if (isSelecting) {
      // Reset all selected images when exiting selection mode
      setImages(images.map(image => ({ ...image, selected: false })));
    }
    setIsSelecting(!isSelecting); // Toggle selection mode
  };

  // Toggle image selection when an image is clicked
  const toggleImageSelection = (id) => {
    setImages(images.map(image => {
      if (image.id === id) {
        return { ...image, selected: !image.selected };
      }
      return image;
    }));
  };

  // Delete selected images
  const handleDeleteSelected = () => {
    const filteredImages = images.filter(image => !image.selected); // Keep unselected images
    setImages(filteredImages); // Update the state with filtered images
  };

  // Render each image in the list
  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.imageContainer,
        item.selected && styles.selectedImage // Highlight selected image
      ]}
      onPress={() => isSelecting && toggleImageSelection(item.id)} // Only allow selection in "selecting mode"
    >
      <Image
        source={{ uri: item.source }}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.view2}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSelectToggle} // Toggle selection mode
        >
          <Text style={[styles.text]}>
            {isSelecting ? "Cancel" : "Select"} {/* Show "Cancel" during selection mode */}
          </Text>
        </TouchableOpacity>

        {isSelecting && (
          <TouchableOpacity
            style={[styles.button2]}
            onPress={handleDeleteSelected} // Delete selected images
          >
            <Image
              source={DeleteIcon}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ margin: 5 }}>
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
  container: {
    flex: 1,
  },
  view2: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: "#fcecec",
    maxWidth: "30%",
    minWidth: '10%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button2: {
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: "#fcecec",
    maxWidth: "12%",
    minWidth: '10%',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#AD669E',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    margin: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  selectedImage: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#AD669E', // Highlight selected images with a red border
  },
});

export default MyWordrobes;
