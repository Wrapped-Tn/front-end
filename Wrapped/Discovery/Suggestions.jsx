import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Suggestions = ({ filteredSuggestions, handleSuggestionPress }) => {
  return (
    <View style={styles.suggestionsContainer}>
      {filteredSuggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSuggestionPress(suggestion)}
          style={styles.suggestionItem}
        >
          <Text style={styles.suggestionText}>{suggestion}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
    marginTop: 10,
    padding: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionText: {
    fontSize: 14,
    color: "black",
  },
});

export default Suggestions;
