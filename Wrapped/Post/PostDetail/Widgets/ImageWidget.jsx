import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

//  Image widget
const ImageWidget = ({ imageSource }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
    imageContainer: {
        // marginBottom: 20,
      },
      image: {
        width: '100%',
        height: '60%',
        borderRadius: 10,
      },
});
export default ImageWidget;