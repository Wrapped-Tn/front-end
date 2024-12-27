import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

const PostItem = ({ item }) => {
    const navigation = useNavigation();
const route = useRoute();
  return (
    <View style={styles.postsContainer}>
      <TouchableOpacity onPress={() => {
            navigation.navigate("PostDetails",);
          }}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.brandButton}>
            <Text style={styles.brandButtonText}>{item.brand.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postDetails: {
    padding: 10,
    backgroundColor: "#fff",
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  postPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  brandButton: {
    backgroundColor: "#AD669E",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  brandButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PostItem;
