import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import DeleteIcon from '../../../../assets/delete.png';
import axios from 'axios';
import {PORT} from '../../../Port'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const MyWordrobes = () => {
  const navigation = useNavigation();
    const route = useRoute();

  // State to track images and selected images
  const [images, setImages] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false); // Track if the user is in selecting mode
  const [idUser, setIdUser] = useState(null); // State for storing the user ID

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const userId = await AsyncStorage.getItem('idUser');
        setIdUser(userId);
      } catch (e) {
        console.error('Failed to fetch User ID:', e);
      }
    };
    fetchStorage();
  }, []);
/////////////////////////////////////////AXIOS//////////////////////////////////////////////////
const fetchImages = async () => {
  try {
    const response = await axios.get(`${PORT}/posts/posts/wordrobes/${idUser}`);
    if (response.status === 200) {
      console.log("Images fetched successfully", response.data);

      const { imageUrls, postIds } = response.data;

      if (!imageUrls || !postIds || imageUrls.length !== postIds.length) {
        console.error("Mismatch between image URLs and post IDs.");
        return;
      }

      // Associer chaque URL d'image avec son ID
      const posts = imageUrls.map((url, index) => ({
        id: postIds[index], // Associe l'ID du post
        source: url,        // URL de l'image
        selected: false,    // État initial
      }));

      // Mettre à jour l'état avec les posts associés
      setImages(posts);
    } else {
      console.log("Failed to fetch images. Please try again.");
    }
  } catch (e) {
    console.log("An error occurred while fetching images:", e);
  }
};
 useEffect(() => {
    if (idUser) {
      fetchImages();
    }
  }, [idUser]);
/////////////////////////////////////////AXIOS//////////////////////////////////////////////////


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
      onPress={() => {isSelecting ? toggleImageSelection(item.id):navigation.navigate("PostDetails",{PostId:item.id,idUser})}} // Only allow selection in "selecting mode"
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
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  selectedImage: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#AD669E', // Highlight selected images with a red border
  },
});

export default MyWordrobes;
