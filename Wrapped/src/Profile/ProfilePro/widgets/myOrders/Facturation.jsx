import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";

const facturations = [
  { id: "1", date: "2025-01-01", montant: "$150.00", description: "Facturation Janvier" },
  { id: "2", date: "2025-02-01", montant: "$200.00", description: "Facturation Février" },
  { id: "3", date: "2025-03-01", montant: "$180.00", description: "Facturation Mars" },
  { id: "4", date: "2025-04-01", montant: "$220.00", description: "Facturation Avril" },
];

const Facturation = ({ navigation }) => {
  const handleFacturationClick = (facturation) => {
    Alert.alert(
      "Détails de la Facturation",
      `Date : ${facturation.date}\nMontant : ${facturation.montant}\nDescription : ${facturation.description}`,
      [{ text: "OK" }]
    );
    // Si vous utilisez un système de navigation, remplacez ceci par un `navigation.navigate()` pour rediriger l'utilisateur.
    // Par exemple : navigation.navigate("DetailsFacturation", { facturation });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleFacturationClick(item)}>
      <View style={styles.itemContent}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.montant}>{item.montant}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <FlatList
        data={facturations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  itemContent: {
    flexDirection: "column",
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  montant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
  },
});

export default Facturation;
