import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

const SizeSelectorPopup = ({ visible, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <Text style={styles.title}>Select size</Text>
              <View style={styles.sizeContainer}>
                {sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.selectedSizeButton,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.infoRow}>
                <Text style={styles.infoText}>Size info</Text>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton} onPress={onClose}>
                <Text style={styles.addToCartText}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  sizeButton: {
    width: width * 0.2,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#E8D7EC',
    borderColor: '#A45AA6',
  },
  sizeText: {
    fontSize: 16,
    color: '#000',
  },
  selectedSizeText: {
    color: '#A45AA6',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
  addToCartButton: {
    backgroundColor: '#A45AA6',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SizeSelectorPopup;
