import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

//  Buttons widget
const ButtonsWidget = ({ buttons }) => {
    return (
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{button}</Text>
           </TouchableOpacity>
        ))}
      </View>
    );
  };
  const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginRight: 10,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
    });

  export default ButtonsWidget;