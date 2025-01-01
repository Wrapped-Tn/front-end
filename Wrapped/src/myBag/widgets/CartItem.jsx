import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For three-dot menu icon

const CartItem = ({ image, title, color, size, unitPrice }) => {
  const [quantity, setQuantity] = useState(1); // Initial quantity
  const [modalVisible, setModalVisible] = useState(false);

  // Function to calculate the total price
  const totalPrice = quantity * unitPrice;

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <View style={styles.container}>
      {/* Modal for displaying details */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
      <Image source={{ uri: image }} style={styles.imagepop} />
      <View style={{flexDirection:"row",justifyContent: 'space-between',marginBottom:10}}>
            <View >
      <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
            <Text style={styles.modalText}>Title: {title}</Text>
            <Text style={styles.modalText}>Color: {color}</Text>
            <Text style={styles.modalText}>Brand: {size}</Text>
            <Text style={styles.modalText}>description: {size}</Text>
            <Text style={styles.modalText}>Status: {size}</Text>
            
            </View>
            <View>
            <Text style={styles.modalText}>size</Text>
            {sizes.map(e=>(
                
                <Text key={e} style={styles.modalTextsize}>{e}</Text>
            ))}
            </View>
      </View>
      <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
      <Text style={styles.modalText}>Price per unit:</Text>
      <Text style={styles.modalText}>${unitPrice}</Text>
      </View>
<TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>Color: {color} | Size: {size}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Three-dot menu */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
        <MaterialIcons name="more-vert" size={24} color="gray" />
      </TouchableOpacity>

      {/* Price */}
      <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  imagepop: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A45AA6',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalTextsize: {
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 15,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
  },
  closeButton: {
    backgroundColor: '#A45AA6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItem;
