import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FooterWithConcaveShape from './Footer'; 

const LayoutWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {children} 
      </ScrollView>
      <FooterWithConcaveShape /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',  
  },
  scrollViewContainer: {
    paddingBottom: 80, 
  },
});

export default LayoutWrapper;
