import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import OrederDetails from "./OrederDetails"; // Assurez-vous que ce fichier existe et est correctement configuré

const data = [
  {
    id: "123456",
    items: 2,
    price: "25 Dt",
    status: "en cours",
    image: "https://via.placeholder.com/100", // Remplacez par l'URL de votre image
  },
  {
    id: "123478",
    items: 2,
    price: "25 Dt",
    status: "en cours",
    image: "https://via.placeholder.com/100", // Remplacez par l'URL de votre image
  },
];

const OrderCard = () => {
  const [showOneOrder, setShowOneOrder] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Image Section */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Text Section */}
      <View style={styles.details}>
        <Text style={styles.orderId}>#{item.id}</Text>
        <Text style={styles.text}>Items: {item.items}</Text>
        <Text style={styles.text}>Price: {item.price}</Text>
      </View>

      {/* Status Section */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Status: </Text>
        <Text style={styles.statusValue}>{item.status}</Text>
      </View>

      {/* More Options */}
      <TouchableOpacity
        style={styles.moreOptions}
        onPress={() => setShowOneOrder(true)} // Passe à l'affichage d'une commande spécifique
      >
        <Text style={styles.moreText}>•••</Text>
      </TouchableOpacity>
    </View>
  );

  if (showOneOrder) {
    // Rendu des détails d'une commande
    return (
        <View style={styles.orderDetails}>
            <OrederDetails setShowOneOrder={setShowOneOrder}/>
        </View>
)
  }

  // Rendu de la liste des commandes
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    orderDetails:{
        height:"100%",
    },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5", // Fond léger pour l'arrière-plan
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  statusContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 14,
    color: "#555",
  },
  statusValue: {
    fontSize: 14,
    color: "#3cb371", // Couleur verte pour "en cours"
    fontWeight: "bold",
  },
  moreOptions: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  moreText: {
    fontSize: 18,
    color: "#bbb",
  },
});

export default OrderCard;
