import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AddImage from './widgets/AddImage.jsx';
import InputsAsk from './widgets/InputsAsk.jsx';
import plusIcon from '../../assets/plus.png';
import Footer from '../../widgets/Footer.jsx';
import { useRoute, useNavigation } from '@react-navigation/native';

const AddPost = () => {
  const route = useRoute();
  const { brands = [], idUser } = route.params || {};
console.log(brands);

  const [images, setImages] = useState([]);
  const [addImageComponents, setAddImageComponents] = useState([
    <AddImage setImages={setImages} key={0} index={0} />
  ]);

  const [description, setDescription] = useState('');
  const [compositions, setCompositions] = useState('');
  const [occasion, setOccasion] = useState('');
  const [infoBrand, setInfoBrand] = useState(brands);

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

  const handleNext = () => {
    const postData = {
      description,
      compositions,
      occasion,
      images,
      infoBrand
    };
    console.log(postData);
    // Send postData to the server or perform necessary actions
  };

  useEffect(() => {
    if (brands && brands.length > 0) {
      setInfoBrand(brands);
    }
  }, [brands]);

  return (
    <View style={styles.container}>
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
              <Text style={styles.brandText}>{brand.name} -</Text>
              <Text style={styles.brandText}>{brand.price} $</Text>
            </View>
          ))}
        </View>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer idUser={idUser} />
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
    paddingBottom: 20 // Ensure enough space for scrolling
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Ensure wrapping for multiple images
    height:"30%",
    padding:"10%",
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
