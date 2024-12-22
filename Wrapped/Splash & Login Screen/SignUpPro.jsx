import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput , ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import { Select, Box, CheckIcon, Center, NativeBaseProvider, Spinner, HStack, Heading ,Actionsheet, useDisclose} from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/flecheIcon.png';
import CameraIcon from '../assets/cameraIcon.png';
import LogoWarpeed from '../assets/logo2.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import {Port} from '../Port'
import { err } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';


const BrandDet = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre } = route.params;

    const [genreA, setGenreA] = useState(genre);

  const [brandName, setBrandName] = useState('');
  const [logoImage, setLogoImage] = useState(null);
  const [accountLevel, setAccountLevel] = useState('free');
  const [showSpiner, setShowSpiner] = useState(false);
  const [emailA, setEmailA] = useState(''); 
  const [passwordA, setPasswordA] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [phonenbr, setPhonenbr] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclose();

    ////////////////////////////////////////////////////////////////
    const uploadImage = async (userId) => {
        if (!selectedImage) {
          alert('Please select an image');
          return;
        }
         
        try {
          // Create form data
          const formData = new FormData();
          
          // Get the file name from the URI
          const uriParts = selectedImage.uri.split('/');
          const fileName = uriParts[uriParts.length - 1];
          console.log('**********userId*********',userId);
          
          formData.append('fileUploadpicture', 'profil');
          formData.append('userId', userId);
          formData.append('typesignup','brand');
          formData.append('file', {
            uri: selectedImage.uri,
            type: 'image/jpeg', 
            name: fileName,
          });
    
      
          // Send to backend
          const response = await axios.post(`${Port}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          if (response.status === 201) {
            console.log('Image uploaded successfully:', response.data);
            return response.data.url;
          }
        } catch (error) {
          console.error('Error uploading image:', error.response ? error.response.data : error.message);
          throw error; // Propagate the error to handle it in the calling function
        }
      };
//////////////////////////////////////////////////////////////////////////////
// Password validation
const validatePassword = (password) => {
    if (!password || password.trim().length < 6) {
        alert('Password should be at least 6 characters long.');
        return false;
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&+_]{1,8}$/;
    if (!regex.test(password)) {
        alert('Password should contain at least one uppercase letter and one number.');
        return false;
    }
    return true;
};
//////////////////////////////////////////////////////////////////////////////
    // Email validation
    const validateEmail = (email) => {
        if (!email || email.trim().length < 5) {
            alert('Please enter a valid email address.');
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        return true;
    };
//////////////////////////////////////////////////////////////////////////////
const validateConfirmePassword=(pass,confpass)=>{
    if(pass!==confpass){
        alert('Password do not match');
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////
const validateBrandName = (fullname) => {
    if (!fullname || fullname.trim().length < 3) {
        alert('Please enter a valid full name.');
        return false;
    }
    return true;
};
//////////////////////////////////////////////////////////////////////////////

// Fonction de validation du numéro de téléphone
const validatePhoneNumber = (phonenbr) => {
    const phonePattern = /^[0-9]{8}$/; // Ajuste selon le format de ton pays
    if (!phonenbr || !phonePattern.test(phonenbr)) {
        alert('Please enter a valid 8-digit phone number.');
        return false;
    }
    return true;
};
//////////////////////////////////////////////////////////////////////////////

// Fonction de validation de la région
const validateRegion = (selectedRegion) => {
    if (!selectedRegion) {
        alert('Please select your region.');
        return false;
    }
    return true;
};
//////////////////////////////////////////////////////////////////////////////

// Fonction de validation de la date de naissance et du calcul de l'âge
const validateBirthDate = (birthDate) => {
    if (!birthDate) {
        alert('Please select your birth date.');
        return false;
    }

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    const dayDifference = today.getDate() - birthDateObj.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    if (age < 16) {
        alert('You must be at least 16 years old.');
        return false;
    }

    return true;
};
//////////////////////////////////////////////////////////////////////////////

// Fonction pour nettoyer et préparer les données de l'utilisateur
const PrepareUserData = async (email, fullname, phonenbr, selectedRegion, password) => {
    const sanitizedEmail = email;
    const sanitizedFullname = fullname;
    const sanitizedPhone = phonenbr;
    console.log(email, fullname, phonenbr, selectedRegion, password);
    
    try {
       
        return {
            email: sanitizedEmail,
            password: password, 
            brand_name: sanitizedFullname,
            phone_number: sanitizedPhone,
            region: selectedRegion
        };
    } catch (error) {
        console.error('Error fetching grade:', error); // Log l'erreur de la requête
        return null; // Retourner null si une erreur se produit
    }
};
//////////////////////////////////////////////////////////////////////////////

// Fonction pour envoyer la requête et créer l'utilisateur
const addBrand = async (userData, setShowSpiner, navigation, genre) => {
    try {
            const response = await axios.post(`${Port}/brands/create`, userData);
            if (response.status === 201) {
                console.log('User added successfully:', response.data);
                const img = await uploadImage(response.data.brandId);
                if (img) {
                    console.log('Image uploaded successfully:', img);
                }
                setShowSpiner(false); // Arrêter le spinner
                navigation.navigate("LoginWEmail", { genre });
            } else {
                throw new Error('Failed to add user'); // Gère les autres statuts
            }
    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error); // Log l'erreur pour débogage
        alert('Error adding brand: ' + error.message);
    }
};
//////////////////////////////////////////////////////////////////////////////

// Fonction principale pour ajouter un nouvel utilisateur
const AddNewBrand = async () => {
    // Validation des entrées
    if (!validateBrandName(brandName)) return;
    if (!validatePhoneNumber(phonenbr)) return;
    if (!validateRegion(selectedRegion)) return;
    if (!validateEmail(emailA))return;
    if (!validatePassword(passwordA)) return;
    // if(!validateConfirmePassword(passwordA,confirmPassword))return;
    console.log("work");
    // if(validateConfirmePassword(passwordA,confirmPassword))return;
    // Début de l'animation du spinner
    setShowSpiner(true);

    try {
        console.log(PrepareUserData(emailA, brandName, phonenbr, selectedRegion, passwordA));
        

        // Attends que la fonction prepareUserData retourne les données avant de continuer
        const userData = await PrepareUserData(emailA, brandName, phonenbr, selectedRegion, passwordA);

        // Vérifie si les données utilisateur sont correctement préparées
        if (!userData) {
            throw new Error("User data could not be prepared");
        }

        // Envoyer la requête pour ajouter l'utilisateur
        await addBrand(userData, setShowSpiner, navigation, genre);
    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error);
        alert('Error adding user: ' + error.message);
    }
};
//////////////////////////////////////////////////////////////////////////////

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
        setSelectedImage({
            uri: result.assets[0].uri,
            type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
        });
    }
    onClose();
  };
//////////////////////////////////////////////////////////////////////////////

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
        setSelectedImage({
            uri: result.assets[0].uri,
            type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
        });
    }
    onClose();
  };


////////////////////////////////////////////////////////////////
    const regions = [
        'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
        'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba',
        'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
        'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];

///////////////////////////NATIVE BASE//////////////////////////////
    const Example = () => {
        return (
            <Box style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E' }]}>
                <Select
                    selectedValue={selectedRegion}
                    minWidth="345"
                    accessibilityLabel="Choose Region"
                    placeholder="Choose Region"
                    _selectedItem={{
                        bg: "pink.200", // Couleur de fond de l'élément sélectionné
                        endIcon: <CheckIcon size="5" />,
                        borderRadius: 5, // Ajouter des bordures arrondies aux éléments sélectionnés
                      }}
                      _input={{
                          borderWidth: 0, // Supprime la bordure par défaut
                        }}
                        _light={{
                          borderWidth: 0, // Supprime la bordure par défaut
                        }}
                    style={{ color: genreA === 'man' ? '#1870B3' : '#AD669E' }}
                    onValueChange={itemValue => setSelectedRegion(itemValue)}
                >
                    {regions.map((region, index) => (
                        <Select.Item label={region} value={region} key={index} />
                    ))}
                </Select>
            </Box>
        );
    };
    const ExampleSpiner = () => {
        return <HStack space={2} justifyContent="center" mb={10}>
            <Spinner color={genreA === 'man' ? "cyan.800" : "indigo.800"}  size="lg" />
          </HStack>;
      };

///////////////////////////NATIVE BASE//////////////////////////////


    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NativeBaseProvider>
        <View style={styles.container}>
            <LinearGradient
                colors={genreA === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#AD669E', '#FFB6C8']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.background}
            >
            <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Splash2", { genre })}
                >
                    <Image
                        source={BackIcon}
                        style={styles.logo}
                    />
                    <Text style={styles.textstyle}>Sign-Up Pro</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={onOpen}
                style={styles.cameraButton}>
                    {selectedImage?  
                    
                    <Image
                        source={{uri: selectedImage.uri}}
                        style={styles.cameraIcon}
                    />:
                    <Image
                        source={CameraIcon}
                        style={styles.cameraIcon}
                    />
                }
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

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Name of Brand"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setBrandName(text) }}
                    />
                    
                    <TextInput
                    
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Phone Number"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        keyboardType="phone-pad"
                        onChangeText={(text) => { setPhonenbr(text) }}
                    />
                    <Example />
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="E-mail"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setEmailA(text) }}
                    />
                     <TextInput
                    style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                    placeholder="Password"
                    placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                    onChangeText={(text) => { setPasswordA(text) }}
                    secureTextEntry={true}
                />
                 <TextInput
                    
                    style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                    placeholder="Confirme Password"
                    placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                    onChangeText={(text) => { setConfirmPassword(text) }}
                    secureTextEntry={true}

                />

                    {/* Picker for selecting region */}
                </View>
                    {!showSpiner?
                <TouchableOpacity style={[styles.proceedButton, { backgroundColor: genreA === 'man' ? '#2C9AEE' : '#AD669E' }]}
                onPress={()=>{AddNewBrand()}}
                >
                    <Text style={styles.proceedText}>Proceed</Text>
                </TouchableOpacity>
                    :
                    <ExampleSpiner/>
                    }

                <Text style={styles.termsText}>By proceeding, you are accepting all our <Text style={styles.linkText}>terms & conditions</Text>.</Text>
            </LinearGradient>
        </View>
        </NativeBaseProvider>
           </ScrollView>
           </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    logo: {
        width: 20,
        height: 35,
        marginRight: "8%",
    },
    textstyle: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    cameraButton: {
        backgroundColor: '#FFFFFF6C',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginTop: "20%"
    },
    cameraIcon: {
        width: 100,
        height: 100,
        borderRadius:80
        // tintColor: '#FFFFFF',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        marginBottom: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
    },
    pickerContainer: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        marginBottom: 25,
        paddingHorizontal: 20,
        borderWidth: 2,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 35,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedGender: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    genderText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    proceedButton: {
        borderRadius: 25,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    termsText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        textAlign: 'center',
    },
    linkText: {
        textDecorationLine: 'underline',
    },
});

export default BrandDet;
