import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Image widget
const HotImages = ({ imageSource }) => {
  return (
    <View style={styles.imageContainer}>
      <Image 
        source={imageSource}
        style={styles.image} 
        resizeMode="contain" // Adapte l'image pour qu'elle soit entièrement visible
      />
    </View>
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
});

export default HotImages;
