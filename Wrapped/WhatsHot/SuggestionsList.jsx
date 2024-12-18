import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

const SuggestionsList = ({ suggestions, setSearchQuery, setSuggestions }) => {
  return (
    suggestions.length > 0 && (
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
              setSearchQuery(item.title);
              setSuggestions([]);
            }}
          >
            <Text style={styles.suggestionText}>{item.title}</Text>
            <Text style={styles.suggestionSubText}>by {item.userName}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsList}
      />
    )
  );
};

const styles = StyleSheet.create({
  suggestionsList: {
    maxHeight: 150,
    marginBottom: 10,
  },
  suggestionItem: {
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionSubText: {
    fontSize: 12,
    color: "gray",
  },
});

export default SuggestionsList;
