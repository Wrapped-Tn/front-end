import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Filters = ({ selectedFilters, removeFilter }) => {
  return (
    selectedFilters.some(filter => filter) && (
      <ScrollView horizontal style={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
        {selectedFilters.map((filter) =>
          filter ? (
            <View key={filter} style={styles.filterContainer}>
              <TouchableOpacity style={[styles.filter, styles.filterActive]}>
                <Text style={styles.filterTextActive}>{filter}</Text>
                <Ionicons
                  name="close-circle"
                  size={16}
                  color="rgb(220, 204, 222)"
                  style={styles.closeIcon}
                  onPress={() => removeFilter(filter)}
                />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  filterContainer: {
    marginRight: 10,
  },
  filter: {
    borderWidth: 1,
    borderColor: "#AD669E",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#AD669E",
    flexDirection: "row",
    alignItems: "center",
  },
  filterActive: {
    backgroundColor: "#AD669E",
  },
  filterTextActive: {
    color: "white",
  },
  closeIcon: {
    marginLeft: 5,
  },
});

export default Filters;
