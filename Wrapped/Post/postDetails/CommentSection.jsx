import React from 'react';
import { ScrollView, View, Text,StyleSheet } from 'react-native';
const CommentSection = ({ comments, newComment, setNewComment, addComment, commentsRef, commentInputRef }) => (
    <View style={styles.commentsContainer}>
      {comments.map((comment, idx) => (
        <View key={idx} style={styles.comment}>
          <Image source={{ uri: comment.profile_image }} style={styles.commentProfileImage} />
          <View style={styles.commentDetails}>
            <Text style={styles.commentUser}>{comment.userName}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        </View>
      ))}
      <View style={styles.commentInputContainer}>
        <TextInput
          ref={commentInputRef}
          placeholder="Comment..."
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
        />
        <TouchableOpacity style={styles.commentButton} onPress={addComment}>
          <Ionicons name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );


  const styles = StyleSheet.create({
    commentsContainer: {
        marginTop: 10,
      },
      comment: {
        flexDirection: 'row',
        marginVertical: 5,
      },
      commentProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      commentDetails: {
        flex: 1,
      },
      commentUser: {
        fontWeight: 'bold',
      },
      commentText: {
        color: '#555',
      },
      commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 5,
      },
      commentInput: {
        flex: 1,
        padding: 5,
      },
      commentButton: {
        marginLeft: 5,
      },

  })
  
export default CommentSection;
  