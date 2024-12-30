import React from 'react';
import { ScrollView, View, Text,StyleSheet } from 'react-native';
const PostDetails = ({ details }) => (
    <View style={styles.postDetails}>
      <View style={styles.userInfo}>
        <Image source={{ uri: details.images }} style={styles.profileImage} />
        <Text style={styles.userName}>{details.User.full_name}</Text>
      </View>
      <Text style={styles.postText}>{details.title}</Text>
    </View>
  );
  

  const styles = StyleSheet.create({ postDetails: {
    marginTop: 15,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },})
export default PostDetails;
  