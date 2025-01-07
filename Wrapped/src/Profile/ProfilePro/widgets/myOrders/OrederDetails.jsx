import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importer les icônes

const data = [
  {
    id: "1",
    name: "Pullover",
    color: "Black",
    size: "L",
    quantity: 1,
    date: "31/08/2024",
    price: 51,
    image: "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=", // Remplacez par l'URL de votre image
  },
  {
    id: "2",
    name: "T-Shirt",
    color: "Gray",
    size: "L",
    quantity: 1,
    date: "31/08/2024",
    price: 30,
    image: "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=", // Remplacez par l'URL de votre image
  },
];

const OrederDetails = ({setShowOneOrder}) => {
  const totalAmount = data.reduce((sum, item) => sum + item.price, 0);
  const promoCode = "mypromocode2024";

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>Color: {item.color}</Text>
        <Text style={styles.text}>Size: {item.size}</Text>
        <Text style={styles.text}>Quantity: {item.quantity}</Text>
        <Text style={styles.text}>Date: {item.date}</Text>
      </View>
      <Text style={styles.price}>{item.price}$</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Icône de retour */}
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => setShowOneOrder(false)} // Naviguer vers l'écran précédent
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Order Details</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.separator} />
      <View style={styles.summary}>
        <Text style={styles.text}>
          Status: <Text style={styles.status}>In Progress</Text>
        </Text>
        <Text style={styles.text}>
          Promo Code: <Text style={styles.promoCode}>{promoCode}</Text>
        </Text>
        <Text style={styles.total}>
          Total Amount: <Text style={styles.totalAmount}>{totalAmount}$</Text>
        </Text>
        <Text style={styles.total}>
          Total with Promo:{" "}
          <Text style={styles.totalWithPromo}>{totalAmount}$</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send to Delivery</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  backIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
    marginTop: 40,
  },
  listContainer: {
    paddingBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3cb371",
    alignSelf: "flex-end",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  summary: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  status: {
    fontWeight: "bold",
    color: "#3cb371",
  },
  promoCode: {
    fontWeight: "bold",
    color: "#9b59b6",
  },
  total: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#333",
  },
  totalWithPromo: {
    fontWeight: "bold",
    color: "#3cb371",
  },
  button: {
    backgroundColor: "#9b59b6",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: "20%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default OrederDetails;
