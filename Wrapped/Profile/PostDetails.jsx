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



const PostDetails = ({ navigation }) => {
  const route = useRoute();
  const { article, articles,idUser } = route.params;
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
  const [details, setDetails] = useState([]); 
  const [visibleItems, setVisibleItems] = useState(4);
  const commentsRef = useRef();
  const commentInputRef = useRef();
  const Port2 = 'http://192.168.31.82:3000';//update this port

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${Port2}/comments/${article.id}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
  
        const comments = await response.json();
        const sortedComments = comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by date (oldest to newest)
        setComments(sortedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    if (article?.id) {
      fetchComments();
    }
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
      // Optimistic UI update: Remove comment from the list immediately
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  
      // Delete request to the API
      const response = await axios.delete(Port2 + `/comments/` + commentId, {
        headers: { 'Content-Type': 'application/json' }, // Optional headers
        timeout: 10000, // Optional timeout (10 seconds)
      });
  
      if (response.status === 200) {
        alert('Comment deleted successfully');
      } else {
        alert('Comment not found');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
  
      // If the deletion failed, revert the optimistic update
      setComments(prevComments => [...prevComments]); // Revert to previous state
  
      alert('Failed to delete the comment. Please try again later.');
    }
  };
  

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
  const handleLikePress = () => setLiked(!liked);
  const handleSavePress = () => setSaved(!saved);

  const scrollToComments = () => {
    commentsRef.current?.scrollToEnd({ animated: true }); // Scroll to the bottom
    setTimeout(() => commentInputRef.current?.focus(), 300); // Delay to ensure the input gets focus
  };

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(Port2 + '/comments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            users_id: idUser, // Replace with the actual user ID
            articles_id: article.id, // Replace with the actual article ID
            content: newComment,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          const { comment } = result;
          console.log('====================================');
          console.log("result",result);
          console.log('====================================');
          setComments((prevComments) => [
            ...prevComments,
            result.comment
          ]);
  
          setNewComment('');
        } else {
          console.error('Error adding comment:', result.error);
          alert('Failed to add comment: ' + result.error);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        if (error.message.includes('NetworkError')) {
          alert('Network issue: Please check your internet connection.');
        } else {
          alert('An unexpected error occurred: ' + error.message);
        }
      }
    } else {
      alert('Comment content cannot be empty.');
    }
  };
  
  // Handle Add to Cart action

  const handleAddToCart = () => {
    setAddToCartModalVisible(true);
    setModalVisible(false);
  };
  
  const handleFinalAddToCart = () => {
    setModalVisible(false); 
    setAddToCartModalVisible(false);
    Alert.alert(
      'Item added to cart',
      "",
      [
        { text: 'See More Items', style: 'destructive',onPress: () => scrollToComments()  },
        { text: 'See Cart', style: 'destructive', onPress: () => navigation.navigate("myBag",{articles:articles}) },
      ],
      { cancelable: true }
    );
  };
  const handleSeeCart = () => {
    setModalVisible(false); 
  };
  
  // Handle "See More" button press (redirect to item details page)
  const handleSeeMore = () => {
    commentsRef.current?.scrollToEnd({ animated: true }); // Scroll to the bottom
    setTimeout(() => commentInputRef.current?.focus(), 300)
  };

  if (!details) {
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
                    style={[
                      styles.dot,
                      currentImageIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setModalVisible(true)} // Show modal when cart button is pressed
              >
                <Feather name="shopping-cart" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={handleSavePress}>
                <MaterialIcons
                  name={saved ? "bookmark" : "bookmark-border"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.postDetails}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: article.User.profile_picture_url }}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{article.User.full_name}</Text>
            </View>
            <Text style={styles.postText}>{article.title}</Text>
          </View>

          <View style={styles.commentsContainer}>
          {comments.map((comment, idx) => (
  <TouchableOpacity 
    key={idx} 
    style={styles.comment}
    onLongPress={() => handleLongPress(comment.id)} 
    delayLongPress={150} 
  >
    <Image
      source={{ uri: comment.User?.profile_picture_url || "" }}
      style={styles.commentProfileImage}
    />
    <View style={styles.commentDetails}>
      <Text style={styles.commentUser}>{comment.User?.full_name || "Me"}</Text>
      <Text style={styles.commentText}>{comment.content}</Text>
    </View>
  </TouchableOpacity>
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
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          <PostsGrid articles={articles} />
        </ScrollView>
        <Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    <View style={styles.modalBackdrop} />
  </TouchableWithoutFeedback>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Select Size and Color</Text>

    {/* Size selection */}
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>Size:</Text>
      <View style={styles.optionRow}>
        {["S", "M", "L"].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.pickerOption,
              selectedSize === size && styles.selectedOption,
            ]}
          >
            <Text style={styles.pickerOptionText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    {/* Color selection */}
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel2}>Color:</Text>
      <View style={styles.optionRow}>
        {["Red", "Blue", "Black"].map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            style={[
              styles.pickerOption,
              selectedColor === color && styles.selectedOption,
            ]}
          >
            <Text style={styles.pickerOptionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

 {/* Add to cart button */}
 <TouchableOpacity
      style={styles.addToCartButton}
      onPress={handleAddToCart}
    >
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
</Modal>

<Modal
  visible={addToCartModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setAddToCartModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setAddToCartModalVisible(false)}>
    <View style={styles.modalBackdrop} />
  </TouchableWithoutFeedback>
  <View style={styles.modalContainer}>
    {/* Article Category */}
    <Text style={styles.modalTitle}>{article.category}</Text>

    {/* Article Brand */}
    <Text style={styles.modalSubTitle}>{article.brand}</Text>

    {/* Display selected size, color, and price */}
    <Text style={styles.detailsText}>Size: {selectedSize}</Text>
    <Text style={styles.detailsText}>Color: {selectedColor}</Text>
    <Text style={styles.detailsText}>Price: ${article.price}</Text>

    {/* Add to cart button in this modal */}
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={handleFinalAddToCart}
    >
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
</Modal>
      </KeyboardAvoidingView>
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
