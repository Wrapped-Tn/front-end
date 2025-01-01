import React from 'react';
import { View, Image, StyleSheet ,Text} from 'react-native';

const Recommendations = ({ items }) => {
  return (
    <View style={{marginBottom:"20%"}}>
        <Text>You May Also Like</Text>
    <View style={styles.container}>
      {items.map((item, index) => (
        <Image key={index} source={{ uri: item.image }} style={styles.image} />
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '48%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Recommendations;
