import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,TouchableWithoutFeedback } from 'react-native';

//  Image widget
const ImageWidget = ({ imageSource,brands}) => {
    const [visible, setVisible] = useState(false); // État pour afficher/masquer les marques
  console.log(brands);
  
    const toggleVisibility = () => {
      setVisible((prev) => !prev); // Inverse l'état actuel (affiche/masque)
    };
  return (
        <TouchableWithoutFeedback onPress={toggleVisibility}>
    
    <View style={styles.imageContainer}>
    <Image 
      source={imageSource}
      style={styles.image} 
    />
    {visible &&
              brands.map((brand, index) => (
                <Text
                  key={index}
                  style={[styles.brandText, { left: brand.x, top: brand.y }]}
                >
                  {brand.brand } -{ brand.size}-
                </Text>
              ))}
  </View>

        </TouchableWithoutFeedback>
  
  );
};
const styles = StyleSheet.create({
    imageContainer: {
      // flex:1
        // marginBottom: 20,
      },
      image: {
        width: '100%',
        height: '60%',
        borderRadius: 10,
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
export default ImageWidget;