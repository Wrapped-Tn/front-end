import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        style={styles.input}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  searchIcon: {
    marginLeft: 5,
  },
});

export default SearchBar;