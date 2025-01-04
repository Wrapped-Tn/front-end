import React from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import ShippingAddress from "./widgets/ShippingAdress";
import PaymentMethod from "./widgets/PaymentMethod";
import OrderSummary from "./widgets/OrderSummary";
import Footer from '../widgets/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';

const Checkout = () => {
    const navigation = useNavigation();

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping address</Text>
        <ShippingAddress
          name="Jane Doe"
          address="3 Newbridge Court, Chino Hills, CA 91709, United States"
          onChange={()=> navigation.navigate("AddAdress")}
          checkbox={false}
        />
      </View>

      {/* Payment Method */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <PaymentMethod
          cardImage="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
          cardNumber="**** **** **** 3947"
          onChange={() => console.log("Change Payment")}
        />
      </View> */}

      {/* Order Summary */}
      <View style={styles.section}>
        <OrderSummary order={112} delivery={15} summary={127} />
      </View>

      {/* Submit Order Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>SUBMIT ORDER</Text>
      </TouchableOpacity>
    </ScrollView>
    <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
    height: 170,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#A45AA6",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Checkout;
