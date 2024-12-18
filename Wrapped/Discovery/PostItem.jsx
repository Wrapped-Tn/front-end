import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostItem = ({ item }) => {
  return (
    <View style={styles.postsContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postPrice}>${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 0,
    marginBottom: 0,
    width: 160,
    margin: 7,
  },
  postDetails: {
    backgroundColor: "white",
    padding: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -20,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginBottom: 0,
    marginLeft: 7,
  },
  postPrice: {
    fontSize: 12,
    marginLeft: 7,
  },
});

export default PostItem;
