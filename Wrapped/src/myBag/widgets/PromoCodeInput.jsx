import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PromoCodeInput = ({ value, onChange, onApply }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your promo code"
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={onApply} style={styles.button}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor:"white"
  },
  button: {
    backgroundColor: '#A45AA6',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PromoCodeInput;
