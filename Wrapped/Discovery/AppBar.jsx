import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <Ionicons name="eye" marginTop={25} size={24} color="black" />
      <Text style={styles.appBarTitle}>Discovery</Text>
      <Ionicons name="eye" marginTop={25} size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    width: "110%",
    height: 90,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default AppBar;
