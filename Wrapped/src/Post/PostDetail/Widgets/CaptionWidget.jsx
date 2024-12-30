import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';


//  Caption widget
const CaptionWidget = ({ caption }) => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{caption} 🥳</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    captionContainer: {
        marginBottom: 20,
      },
      captionText: {
        fontSize: 16,
        color: '#333',
      },
});
  export default CaptionWidget;