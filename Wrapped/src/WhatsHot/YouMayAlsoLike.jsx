import React from "react";
import { ScrollView, Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import PostDetails from "../Post/postDetails/PostDetails";

const YouMayAlsoLike = ({ idUser, articles, navigation }) => {
  const [showCount, setShowCount] = React.useState(6); // Initially show 6 items

  // Show more items when "See More" is pressed
  const handleSeeMore = () => {
    setShowCount((prevCount) => prevCount + 6); // Load 6 more items
  };

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {articles.slice(0, showCount).map((article) => (
        <TouchableOpacity
          key={article.id}
          style={styles.gridItem}
          onPress={() => {
            navigation.navigate("PostDetails", { idUser:idUser, article: article, articles: articles });
          }}
        >
          <Image source={{ uri: article.images[0].image_url }} style={styles.image} />
        </TouchableOpacity>
      ))}
      {articles.length > showCount && (
        <TouchableOpacity onPress={handleSeeMore} style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  gridItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff", // Ensure the grid items have a background
    elevation: 5, // Shadow for Android devices
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  seeMoreButton: {
    marginTop: 10,
    padding: 5,
    alignItems: "center", // Center the button horizontally
  },
  seeMoreText: {
    fontSize: 14,
    color: "#007BFF", // Blue text
    textDecorationLine: "underline", // Make it look like a link
  },
});

export default YouMayAlsoLike;
