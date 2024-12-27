import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

const comments = [
  {
    id: '1',
    user: '🐱Ll',
    text: 'The real death is that no one in the world remembers you.',
    time: 'before 2 min',
    avatar: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    role: '',
  },
  {
    id: '2',
    user: '🌸Publisher',
    text: 'The real death is that no one in the world remembers you.',
    time: 'before 2 min',
    avatar: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    role: 'Publisher',
  },
  {
    id: '3',
    user: 'Pete',
    text: 'The real death is that no one in the world remembers you.',
    time: 'before 2 min',
    avatar: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    role: '',
  },
  {
    id: '3',
    user: 'Pete',
    text: 'The real death is that no one in the world remembers you.',
    time: 'before 2 min',
    avatar: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    role: '',
  },
  {
    id: '3',
    user: 'Pete',
    text: 'The real death is that no one in the world remembers you.',
    time: 'before 2 min',
    avatar: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
    role: '',
  },
];

const CommentWidget = () => {
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.header}>
          <Text style={styles.userName}>{item.user}</Text>
          {item.role && <Text style={styles.roleBadge}>{item.role}</Text>}
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="comment..."
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* Comments List */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  roleBadge: {
    backgroundColor: '#e066ff',
    color: '#fff',
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default CommentWidget;
