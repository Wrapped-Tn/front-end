import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet,Text } from 'react-native';
import iconAddImg from '../../../assets/addimg.png';
import { Actionsheet, NativeBaseProvider, useDisclose } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importer la navigation

const AddImage = ({ setImages, index }) => {  // Ajout de props `setImages` et `index`
    const [selectedImage, setSelectedImage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclose();
    const navigation = useNavigation(); // Hook de navigation

    const pickImageFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission d\'accès à la galerie refusée !');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const image = {
                uri: result.assets[0].uri,
                type: result.assets[0].type,
            };
            setSelectedImage(image);
            setImages(prevImages => {
                const updatedImages = [...prevImages];
                updatedImages[index] = image; // Met à jour l'image à l'index donné
                return updatedImages;
            });

            // Redirection après sélection
            navigation.navigate('AddBrand', { image }); // Navigue vers la page de prévisualisation
        }
        onClose();
    };

    const takePhotoWithCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission d\'accès à la caméra refusée !');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const image = {
                uri: result.assets[0].uri,
                type: result.assets[0].type,
            };
            setSelectedImage(image);
            setImages(prevImages => {
                const updatedImages = [...prevImages];
                updatedImages[index] = image;
                return updatedImages;
            });

            // Redirection après sélection
            navigation.navigate('AddBrand', { brands :image }); // Navigue vers la page de prévisualisation
        }
        onClose();
    };
 // Fonction pour supprimer l'image
 const removeImage = () => {
    setSelectedImage(null);  // Supprimer l'image de l'état local
    setImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[index] = null;  // Retirer l'image à l'index donné
        return updatedImages;
    });
};
    return (
        <NativeBaseProvider>
            <View>
                <TouchableOpacity style={styles.Addimage} onPress={onOpen}>
                {selectedImage && (
                        <TouchableOpacity style={styles.deleteButton} onPress={removeImage}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    )}
                    <Image
                        source={selectedImage ? { uri: selectedImage.uri } : iconAddImg}
                        style={selectedImage ? styles.image : styles.image2}
                    />
                    
                </TouchableOpacity>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item onPress={takePhotoWithCamera}>
                            Prendre une photo
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={pickImageFromGallery}>
                            Choisir depuis la galerie
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={onClose} color="red.500">
                            Annuler
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
                
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    Addimage: {
        width: '90%',
        height: '90%',
        borderWidth: 2,
        borderColor: '#F08DB7',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    image: {
        width: '99%',
        height: '99%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    image2: {
        width: 24,
        height: 24,
        marginRight: 15,
        marginLeft: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#FEFEFE93',
        borderRadius: 15,
        padding: 5,
        zIndex: 1,
    },
    deleteText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF1616B5',
    },

});

export default AddImage;
