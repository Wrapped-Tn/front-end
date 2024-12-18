import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import PostsGrid from "../WhatsHot/YouMayAlsoLike";

// Sample data for the articles
const sampleData = [
  { id: '1', title: 'Article 1', color: 'Black', size: 'M', price: 25.00, brand: 'Brand A', image: 'https://via.placeholder.com/100' },
  { id: '2', title: 'Article 2', color: 'Red', size: 'L', price: 30.00, brand: 'Brand B', image: 'https://via.placeholder.com/100' },
  { id: '3', title: 'Article 3', color: 'Blue', size: 'S', price: 20.00, brand: 'Brand C', image: 'https://via.placeholder.com/100' },
];

// Sample promo codes
const promoCodes = [
  { id: '1', image: 'https://via.placeholder.com/50', title: 'Discount 10%', code: 'DISCOUNT10' },
  { id: '2', image: 'https://via.placeholder.com/50', title: 'Free Shipping', code: 'FREESHIP' },
  { id: '3', image: 'https://via.placeholder.com/50', title: 'Seasonal Sale', code: 'SEASONSALE' },
];

const MyBag = () => {
  const route = useRoute();
  const { articles } = route.params;
  const [quantities, setQuantities] = useState({
    '1': 1,
    '2': 1,
    '3': 1,
  });

  const [promoCode, setPromoCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility

  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleApplyPromo = (code) => {
    setPromoCode(code);
    setModalVisible(false); // Close the modal when the promo code is applied
  };

  const renderItem = ({ item }) => (
    <View style={styles.article}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.smallText}>Color: <Text style={styles.blackText}>{item.color}</Text></Text>
          <Text style={styles.smallText}>Size: <Text style={styles.blackText}>{item.size}</Text></Text>
        </View>
        <Text style={styles.smallText}>Brand: <Text style={styles.blackText}>{item.brand}</Text></Text>
        <View style={styles.row}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantities[item.id]}</Text>
            <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${(item.price * quantities[item.id]).toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>...</Text>
      </TouchableOpacity>
    </View>
  );

  // Calculate total price
  const totalAmount = sampleData.reduce(
    (total, item) => total + item.price * quantities[item.id],
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>My Bag</Text>
      </View>

      {/* ScrollView to make everything scrollable */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FlatList
          data={sampleData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Promo code input */}
        <View style={styles.promoCodeContainer}>
          <TextInput
            style={styles.promoCodeInput}
            placeholder="Enter your promo code"
            placeholderTextColor="#888"
            value={promoCode}
            onFocus={() => setModalVisible(true)} // Show modal when the input is focused
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.promoCodeButton}>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Total amount */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Total Amount</Text>
          <Text style={styles.totalPrice}>${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>You May Also Like</Text>
        <PostsGrid articles={articles} />
      </ScrollView>

      {/* Modal for Promo Codes */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Promo code input inside the modal */}
            <TextInput
              style={styles.promoCodeInput}
              placeholder="Enter your promo code"
              placeholderTextColor="#888"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <FlatList
              data={promoCodes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.promoCodeItem}>
                  <Image source={{ uri: item.image }} style={styles.promoImage} />
                  <View style={styles.promoInfo}>
                    <Text style={styles.promoTitle}>{item.title}</Text>
                    <Text style={styles.promoCode}>{item.code}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => handleApplyPromo(item.code)}
                  >
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    backgroundColor: '#fff',
    paddingTop: 35,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  flatListContent: {
    paddingTop: 20,
  },
  article: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  smallText: {
    fontSize: 12,
    color: '#888',
  },
  blackText: {
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deleteText: {
    fontSize: 24,
    color: '#888',
  },

  // New styles for promo code input and checkout button
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  promoCodeInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  promoCodeButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
  },
  checkoutButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  promoCodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  promoImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  promoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  promoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  promoCode: {
    fontSize: 14,
    color: '#888',
  },
  applyButton: {
    backgroundColor: 'purple',
    width : 80,
    padding: 10,
    paddingLeft:22,
    borderRadius: 10,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyBag;
