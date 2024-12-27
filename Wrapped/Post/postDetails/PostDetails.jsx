import React, { useState, useRef, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import axios from "axios";
import { Port } from "../../Port";  // Make sure to update this path if needed.

const PostDetails = ({ navigation }) => {
  const route = useRoute();
  const { article, articles } = route.params;
  const [showTags, setShowTags] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [addToCartModalVisible, setAddToCartModalVisible] = useState(false); 
  const [selectedSize, setSelectedSize] = useState(""); 
  const [selectedColor, setSelectedColor] = useState(""); 

  const commentsRef = useRef();
  const commentInputRef = useRef();
  const Port2 = 'http://192.168.1.14:3000'; // Update this port

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${Port2}/comments/${article.id}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const comments = await response.json();
        const sortedComments = comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setComments(sortedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (article?.id) fetchComments();
  }, [article?.id]);

  const handleLongPress = (commentId) => {
    Alert.alert(
      'Delete Comment',
      'Do you really want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteComment(commentId) },
      ],
      { cancelable: true }
    );
  };

  const deleteComment = async (commentId) => {
    try {
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      const response = await axios.delete(`${Port2}/comments/${commentId}`);
      if (response.status === 200) {
        alert('Comment deleted successfully');
      } else {
        alert('Comment not found');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete the comment. Please try again later.');
    }
  };

  const handleImagePress = () => setShowTags(!showTags);

  const handleSwipe = ({ nativeEvent }) => {
    if (article.images.length === 0) return;
    if (nativeEvent.translationX < -50) {
      setCurrentImageIndex(prev => (prev + 1) % article.images.length);
    } else if (nativeEvent.translationX > 50) {
      setCurrentImageIndex(prev => (prev - 1 + article.images.length) % article.images.length);
    }
  };

  const handleLikePress = () => setLiked(!liked);
  const handleSavePress = () => setSaved(!saved);

  const scrollToComments = () => {
    commentsRef.current?.scrollToEnd({ animated: true });
    setTimeout(() => commentInputRef.current?.focus(), 300);
  };

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`${Port2}/comments/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            users_id: 1, // Replace with actual user ID
            articles_id: article.id, // Replace with actual article ID
            content: newComment,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setComments(prevComments => [...prevComments, result.comment]);
          setNewComment('');
        } else {
          alert('Failed to add comment: ' + result.error);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Error: ' + error.message);
      }
    } else {
      alert('Comment content cannot be empty.');
    }
  };

  const handleAddToCart = () => {
    setAddToCartModalVisible(true);
    setModalVisible(false);
  };

  const handleFinalAddToCart = () => {
    setModalVisible(false);
    setAddToCartModalVisible(false);
    Alert.alert(
      'Item added to cart',
      '',
      [
        { text: 'See More Items', style: 'cancel' },
        { text: 'See Cart', style: 'destructive', onPress: () => handleSeeCart() },
      ],
      { cancelable: true }
    );
  };

  const handleSeeCart = () => setModalVisible(false);

  if (!article || !comments) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post details not available.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView ref={commentsRef}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#007BFF" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>

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
                <Text>No images available</Text>
              )}
            </GestureHandlerRootView>

            {showTags && (
              <View style={styles.tagContainer}>
                {["Prada - $250", "Gucci - $180", "Kenzo - $300"].map((tag, idx) => (
                  <TouchableOpacity key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.iconBar}>
              <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
                <FontAwesome
                  name={liked ? "star" : "star-o"}
                  size={24}
                  color={liked ? "#FFED2B" : "black"}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={scrollToComments}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>

              <View style={styles.imageIndicator}>
                {article.images.map((_, index) => (
                  <View
                    key={index}
                    style={[styles.dot, currentImageIndex === index ? styles.activeDot : styles.inactiveDot]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setModalVisible(true)}
              >
                <Feather name="shopping-cart" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={handleSavePress}>
                <MaterialIcons
                  name={saved ? "bookmark" : "bookmark-border"}
                  size={24}
                  color={saved ? "#FFED2B" : "black"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.commentSection}>
              <Text style={styles.commentTitle}>Comments</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                ref={commentInputRef}
                onSubmitEditing={addComment}
              />
              {comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <Text style={styles.commentAuthor}>{comment.username}</Text>
                  <Text style={styles.commentText}>{comment.content}</Text>
                  <TouchableOpacity onLongPress={() => handleLongPress(comment.id)}>
                    <Text style={styles.deleteComment}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text>Choose Size and Color</Text>
                <View style={styles.modalControls}>
                  <View style={styles.dropdown}>
                    <Text>Size: {selectedSize}</Text>
                  </View>
                  <View style={styles.dropdown}>
                    <Text>Color: {selectedColor}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddToCart}
                >
                  <Text>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  postContainer: {
    padding: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 14,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  imageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 2,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  inactiveDot: {
    backgroundColor: '#bbb',
  },
  commentSection: {
    marginTop: 20,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  comment: {
    marginTop: 10,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
  },
  deleteComment: {
    fontSize: 12,
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalControls: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default PostDetails;
