import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import ArticleVerificationModal from '../myFashionista/VerifModal'
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articleToVerify, setArticleToVerify] = useState({
    image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    price: 50,
    sizes: ['S', 'M', 'L'],
    category: 'Homme',
    isAvailable: true,
  });

  const handleAccept = (price, sizes, category, isAvailable) => {
    console.log('Article accepté:', { price, sizes, category, isAvailable });
    setIsModalVisible(false);
  };

  const handleReject = () => {
    console.log('Article rejeté');
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.detailsContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      <TouchableOpacity
      style={styles.button}
      onPress={() => setIsModalVisible(true)}
    >
          <Text style={styles.buttonText}>Voir</Text>
        </TouchableOpacity>
      </View>
      {
        isModalVisible&&
      <ArticleVerificationModal
        article={articleToVerify}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      }
      {/* <View style={styles.separator} /> */}
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
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#F9F9F9", // Fond de la page
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
    elevation: 3, // Pour Android
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#C78DB8", // Bordure légère autour de l'avatar
  },
  textContainer: {
    flex: 1,
  },
  role: {
    backgroundColor: "#C78DB8",
    color: "white",
    fontSize: 13,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  time: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
    width: screenWidth - 40,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#C78DB8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Ombre au clic
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});

export default TagList;
