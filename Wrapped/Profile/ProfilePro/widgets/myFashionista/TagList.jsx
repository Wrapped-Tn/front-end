import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";

const data = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Publisher",
    time: "before 2 min",
    description: "Sunny day",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Publisher",
    time: "before 2 min",
    description: "Sunny day",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Publisher",
    time: "before 2 min",
    description: "Sunny day",
  },
];

const TagList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Row with details on the left and button on the right */}
      <View style={styles.row}>
        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>

        {/* Button Section */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Voir le poste publié"); // Action lors du clic sur le bouton
          }}
        >
          <Text style={styles.buttonText}>Voir</Text>
        </TouchableOpacity>
      </View>
      {/* Separator */}
      <View style={styles.separator} />
    </View>
  );

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
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between details and button
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allows details to take up remaining space
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  role: {
    backgroundColor: "#C78DB8",
    color: "white",
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    width: screenWidth - 40, // Full width minus padding
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#C78DB8",
    paddingVertical: 10,
    paddingHorizontal: 15, // Adjust button width
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default TagList;
