import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import PostsGrid from "./PostsGrid";
import Footer from '../widgets/Footer';

const WhatsHotPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading indicator state
  const [error, setError] = useState(null); // Error state
  const route = useRoute();
  const idUser = route?.params?.idUser ?? null;

  // Static articles data
  const staticArticles = [
    {
      id: '1',
      category: 'skirts',
      color: 'black',
      brand: 'Brand 1',
      title: 'Black Skirt',
      description: 'Sophisticated black skirt ideal for weddings.',
      price: 80.00,
      size: 'S',
      available_stock: 5,
      occasion_outfit: { type: 'wedding', season: 'fall' },
      images: [{ image_url: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' }],
    },
    {
      id: '2',
      category: 'jackets',
      color: 'red',
      brand: 'Brand 2',
      title: 'Red Jacket',
      description: 'Elegant red jacket for casual occasions.',
      price: 120.00,
      size: 'M',
      available_stock: 3,
      occasion_outfit: { type: 'casual', season: 'spring' },
      images: [{ image_url: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' }],
    },
    {
      id: '3',
      category: 'shoes',
      color: 'white',
      brand: 'Brand 3',
      title: 'White Sneakers',
      description: 'Comfortable white sneakers for daily wear.',
      price: 65.00,
      size: 'L',
      available_stock: 8,
      occasion_outfit: { type: 'casual', season: 'summer' },
      images: [{ image_url: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' }],
    },
    {
      id: '4',
      category: 'skirts',
      color: 'blue',
      brand: 'Brand 4',
      title: 'Blue Skirt',
      description: 'Chic blue skirt perfect for formal events.',
      price: 75.00,
      size: 'M',
      available_stock: 2,
      occasion_outfit: { type: 'formal', season: 'fall' },
      images: [{ image_url: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' }],
    },
      {
        id: '5',
        category: 't-shirts',
        color: 'green',
        brand: 'Brand 5',
        title: 'Green T-shirt',
        description: 'Casual green t-shirt with a cool print.',
        price: 25.00,
        size: 'L',
        available_stock: 10,
        occasion_outfit: { type: 'casual', season: 'summer' },
        images: [{ image_url: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' }],
      },
  ];

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]); // If the search is empty, show no suggestions
      return;
    }
    const filteredSuggestions = staticArticles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      article.brand.toLowerCase().includes(query.toLowerCase()) ||
      article.color.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions); // Update suggestions based on the query
  };

  return (
    <View style={{flex:1}}>

    <View style={styles.container}>
      <AppBar />
        <View style={styles.content}>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#FFB6C8" style={styles.loading} />
        ) : (
          <>
            {/* If there are search suggestions, display them; otherwise, show all articles */}
            <PostsGrid
              idUser={idUser}
              articles={suggestions.length > 0 ? suggestions : staticArticles} // Display suggestions or all articles
              searchQuery={searchQuery}
              navigation={navigation}
            />
          </>
        )}
      </View>
    </View>
    <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  content: {
    flex: 1,
    marginTop: 80,
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default WhatsHotPage;
