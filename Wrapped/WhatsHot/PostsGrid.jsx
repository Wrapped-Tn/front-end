import React from "react";
import { ScrollView, Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";

const PostsGrid = ({ idUser, articles, searchQuery, navigation }) => {
  const [showCount, setShowCount] = React.useState(6); // Initially show 6 items

  // Filter and limit the number of articles based on search query and showCount
  const filteredArticles = (articles || []).filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      article.brand.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      article.color.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Show more items when "See More" is pressed
  const handleSeeMore = () => {
    setShowCount((prevCount) => prevCount + 6); // Load 6 more items
  };

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {filteredArticles.slice(0, showCount).map((article) => (
        <TouchableOpacity
          key={article.id}
          style={styles.gridItem}
          onPress={() => {
            navigation.navigate("PostDetails", {
              idUser, 
              articleId: article.id, 
              article, // Passing full article to details page
            });
          }}
        >
          <Image
            source={{ uri: article?.images[0]?.image_url || 'https://via.placeholder.com/150' }} // Fallback image if none
            style={styles.image}
          />
          {/* <Text style={styles.title}>{article.title}</Text> */}
          {/* Additional info about the article */}
          {/* <Text style={styles.category}>{article.category}</Text>
          <Text style={styles.price}>${article.price.toFixed(2)}</Text> */}
        </TouchableOpacity>
      ))}
      {filteredArticles.length > showCount && (
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
    padding: 10, // Padding inside each grid item for spacing
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#28a745", // Green for price
    marginTop: 4,
    textAlign: "center",
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

export default PostsGrid;
