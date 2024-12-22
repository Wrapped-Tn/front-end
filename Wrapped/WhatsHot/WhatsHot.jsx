import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import SuggestionsList from "./SuggestionsList";
import PostsGrid from "./PostsGrid";
import {Port} from "../Port";

const WhatsHotPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [articles, setArticles] = useState([]); // Articles for the grid
  const [loading, setLoading] = useState(true); // Loading indicator state
  const [error, setError] = useState(null); // Error state
  const route = useRoute();
  const idUser = route?.params?.idUser ?? null; 
  // Fetch all articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(Port+'/articles/');
        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
          console.log('====================================');
          console.log("articles",response.data);
          console.log('====================================');
        } else {
          setArticles(response.data.articles || []); // Handle if data is nested
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Error fetching articles. Please try again later.',error);
        console.log('====================================');
        console.log("articles",response.data, "error");
        console.log('====================================');
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = articles.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.User.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.content}>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        {error && (
          <Text style={styles.errorMessage}>{error}</Text>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#ff6600" style={styles.loading} />
        ) : (
          <>
            <SuggestionsList
              suggestions={suggestions}
              setSearchQuery={setSearchQuery}
              setSuggestions={setSuggestions}
            />
            <PostsGrid
              idUser={idUser}
              articles={articles}
              searchQuery={searchQuery}
              navigation={navigation}
            />
          </>
        )}
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