import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

const SizeSelectorPopup = ({ visible, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];
  const Article = ['T-shirt', 'Pants', 'Shoes', 'Hat', 'Jacket'];
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <Text style={styles.title}>Select Article</Text>
              <View style={styles.sizeContainer}>
                {Article.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedArticle === size && styles.selectedSizeButton,
                    ]}
                    onPress={() => setSelectedArticle(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedArticle === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* ////////////////////////////////////////// */}
              <Text style={styles.title}>Select Color</Text>
              <View style={styles.sizeContainer}>
                {colors.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedColor === size && styles.selectedSizeButton,
                    ]}
                    onPress={() => setSelectedColor(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedColor === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* ////////////////////////////////////////// */}
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
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setSelectedQuantity((prev) => Math.max(1, (prev || 1) - 1))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{selectedQuantity || 1}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setSelectedQuantity((prev) => (prev || 1) + 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  quantityLabel: {
    fontSize: 16,
    color: '#000',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8D7EC',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  counterText: {
    fontSize: 20,
    color: '#A45AA6',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  
});

export default SizeSelectorPopup;
