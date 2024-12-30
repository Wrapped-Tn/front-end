import React from 'react';
import { ScrollView, View, Text,StyleSheet } from 'react-native';
const CartModal = ({ modalVisible, setModalVisible, selectedSize, setSelectedSize, selectedColor, setSelectedColor, handleAddToCart }) => (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select Size and Color</Text>
  
        {/* Size selection */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Size:</Text>
          <TouchableOpacity onPress={() => setSelectedSize("S")}>
            <Text style={styles.pickerOption}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedSize("M")}>
            <Text style={styles.pickerOption}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedSize("L")}>
            <Text style={styles.pickerOption}>L</Text>
          </TouchableOpacity>
        </View>
  
        {/* Color selection */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Color:</Text>
          <TouchableOpacity onPress={() => setSelectedColor("Red")}>
            <Text style={styles.pickerOption}>Red</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedColor("Blue")}>
            <Text style={styles.pickerOption}>Blue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedColor("Black")}>
            <Text style={styles.pickerOption}>Black</Text>
          </TouchableOpacity>
        </View>
  
        {/* Add to cart button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
  
  const styles = StyleSheet.create(
  {
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
      },
      pickerContainer: {
        marginBottom: 15,
      },
      pickerLabel: {
        fontSize: 16,
        marginBottom: 5,
      },
      pickerOption: {
        fontSize: 16,
        color: "#007BFF",
        marginVertical: 5,
      },
      addToCartButton: {
        backgroundColor: "pink",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
      },
      addToCartText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
      },
  })
  

export default CartModal;
  