import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const PaymentMethod = ({ cardImage, cardNumber, onChange }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: cardImage }} style={styles.paymentIcon} />
      <Text style={styles.cardDetails}>{cardNumber}</Text>
      <TouchableOpacity onPress={onChange}>
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentIcon: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  changeText: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
  },
});

export default PaymentMethod;
