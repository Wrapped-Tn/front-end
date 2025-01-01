import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TotalAmount = ({ amount, onCheckout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.label}>Total amount:</Text>
        <Text style={styles.amount}>${amount}</Text>
      </View>
      <TouchableOpacity onPress={onCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>CHECK OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure it spans the full width
    paddingHorizontal: 20, // Optional: Add padding for spacing
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#A45AA6',
    padding: 15,
    borderRadius: 25,
    width: '90%', // Adjusted to make the button more proportionate
    alignItems: 'center',
    marginTop: 10, // Spacing between the row and button
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TotalAmount;
