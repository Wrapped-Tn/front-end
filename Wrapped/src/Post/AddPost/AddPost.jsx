import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AddImage from './widgets/AddImage.jsx';
import InputsAsk from './widgets/InputsAsk.jsx';
import plusIcon from '../../../assets/plus.png';
import Footer from '../../widgets/Footer.jsx';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PORT } from '../../Port';
const AddPost = () => {
  const route = useRoute();
  const { brands = [] } = route.params || {};
console.log(brands);

  const [images, setImages] = useState([]);
  const [addImageComponents, setAddImageComponents] = useState([
    <AddImage setImages={setImages} key={0} index={0} />
  ]);

  const [description, setDescription] = useState('');
  const [compositions, setCompositions] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [infoBrand, setInfoBrand] = useState(brands);
  const [idUser, setIdUser] = useState(null);
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
////////////////////////////////////Axios//////////////////////////////////////////////////////////
const uploadImage = async (articleId, userId, selectedImage) => {
  if (!selectedImage) {
    alert('Please select an image');
    return;
  }

  try {
    // Créer l'objet FormData
    const formData = new FormData();

    // Récupérer le nom du fichier à partir de l'URI
    const uriParts = selectedImage.uri.split('/');
    const fileName = uriParts[uriParts.length - 1];
    console.log('**********userId*********', userId);

    formData.append('fileUploadpicture', 'profil');
    formData.append('userId', userId);
    formData.append('typesignup', 'user');
    formData.append('file', {
      uri: selectedImage.uri,
      type: 'image/jpeg',  // Ou utilisez le type réel si nécessaire
      name: fileName,
    });

    // Envoyer au backend
    const response = await axios.post(`${PORT}/posts/articles/${articleId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      console.log('Image uploaded successfully:', response.data);
      return response.data.url; // Assurez-vous que l'URL est correctement renvoyée
    }
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    throw error;  // Propager l'erreur pour qu'elle soit gérée dans la fonction appelante
  }
};


const AddPost =async(data)=>{
  try{
    const response =await axios.post(`${PORT}/posts/posts`,data);
    if(response.status===201){
      console.log("Post added successfully",response.data);
      return response.data.articleId;
    }
    else{
      console.log("Failed to create post. Please try again.",response.message);
    }
  }catch(e){
    console.log(e);
  }
}


////////////////////////////////////Axios//////////////////////////////////////////////////////////


const handleNext = (selectedImage) => {
  const uriParts = selectedImage.uri.split('/');
    const fileName = uriParts[uriParts.length - 1];
  const infoImage = [
    {
      url: fileName, // Assurez-vous que "images[0]" est une chaîne
      positions: infoBrand.map(({ region, ...rest }) => rest) // Supprimer "region"
    }
  ];
  const postData = {
    userId: idUser,
    description:description,
    category:compositions,
    occasion:occasion,
    images:infoImage
  };
  console.log("post", JSON.stringify(postData, null, 2));
  // Send postData to the server or perform necessary actions
  return postData
};

const AddnewPost = async () => {
  try {
    const postData = handleNext(images[0]); // Préparez les données de publication

    // Créez le post principal
    const articleId = await AddPost(postData);

    if (!articleId) {
      alert("Failed to create post. Please try again.");
      return;
    }

    // Gérez le téléchargement des images
    await Promise.all(
      images.map(async (image) => {
        console.log("Uploading image:", image);
        
        await uploadImage(articleId, idUser, image);
      })
    );

    console.log("All images uploaded successfully!");
    alert("Post added successfully!");
  } catch (e) {
    console.error("Error in AddnewPost:", e);
    alert("An error occurred while adding the post.");
  }
};

  const handleAddImage = () => {
    if (addImageComponents.length >= 3) {
        alert('Vous ne pouvez ajouter que 3 images maximum.');
        return;
    }

    const newIndex = addImageComponents.length;
    setAddImageComponents([
        ...addImageComponents,
        <AddImage setImages={setImages} key={newIndex} index={newIndex} />
    ]);
};


  useEffect(() => {
    if (brands && brands.length > 0) {
      setInfoBrand(brands);
    }
  }, [brands]);

  return (
    <View style={styles.container}>
           <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Image Section */}
        <View style={styles.imagesContainer}>
          {addImageComponents}
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Image source={plusIcon} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        {/* Brand Section */}
        <View style={styles.brandsContainer}>
          {infoBrand.map((brand, index) => (
            <View key={index} style={styles.brandCard}>
              <Text style={styles.brandText}>{brand.brand} - </Text>
              <Text style={styles.brandText}>{brand.size} - </Text>
              <Text style={styles.brandText}>{brand.prix} $</Text>
            </View>
          ))}
        </View>
        {/* Inputs Section */}
        <View style={styles.inputsContainer}>
          <InputsAsk
            description={description}
            setDescription={setDescription}
            compositions={compositions}
            setCompositions={setCompositions}
            occasion={occasion}
            setOccasion={setOccasion}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>{AddnewPost()}}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer person={'add'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom:"70%", // Ensure enough space for scrolling
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Ensure wrapping for multiple images
    height:"30%",
    padding:"5%",
  },
  addButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIcon: {
    width: 30,
    height: 30
  },
  brandsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  brandCard: {
    backgroundColor: '#F08DB7',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    flexDirection: 'row'
  },
  brandText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  inputsContainer: {
    marginBottom: 20
  },
  button: {
    backgroundColor: '#F08DB7',
    alignSelf: 'flex-end',
    width: '25%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
});

export default AddPost;
