
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const ImageSlider = ({ article }) => {
  const handleImagePress = () => setShowTags(!showTags);

  const handleSwipe = ({ nativeEvent }) => {
    if (article.images.length === 0) return; // Prevent swipe if no images

    if (nativeEvent.translationX < -50) {
      setCurrentImageIndex((prev) => (prev + 1) % article.images.length); 
      console.log('====================================');
      console.log("Swipe left");
      console.log('====================================');
    } else if (nativeEvent.translationX > 50) {
      setCurrentImageIndex((prev) => (prev - 1 + article.images.length) % article.images.length);
      console.log('====================================');
      console.log("Swipe right");
      console.log('====================================');
    }
  };
  const imageSource = images && images.length > 0 ? images[currentImageIndex] : '';

  return (
    <View style={styles.postContainer}>
    <GestureHandlerRootView style={{ flex: 1 }}>
{article.images.length > 0 ? (
  <PanGestureHandler onGestureEvent={handleSwipe}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: article.images[currentImageIndex]?.image_url || '' }}
          style={{ width: 300, height: 300, resizeMode: 'cover' }}
        />
      </TouchableOpacity>
    </View>
  </PanGestureHandler>
) : (
  <Text>No images available</Text> // Display a message when no images are available
)}
</GestureHandlerRootView>

      {showTags && (
        <View style={styles.tagContainer}>
          {["Prada - $250", "Gucci - $180", "Kenzo - $300"].map(
            (tag, idx) => (
              <TouchableOpacity key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}

   
    </View>

)}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  emptyImageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
});

export default ImageSlider;

