import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
//  Tags widget
const TagsWidget = ({ tags }) => {
    return (
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    );
  };
  const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      tag: {
        backgroundColor: '#AD669E',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
      },
      tagText: {
        color: '#FFFFFF',
      },
});
  export default TagsWidget;