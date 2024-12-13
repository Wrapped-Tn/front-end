import React from 'react';
import { ScrollView, View, Text,StyleSheet } from 'react-native';
const IconBar = ({ liked, saved, handleLikePress, handleSavePress, scrollToComments, currentImageIndex, images, setModalVisible }) => (
    <View style={styles.iconBar}>
      <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
        <FontAwesome name={liked ? "star" : "star-o"} size={24} color={liked ? "#FFED2B" : "black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={scrollToComments}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.imageIndicator}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentImageIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
        <Feather name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleSavePress}>
        <MaterialIcons name={saved ? "bookmark" : "bookmark-border"} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
  

  const styles = StyleSheet.creat({  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  imageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },})

export default IconBar;
  