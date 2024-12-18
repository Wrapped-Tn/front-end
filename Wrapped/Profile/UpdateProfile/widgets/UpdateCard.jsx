import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView,Modal  } from 'react-native';
import CameraIcon from '../../../assets/icon_camera.png';
import * as ImagePicker from 'expo-image-picker'; // For Expo, replace with your image picker if not using Expo
import axios from "axios";
import PORT from '../../../Port';

const UpdateCard = ({ fullname, grade, idUser,idAuth, PDP }) => {
  const [profileImage, setProfileImage] = useState(PDP);
  const [imageUpdated, setImageUpdated] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false); // Show confirmation modal

//////////////////////////////////////API////////////////////////////////////////////////////////////////////////////
const confirmUpdate = async () => {
  try {
    // Lire le fichier local et convertir en base64
    const base64File = await FileSystem.readAsStringAsync(selectedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const file = `data:image/jpeg;base64,${base64File}`;

    const response = await axios.put(
      `${PORT}/api/users/profilepic/${idAuth}`,
      {file},
      
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      Alert.alert("Success", "Profile image updated successfully!");
    } else {
      Alert.alert("Error", "Failed to update profile image.");
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
    Alert.alert("Error", "An error occurred while updating the profile image.");
  }

  setShowConfirmation(false);  // Fermer la modale
  setImageUpdated(false);      // Réinitialiser l'état
};
//////////////////////////////////////API////////////////////////////////////////////////////////////////////////////



  const pickImage = async () => {
    const options = [
      { text: 'Choose from Gallery', value: 'gallery' },
      { text: 'Take a Selfie', value: 'camera' },
    ];

    const action = await new Promise((resolve) => {
      Alert.alert(
        'Select an Option',
        '',
        options.map((option) => ({
          text: option.text,
          onPress: () => resolve(option.value),
        })),
        { cancelable: true }
      );
    });

    if (action === 'gallery') {
      openGallery();
    } else if (action === 'camera') {
      openCamera();
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({
        uri: result.assets[0].uri,
        type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
    });
      setImageUpdated(true); 
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({
        uri: result.assets[0].uri,
        type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
    });
      setImageUpdated(true); 
    }
  };

  const handleImageUpdateConfirmation = () => {
    if (imageUpdated) {
      setShowConfirmation(true);
    } else {
      Alert.alert('No Change', 'You have not selected a new image.');
    }
  };

  const cancelUpdate = () => {
    setProfileImage(PDP); // Revert to original image
    setShowConfirmation(false); // Close confirmation modal
    setImageUpdated(false); // Reset the state
  };



  return (
    <View style={styles.card}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: PDP }} // Updated image source
          style={styles.profileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{fullname}</Text>
          <Text style={styles.userGrade}>{grade}</Text>
        </View>
      </View>

      {/* Change Photo Button */}
      <TouchableOpacity style={styles.statItem} onPress={pickImage}>
        <Image
          source={CameraIcon}
          style={{ width: 24, height: 24, marginRight: 15, marginLeft: 10 }}
        />
        <Text style={styles.ImageText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <View style={styles.button} >
          <Text style={styles.buttonText}>Update</Text>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Changes</Text>
            <Text style={styles.modalMessage}>Do you want to update your profile image?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelUpdate}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmUpdate}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fcecec', // Light pinkish background
    borderRadius: 15,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  userDetails: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  userGrade: {
    fontSize: 14,
    color: '#888',
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 182, 200, 0.31)',
    padding: 10,
    borderRadius: 20,
    minWidth: 170,
    maxWidth: 170,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#AD669E',
    position:"absolute",
    top:"50%",
  },
  ImageText: {
    color: '#AD669E',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '25%',
  },
  button: {
    flex: 1,
    backgroundColor: '#AD669E',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#AD669E',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#c82333',
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#AD669E',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UpdateCard;
