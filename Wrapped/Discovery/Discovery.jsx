import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import AppBar from './AppBar';
import SearchBar from './SearchBar';
import Suggestions from './Suggestions';
import Filters from './Filters';
import PostItem from './PostItem';

const DiscoveryPage = () => {
  const route = useRoute();
  const {
    selectedCategory = '',
    selectedColor = '',
    selectedBrand = '',
    selectedOccasion = '',
    selectedItem = '',
  } = route.params || {};

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState(""); 
  const [showSuggestions, setShowSuggestions] = useState(true); 
  const [selectedFilters, setSelectedFilters] = useState([selectedCategory, selectedColor, selectedBrand, selectedOccasion]);

  const suggestions = ["Trendy Outfit", "Elegant Wear", "Athleisure", "Vintage Style"];
  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const allPosts = [
    { id: '1', category: 'men', color: 'red', brand: 'Brand 1', occasion: 'casual', item: 'shirt', title: 'Red Shirt', price: 50, image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
    { id: '2', category: 'women', color: 'blue', brand: 'Brand 2', occasion: 'formal', item: 'dress', title: 'Blue Dress', price: 100, image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
    { id: '3', category: 'men', color: 'green', brand: 'Brand 1', occasion: 'party', item: 'pants', title: 'Green Pants', price: 70, image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
    { id: '4', category: 'women', color: 'black', brand: 'Brand 3', occasion: 'wedding', item: 'skirt', title: 'Black Skirt', price: 80, image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
  ];

  useEffect(() => {
    let filteredData = allPosts;

    if (selectedCategory) {
      filteredData = filteredData.filter(post => post.category === selectedCategory);
    }
    if (selectedColor) {
      filteredData = filteredData.filter(post => post.color === selectedColor);
    }
    if (selectedBrand) {
      filteredData = filteredData.filter(post => post.brand === selectedBrand);
    }
    if (selectedOccasion) {
      filteredData = filteredData.filter(post => post.occasion === selectedOccasion);
    }
    if (selectedItem) {
      filteredData = filteredData.filter(post => post.item === selectedItem);
    }

    if (searchText) {
      filteredData = filteredData.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredPosts(filteredData);
  }, [selectedCategory, selectedColor, selectedBrand, selectedOccasion, selectedItem, searchText]);

  const handleSuggestionPress = (suggestion) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
  };

  const removeFilter = (filter) => {
    setSelectedFilters(prevFilters => prevFilters.filter(item => item !== filter));
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <SearchBar searchText={searchText} setSearchText={setSearchText} setShowSuggestions={setShowSuggestions} />
      {showSuggestions && searchText !== "" && filteredSuggestions.length > 0 && (
        <Suggestions filteredSuggestions={filteredSuggestions} handleSuggestionPress={handleSuggestionPress} />
      )}
      <Filters selectedFilters={selectedFilters} removeFilter={removeFilter} />
      {filteredPosts.length === 0 ? (
        <Text style={styles.noResultsText}>No results found for your filters.</Text>
      ) : (
        <FlatList
          data={filteredPosts}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
    paddingTop: 60,
  },
});

export default DiscoveryPage;
