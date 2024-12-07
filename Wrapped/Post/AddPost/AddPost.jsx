import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AddImage from './widgets/AddImage.jsx';
import InputsAsk from './widgets/InputsAsk.jsx';
import plusIcon from '../../assets/plus.png';
import Footer from '../../widgets/Footer.jsx'
import { useRoute, useNavigation } from '@react-navigation/native';

const AddPost = ({ routee }) => {
  const { brands = [] } = routee?.params || {};
  const route = useRoute();
  const { idUser } = route.params;
console.log(idUser);

  const [images, setImages] = useState([]);
  const [addImageComponents, setAddImageComponents] = useState([<AddImage setImages={setImages} key={0} index={0} />]);

  const [description, setDescription] = useState('');
  const [compositions, setCompositions] = useState('');
  const [occasion, setOccasion] = useState('');
  const [infoBrand, setInfoBrand] = useState(brands);
  const handleAddImage = () => {
    const newIndex = addImageComponents.length;
    setAddImageComponents([
      ...addImageComponents,
      <AddImage setImages={setImages} key={newIndex} index={newIndex} />
    ]);
  };
console.log(infoBrand);

  const handleNext = () => {
    const postData = {
      description,
      compositions,
      occasion,
      images,
      infoBrand,
    };
    console.log(postData);
    // Vous pouvez envoyer postData à un serveur ou à une autre fonction selon vos besoins
  };
  useEffect(() => {
    if (brands && brands.length > 0) {
      setInfoBrand(brands);
    }
  }, [brands]);

  return (
    <View style={styles.view1}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Conteneur des images */}
        <View style={styles.imagesContainer}>
          {addImageComponents}
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Image source={plusIcon} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        {/* Conteneur des bandes */}
        <View style={styles.brandsContainer}>
          { infoBrand.map((brand, index) => (
            <View key={index} style={styles.brandCard}>
              <Text style={styles.brandText}>{brand.name} -</Text>
              <Text style={styles.brandText}>{brand.price} $</Text>
            </View>
          ))}
        </View>

        <View style={styles.view3}>
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
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Post</Text>
      </TouchableOpacity>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Footer idUser={idUser} />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    height: "40%",
  },
  addButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  brandsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Permet de passer à la ligne si nécessaire
    marginBottom: 20,
  },
  brandCard: {
    backgroundColor: "#F08DB7",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    flexDirection:'row'
  },
  brandText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight:'bold'
  },
  view3: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#F08DB7",
    alignSelf: "flex-end",
    width: "25%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  footerContainer: {},

});

export default AddPost;
