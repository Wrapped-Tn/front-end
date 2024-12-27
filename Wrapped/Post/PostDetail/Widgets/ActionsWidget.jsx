import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome,Octicons ,Fontisto,FontAwesome6, MaterialIcons  } from '@expo/vector-icons';

const ActionsWidget = ({handleAddCart}) => {
  // State to manage the like, save, and other actions
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleSavePress = () => {
    setSaved(!saved);
  };


  return (
    <View style={styles.actionsContainer}>
      {/* Like Button (Star) */}
      <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
        <AntDesign 
          name={liked ? "star" : "staro"} 
          size={24} 
          color={liked ? 'yellow' : 'white'} 
        />
      </TouchableOpacity>

      {/* Comment Button (Chat Bubble) */}
      <TouchableOpacity style={styles.actionButton}>
      <Fontisto name="commenting" size={24} color="white" />  
      </TouchableOpacity>
      {/* More Options Button (Ellipsis) */}
      <TouchableOpacity style={styles.actionButton}>
        <FontAwesome 
          name="ellipsis-h" 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>

      {/* Shopping Cart Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleAddCart}>
      <FontAwesome6 name="cart-shopping" size={24} color="white" />
      </TouchableOpacity>

      {/* Save Button (Save Icon) */}
      <TouchableOpacity style={styles.actionButton} onPress={handleSavePress}>
      <Fontisto name= {saved?"bookmark-alt":"bookmark"} size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
    backgroundColor: '#636363AC',
    borderRadius: 10,
    position: 'absolute',
    top: "32%",
    width: "100%",
    marginHorizontal: 10,
  },
  actionButton: {
    padding: 10,
  },
  
});

export default ActionsWidget;
