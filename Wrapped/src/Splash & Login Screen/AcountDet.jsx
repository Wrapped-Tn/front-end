import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { Select, Box, CheckIcon, Center, NativeBaseProvider, Spinner, HStack, Heading ,Actionsheet, useDisclose} from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
// import BackIcon from '../assets/flecheIcon.png';
import CameraIcon from '../../assets/cameraIcon.png';
// import LogoWarpeed from '../assets/logo2.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import {PORT} from '../Port'
import { err } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';


const AcountDet = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre, email, password } = route.params;

    const today = new Date();
    const minDateOfBirth = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const [birthDate, setBirthDate] = useState(minDateOfBirth);

    const [genreA, setGenreA] = useState(genre);
    const [fullname, setFullName] = useState('');
    const [emailA, setEmailA] = useState(email);
    const [passwordA, setPasswordA] = useState(password);
    const [phonenbr, setPhonenbr] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSpiner,setShowSpiner]=useState(false)

    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclose();

    const [idgrade,setIdGrade]=useState(null)
    ////////////////////////////////////////////////////////////////

    
const IntitalGrade=async()=>{
    try{
        const response= await axios.put(PORT+'/grades/')
        if(response.status==201){
            setIdGrade(response.data.id)
        }
        else{
            console.log(response.status);
        }
    }catch(e){
        throw new Error('error:'+e)
    }
}

const validateFullName = (fullname) => {
    if (!fullname || fullname.trim().length < 3) {
        alert('Please enter a valid full name.');
        return false;
    }
    return true;
};
// console.log('image'+FileSystem.readAsStringAsync(selectedImage.uri, {
//     encoding: FileSystem.EncodingType.Base64,
//   }))

// const uploadImage = async () => {
//     if (!selectedImage) {
//       alert('Please select an image');
//       return;
//     }
  
//     try {
//       // Lire le fichier local et convertir en base64
//       const base64File = await FileSystem.readAsStringAsync(selectedImage.uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
  
//       // Créer un objet JSON avec le fichier encodé
//       const file = `data:image/jpeg;base64,${base64File}`;
  
//       // Envoyer au backend
//       const response = await axios.post(`${PORT}/uploads`, { file }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.status === 201) {
//         console.log('Image uploaded successfully:', response.data);
//         return response.data.url;
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error.response ? error.response.data : error.message);
//     }
//   };



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
      formData.append('typesignup','user');
      formData.append('file', {
        uri: selectedImage.uri,
        type: 'image/jpeg', 
        name: fileName,
      });

  
      // Send to backend
      const response = await axios.post(`${PORT}/upload`, formData, {
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


// Fonction de validation du numéro de téléphone


const validatePhoneNumber = (phonenbr) => {
    const phonePattern = /^[0-9]{8}$/; // Ajuste selon le format de ton pays
    if (!phonenbr || !phonePattern.test(phonenbr)) {
        alert('Please enter a valid 8-digit phone number.');
        return false;
    }
    return true;
};

// Fonction de validation de la région
const validateRegion = (selectedRegion) => {
    if (!selectedRegion) {
        alert('Please select your region.');
        return false;
    }
    return true;
};

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

// Fonction pour nettoyer et préparer les données de l'utilisateur
const PrepareUserData = async (email, fullname, phonenbr, genreA, selectedRegion, birthDate, password,profile_picture_url) => {
    const sanitizedEmail = email;
    const sanitizedFullname = fullname;
    const sanitizedPhone = phonenbr;
   
    try {
        const fileBase64 = await FileSystem.readAsStringAsync(profile_picture_url, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return {
            email: sanitizedEmail,
            password: password, 
            full_name: sanitizedFullname,
            phone_number: sanitizedPhone,
            sexe: genreA === 'man' ? 'male' : 'female',
            grade: idgrade,
            region: selectedRegion,
            birthdate: birthDate,
            profile_picture_url: `data:image/jpeg;base64,${fileBase64}`,
        };
    } catch (error) {
        console.error('Error fetching grade:', error); // Log l'erreur de la requête
        return null; // Retourner null si une erreur se produit
    }
};




// Fonction pour envoyer la requête et créer l'utilisateur
const addUser = async (userData, setShowSpiner, navigation, genre) => {
    console.log('**********userData*********',userData);
    
    try {
        // IntitalGrade()
        // if(idgrade){

            const response = await axios.post(`${PORT}/users/`, userData);
            if (response.status === 200) {
                // const img = await uploadImage(response?.data?.userId);
               
                setShowSpiner(false); 
                navigation.navigate("LoginWEmail", { genre });
            }
        // }

    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error); // Log l'erreur pour débogage
        alert('Error adding user: ' + error.message);
    }
};

// Fonction principale pour ajouter un nouvel utilisateur
const AddNewUser = async () => {
    // Validation des entrées
    if (!validateFullName(fullname)) return;
    if (!validatePhoneNumber(phonenbr)) return;
    if (!validateRegion(selectedRegion)) return;
    if (!validateBirthDate(birthDate)) return;

    // Début de l'animation du spinner
    setShowSpiner(true);

    try {
        console.log(PrepareUserData(email, fullname, phonenbr, genreA, selectedRegion, birthDate, password,selectedImage.uri));

        
        // Attends que la fonction prepareUserData retourne les données avant de continuer
        const userData = await PrepareUserData(email, fullname, phonenbr, genreA, selectedRegion, birthDate, password,selectedImage.uri);
        console.log('**********userData*********',userData);

        // Vérifie si les données utilisateur sont correctement préparées
        if (!userData) {
            throw new Error("User data could not be prepared");
        }

        // Envoyer la requête pour ajouter l'utilisateur
        await addUser(userData, setShowSpiner, navigation, genre);
    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error);
        alert('Error adding user: ' + error.message);
    }
};




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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };
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
// const displayImageUri = selectedImage?decodeURIComponent(selectedImage.uri):''
// const displayImageUri2 =displayImageUri? decodeURIComponent(displayImageUri):''
// console.log(displayImageUri2 );

    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <LinearGradient
                colors={genreA === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#AD669E', '#FFB6C8']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.background}
            >
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
                        placeholder="Full Name"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setFullName(text) }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Phone Number"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        keyboardType="phone-pad"
                        onChangeText={(text) => { setPhonenbr(text) }}
                    />

                    {/* Picker for selecting region */}
                    <Example />

                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholderTextColor={'#AD669E'}
                        value={birthDate.toLocaleDateString()} // Affiche la date sélectionnée
                        editable={false} // Empêche l'édition manuelle pour forcer l'utilisation du DateTimePicker
                    />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                </View>

                <View style={styles.genderContainer}>
                    <TouchableOpacity onPress={() => setGenreA("man")} style={[styles.genderButton, genreA === 'man' && styles.selectedGender]}>
                        <Text style={styles.genderText}>Man</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGenreA("woman")} style={[styles.genderButton, genreA === 'woman' && styles.selectedGender]}>
                        <Text style={styles.genderText}>Woman</Text>
                    </TouchableOpacity>
                </View>
                    {!showSpiner?
                <TouchableOpacity style={[styles.proceedButton, { backgroundColor: genreA === 'man' ? '#2C9AEE' : '#AD669E' }]}
                onPress={()=>{AddNewUser()}}
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

export default AcountDet;
