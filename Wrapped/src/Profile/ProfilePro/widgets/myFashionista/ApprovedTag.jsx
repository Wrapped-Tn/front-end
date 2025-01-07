import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";

const approvedData = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Publisher",
    time: "2 min ago",
    description: "Sunny day outfit",
    articleImage: "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=",
    price: "$50",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Publisher",
    time: "5 min ago",
    description: "Chic evening wear",
    articleImage: "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=",
    price: "$80",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Publisher",
    time: "10 min ago",
    description: "Casual street style",
    articleImage: "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=",
    price: "$35",
  },
];

const ApprovedTag = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Image source={{ uri: item.articleImage }} style={styles.articleImage} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <FlatList
      data={approvedData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#F9F9F9",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#C78DB8",
  },
  textContainer: {
    flex: 1,
  },
  role: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
  articleImage: {
    width: screenWidth - 80,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  description: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C78DB8",
    alignSelf: "flex-start",
  },
});

export default ApprovedTag;
