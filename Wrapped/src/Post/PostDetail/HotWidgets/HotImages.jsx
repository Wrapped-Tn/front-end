import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Image widget
const HotImages = ({ imageSource }) => {
  const [visible, setVisible] = useState(false); // État pour afficher/masquer les marques
  const brands = [
  { name: 'Brand A', x: 181.325, y: 80.3568,},
  { name: 'Brand B', x: 200, y: 150,},
];

const toggleVisibility = () => {
  setVisible((prev) => !prev); // Inverse l'état actuel (affiche/masque)
};
  return (
    <TouchableWithoutFeedback onPress={toggleVisibility}>
<View style={styles.imageContainer}>

      <Image 
        source={imageSource}
        style={styles.image} 
        resizeMode="contain" // Adapte l'image pour qu'elle soit entièrement visible
      />
      {visible &&
          brands.map((brand, index) => (
            <Text
              key={index}
              style={[styles.brandText, { left: brand.x, top: brand.y }]}
            >
              {brand.name}
            </Text>
          ))}
</View>
      </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%', // S'adapte à la largeur de l'écran
    aspectRatio: 0.5, // Maintient un ratio largeur/hauteur (ajustez selon vos besoins)
    // marginBottom: 20,
    overflow: 'hidden', // Pour éviter les débordements
    marginTop: "-30%", // Décale l'image vers le haut
  },
  image: {
    width: '100%',
    height: '100%',
  },
  brandText: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 5,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default HotImages;
