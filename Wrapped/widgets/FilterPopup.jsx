import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import { useNavigation } from "@react-navigation/native";



const FilterPopup = ({ isPopupVisible, setIsPopupVisible }) => {
  const closePopup = () => setIsPopupVisible(false);
  const [selectedCategory, setSelectedCategory] = useState('Choose Category');
  const [selectedColor, setSelectedColor] = useState('Choose Color');
  const [selectedBrand, setSelectedBrand] = useState('Choose Brand');
  const [selectedOccasion, setSelectedOccasion] = useState('Choose Occasion');
  const [selectedItem, setSelectedItem] = useState('Choose Item');
  const [selectedProFilter, setSelectedProFilter] = useState('Pro Filters');
  const navigation = useNavigation();


  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const categories = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Children', value: 'children' },
  ];

  const colors = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
  ];

  const brands = [
    { label: 'Brand 1', value: 'Brand 1' },
    { label: 'Brand 2', value: 'Brand 2' },
    { label: 'Brand 3', value: 'Brand 3' },
  ];

  const occasions = [
    { label: 'Casual', value: 'casual' },
    { label: 'Formal', value: 'formal' },
    { label: 'Party', value: 'party' },
    { label: 'Wedding', value: 'wedding' },
  ];

  const items = [
    { label: 'Skirt', value: 'skirt' },
    { label: 'Shirt', value: 'shirt' },
    { label: 'Pants', value: 'pants' },
    { label: 'Dress', value: 'dress' },
  ];

  const proFilters = [
    { label: 'Morphology', value: 'morphology' },
    { label: 'Skin Tone', value: 'skin tone' },
  ];

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setModalVisible(false);
  };

  const handleColorSelect = (value) => {
    setSelectedColor(value);
    setModalVisible(false);
  };

  const handleBrandSelect = (value) => {
    setSelectedBrand(value);
    setModalVisible(false);
  };

  const handleOccasionSelect = (value) => {
    setSelectedOccasion(value);
    setModalVisible(false);
  };

  const handleItemSelect = (value) => {
    setSelectedItem(value);
    setModalVisible(false);
  };

  const handleProFilterSelect = (value) => {
    setSelectedProFilter(value);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = (type) => {
    setCurrentModal(type);
    setModalVisible(true);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={closePopup}
    >
      <TouchableWithoutFeedback onPress={closePopup}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.popup}>
              <Text style={styles.title}>Choose Filters</Text>

              <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => openModal('category')}>
                  <Text style={styles.buttonText}>{selectedCategory}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openModal('color')}>
                  <Text style={styles.buttonText}>{selectedColor}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => openModal('brand')}>
                  <Text style={styles.buttonText}>{selectedBrand}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openModal('occasion')}>
                  <Text style={styles.buttonText}>{selectedOccasion}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => openModal('item')}>
                  <Text style={styles.buttonText}>{selectedItem}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openModal('proFilter')}>
                  <Text style={styles.buttonText}>{selectedProFilter}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Select Price Range</Text>

                <View style={styles.sliderContainer}>
                  <Text style={styles.priceText}>Min: ${minPrice}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1000}
                    step={10}
                    value={minPrice}
                    onValueChange={(value) => setMinPrice(value)}
                  />
                </View>

                <View style={styles.sliderContainer}>
                  <Text style={styles.priceText}>Max: ${maxPrice}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1000}
                    step={10}
                    value={maxPrice}
                    onValueChange={(value) => setMaxPrice(value)}
                  />
                </View>

                <Text style={styles.priceText}>Price Range: ${minPrice} - ${maxPrice}</Text>
              </View>

              <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closePopup}
              >
                <TouchableWithoutFeedback onPress={closePopup}>
                  <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Select {currentModal}</Text>
                      <View style={styles.modalOptions}>
                        {currentModal === 'category' &&
                          categories.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleCategorySelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        {currentModal === 'color' &&
                          colors.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleColorSelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        {currentModal === 'brand' &&
                          brands.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleBrandSelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        {currentModal === 'occasion' &&
                          occasions.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleOccasionSelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        {currentModal === 'item' &&
                          items.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleItemSelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                        {currentModal === 'proFilter' &&
                          proFilters.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.modalOption}
                              onPress={() => handleProFilterSelect(option.value)}
                            >
                              <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

              <TouchableOpacity style={styles.pinkButton} onPress={() => {
               navigation.navigate("descovery", {
                selectedCategory: selectedCategory !== 'Choose Category' ? selectedCategory : '',
                selectedColor: selectedColor !== 'Choose Color' ? selectedColor : '',
                selectedBrand: selectedBrand !== 'Choose Brand' ? selectedBrand : '',
                selectedOccasion: selectedOccasion !== 'Choose Occasion' ? selectedOccasion : '',
                selectedItem: selectedItem !== 'Choose Item' ? selectedItem : '',
                selectedProFilter: selectedProFilter !== 'Pro Filters' ? selectedProFilter : ''
              });
            closePopup()
          }}>
                <Text style={styles.pinkButtonText}>Search</Text>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '100%',
    height: 610,
    backgroundColor: 'white',
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '45%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  priceContainer: {
    marginTop: 20,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  priceText: {
    fontSize: 16,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalOptions: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
  pinkButton: {
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  pinkButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FilterPopup;
