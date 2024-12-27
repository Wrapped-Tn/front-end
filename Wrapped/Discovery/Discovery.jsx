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
    {
      id: '1',
      category_outfit: { main: 'men', sub: 'shirts' },
      color: 'red',
      brand: { name: 'Brand 1', origin: 'USA' },
      occasion_outfit: { type: 'casual', season: 'summer' },
      title: 'Red Shirt',
      description: 'A stylish red shirt perfect for casual outings.',
      price: 50.00,
      size: 'M',
      available_stock: 15,
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    },
    {
      id: '2',
      category_outfit: { main: 'women', sub: 'dresses' },
      color: 'blue',
      brand: { name: 'Brand 2', origin: 'Italy' },
      occasion_outfit: { type: 'formal', season: 'spring' },
      title: 'Blue Dress',
      description: 'Elegant blue dress suitable for formal events.',
      price: 100.00,
      size: 'L',
      available_stock: 10,
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    },
    {
      id: '3',
      category_outfit: { main: 'men', sub: 'pants' },
      color: 'green',
      brand: { name: 'Brand 1', origin: 'USA' },
      occasion_outfit: { type: 'party', season: 'winter' },
      title: 'Green Pants',
      description: 'Trendy green pants for party wear.',
      price: 70.00,
      size: 'XL',
      available_stock: 20,
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    },
    {
      id: '4',
      category_outfit: { main: 'women', sub: 'skirts' },
      color: 'black',
      brand: { name: 'Brand 3', origin: 'France' },
      occasion_outfit: { type: 'wedding', season: 'fall' },
      title: 'Black Skirt',
      description: 'Sophisticated black skirt ideal for weddings.',
      price: 80.00,
      size: 'S',
      available_stock: 5,
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    },
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
        <View style={styles.postsContainer}>
        <FlatList
          data={filteredPosts}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
    </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 5,
    paddingTop: 60,
  },
  postsContainer:{
    marginRight: "auto",
    }
});

export default DiscoveryPage;
