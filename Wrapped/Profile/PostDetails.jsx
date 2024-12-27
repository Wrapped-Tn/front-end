import React, { useState, useRef , useEffect} from "react";
import { useRoute, useNavigation} from '@react-navigation/native';
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
import PostsGrid from "../WhatsHot/YouMayAlsoLike";



const PostDetails = ({ navigation, route }) => {
  const { article, articles, idUser } = route.params;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addToCartModalVisible, setAddToCartModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const commentsRef = useRef();
  const commentInputRef = useRef();
  const Port2 = 'http://192.168.31.82:3000'; // update this port

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${Port2}/comments/${article.id}`);
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (article?.id) {
      fetchComments();
    }
  }, [article?.id]);

  const handleLikePress = () => setLiked(!liked);
  const handleSavePress = () => setSaved(!saved);

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`${Port2}/comments/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            users_id: idUser,
            articles_id: article.id,
            content: newComment,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setComments(prev => [...prev, result.comment]);
          setNewComment('');
        } else {
          alert('Failed to add comment: ' + result.error);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('An error occurred: ' + error.message);
      }
    } else {
      alert('Comment content cannot be empty.');
    }
  };

  const handleLongPress = (commentId) => {
    Alert.alert(
      'Delete Comment',
      'Do you really want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteComment(commentId) },
      ]
    );
  };

  const deleteComment = async (commentId) => {
    try {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      const response = await axios.delete(`${Port2}/comments/${commentId}`);
      if (response.status === 200) {
        alert('Comment deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView ref={commentsRef}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#007BFF" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postContainer}>
          {article.images.length > 0 && (
            <PanGestureHandler>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => setShowTags(!showTags)}>
                  <Image
                    source={{ uri: article.images[currentImageIndex].image_url }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </PanGestureHandler>
          )}

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
              <FontAwesome name={liked ? "star" : "star-o"} size={24} color={liked ? "#FFED2B" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => commentsRef.current?.scrollToEnd({ animated: true })}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
              <Feather name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSavePress}>
              <MaterialIcons name={saved ? "bookmark" : "bookmark-border"} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postDetails}>
          <Text style={styles.postText}>{article.title}</Text>
        </View>

        <View style={styles.commentsContainer}>
          {comments.map((comment, idx) => (
            <TouchableOpacity key={idx} onLongPress={() => handleLongPress(comment.id)} style={styles.comment}>
              <Text>{comment.content}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.newCommentContainer}>
          <TextInput
            ref={commentInputRef}
            style={styles.input}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={addComment}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Select Size</Text>
            <TouchableOpacity onPress={() => setSelectedSize("Small")}>
              <Text>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedSize("Medium")}>
              <Text>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedSize("Large")}>
              <Text>Large</Text>
            </TouchableOpacity>

            <Text>Select Color</Text>
            <TouchableOpacity onPress={() => setSelectedColor("Red")}>
              <Text>Red</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedColor("Blue")}>
              <Text>Blue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAddToCartModalVisible(true)}>
              <Text>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addToCartModalVisible}
        onRequestClose={() => setAddToCartModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Item added to cart</Text>
            <TouchableOpacity onPress={() => setAddToCartModalVisible(false)}>
              <Text>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    marginLeft: 5,
  },
  postContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
  },
  tagText: {
    color: '#fff',
  },
  iconBar: {
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
  },
  postDetails: {
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
  },
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
  modalBackdrop: {
    position: 'absolute', 
    top: 0,               
    left: 0,              
    right: 0,             
    bottom: 100,            
    backgroundColor: "rgba(0, 0, 0, 0.5)",        
  },
  modalContainer: {
    position: 'absolute',    
    bottom: 0,               
    left: 0,                
    right: 0,               
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: -40,
  },
  pickerLabel2: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: -10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerOption: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOption: {
    borderColor: "#AD669E", 
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  addToCartButton: {
    backgroundColor: "#AD669E",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  seeMoreButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  seeCartButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  seeMoreText: {
    color: "#333",
    fontSize: 16,
  },
  seeCartText: {
    color: "white",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default PostDetails;
