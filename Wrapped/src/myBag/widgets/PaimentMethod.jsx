import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HStack, Checkbox, Center, NativeBaseProvider } from "native-base";
import paymentimg from '../../../assets/paymentMethode.png';
const PaymentMethod = () => {
  const [isChecked, setIsChecked] = useState(false); // État pour la case à cocher
 
  return (
    <NativeBaseProvider>

    <View style={styles.container}>
      {/* Titre de la méthode de paiement */}
      <Text style={styles.title}>Cash on Delivery</Text>
      
      {/* Icône et détails */}
      <Image
        source={paymentimg} // Assurez-vous d'avoir l'image correcte
        style={styles.icon}
      />
      
      {/* Case à cocher */}
      {/* <View style={styles.checkboxContainer}>
            <Example />
            <Text>Use as default payment method</Text>
      </View> */}
    </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default PaymentMethod;
