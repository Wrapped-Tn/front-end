import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native';

const PromoCodeInput = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const promoCodes = [
    { id: '1', discount: '10%', title: 'Personal offer', code: 'mypromocode2020', remaining: '6 days' },
    { id: '2', discount: '15%', title: 'Summer Sale', code: 'summer2020', remaining: '23 days' },
    { id: '3', discount: '22%', title: 'Personal offer', code: 'mypromocode2020', remaining: '6 days' },
  ];

  const selectPromoCode = (code) => {
    setPromoCode(code);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 20 }}>
      {/* Input */}
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <View style={styles.inputContainer}>
          <Text style={promoCode ? styles.inputText : styles.placeholderText}>
            {promoCode || 'Enter your promo code'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Promo Codes</Text>
            <FlatList
              data={promoCodes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.promoItem}>
                  <View style={styles.promoLeft}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  <View style={styles.promoMiddle}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.codeText}>{item.code}</Text>
                  </View>
                  <TouchableOpacity onPress={() => selectPromoCode(item.code)} style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
  },
  inputText: {
    fontSize: 16,
    color: 'black',
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  promoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  promoLeft: {
    width: 50,
    height: 50,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  promoMiddle: {
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  codeText: {
    fontSize: 12,
    color: 'gray',
  },
  applyButton: {
    backgroundColor: '#A45AA6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  closeButtonText: {
    color: '#A45AA6',
    fontWeight: 'bold',
  },
});

export default PromoCodeInput;
