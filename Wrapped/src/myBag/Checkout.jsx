import React from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import ShippingAddress from "./widgets/ShippingAdress";
import PaymentMethod from "./widgets/PaymentMethod";
import OrderSummary from "./widgets/OrderSummary";
import PaimentMethod from "./widgets/PaimentMethod";
import Footer from '../widgets/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Ajout de l'icône pour le bouton "Back"

const Checkout = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* Header avec le bouton Back */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()} // Action pour revenir à la page précédente
                    >
                        <AntDesign name="arrowleft" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Checkout</Text>
                </View>
                <View>

                </View>
                {/* Shipping Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping address</Text>
                    <ShippingAddress
                        name="Jane Doe"
                        address="3 Newbridge Court, Chino Hills, CA 91709, United States"
                        onChange={() => navigation.navigate("AddAdress")}
                        checkbox={false}
                    />
                </View>
                <View style={styles.sectionpaiment}>
                    <PaimentMethod />
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <OrderSummary order={112} delivery={15} summary={127} />
                </View>

                {/* Submit Order Button */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>SUBMIT ORDER</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Footer */}
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
        height:'100%'
        
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,

    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    section: {
        marginBottom: 10,
        height: 170,
    },
    sectionpaiment: {
        marginBottom: 10,
        height: "30%",
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
        marginBottom: "10%",
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footerContainer: {
        marginTop: 10,
    },
});

export default Checkout;
