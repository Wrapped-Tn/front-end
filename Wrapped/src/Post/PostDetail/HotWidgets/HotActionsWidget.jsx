import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, Fontisto, FontAwesome6,Ionicons } from '@expo/vector-icons';

const HotActionsWidget = ({ handleAddCart,handleComnt,showComnt }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSavePress = () => {
    setSaved(!saved);
  };

  return (
    <View style={styles.actionsContainer}>
      {/* Section Gauche - Icône Store */}
      <View style={styles.leftSection}>
      <TouchableOpacity style={styles.actionButtonLike} onPress={handleLikePress}>
          <AntDesign 
            name={liked ? "star" : "staro"} 
            size={24} 
            color={liked ? 'yellow' : 'white'} 
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonLike} onPress={handleComnt} >
        {!showComnt?<Ionicons name="chatbubble-outline" size={24} color="white" />:
        <Ionicons name="chatbubble-sharp" size={24} color="white" />}
          <Text style={styles.likeCount}>2</Text>
        </TouchableOpacity>
      </View>

      {/* Section Droite - Icônes Like et Save */}
      <View style={styles.rightSection}>
        {/* Like Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleAddCart}>
          <FontAwesome6 name="cart-shopping" size={24} color="white" />
        </TouchableOpacity>
        {/* Save Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleSavePress}>
          <Fontisto 
            name={saved ? "bookmark-alt" : "bookmark"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#636363AC',
    // borderRadius: 10,
    position: 'absolute',
    top: "42.5%",
    left: '2.5%',
    width: "100%",
    paddingHorizontal: 10,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 10,
    alignItems: 'center',
  },
  actionButtonLike: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  likeCount: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default HotActionsWidget;
