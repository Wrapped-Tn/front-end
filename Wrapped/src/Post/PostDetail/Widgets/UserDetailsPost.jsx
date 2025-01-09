import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const UserDetails = ({ caption, userName, userIcon, postDate }) => {
      const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <TouchableOpacity  onPress={()=>{navigation.navigate("VisitorProfilePage" )}}>
        <Image source={{ uri: userIcon }} style={styles.userIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.postDate}>Posted on {postDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    padding: 16,
    marginTop:"2%"
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.5,
    // elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  captionContainer: {
    marginTop: 10,
  },
  captionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserDetails;
