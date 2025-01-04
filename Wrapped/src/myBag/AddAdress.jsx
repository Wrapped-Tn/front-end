import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import ShippingAddress from "./widgets/ShippingAdress";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddAdress = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Jane Doe",
      address: "3 Newbridge Court, Chino Hills, CA 91709, United States",
    },
    {
      id: 2,
      name: "John Smith",
      address: "123 Elm Street, Springfield, IL 62701, United States",
    },
    {
      id: 3,
      name: "Alice Johnson",
      address: "456 Maple Avenue, Boston, MA 02118, United States",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [translateY] = useState(new Animated.Value(500)); // Position initiale pour l'animation

  // Fonction pour afficher le popup
  const showPopup = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0, // Glisse vers le haut
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Fonction pour fermer le popup
  const closePopup = () => {
    Animated.timing(translateY, {
      toValue: 500, // Glisse vers le bas
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const addNewAddress = (name, address) => {
    const newAddress = {
      id: addresses.length + 1,
      name,
      address,
    };
    setAddresses([...addresses, newAddress]);
    closePopup(); // Fermer le popup après ajout
  };

  return (
    <View style={styles.container}>
      {/* Header avec icône de retour */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Shipping Addresses</Text>
      </View>

      {/* Liste des adresses */}
      <ScrollView style={styles.scrollView}>
        {addresses.map((item) => (
          <ShippingAddress
            key={item.id}
            name={item.name}
            address={item.address}
            checkbox={true}
            onChange={() => console.log(`Change Address for ${item.name}`)}
          />
        ))}
      </ScrollView>

      {/* Bouton pour ajouter une nouvelle adresse */}
      <TouchableOpacity style={styles.addButton} onPress={showPopup}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addText}>Add Address</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <Text style={styles.popupHeader}>Add New Address</Text>
            <TextInput style={styles.input} placeholder="Address" />
            <TextInput style={styles.input} placeholder="City" />
            <TextInput style={styles.input} placeholder="State" />
            <TextInput style={styles.input} placeholder="Postal Code" />
            <TextInput style={styles.input} placeholder="Country" />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => addNewAddress("New User", "New Address, City, ZIP")}
            >
              <Text style={styles.saveText}>SAVE ADDRESS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closePopup}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginTop: "10%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#AD669E",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  popupHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#AD669E",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAdress;
