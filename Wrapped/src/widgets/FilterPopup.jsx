import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
  const [dropVisible, setDropVisible] = useState(false);
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


  const openModal = (type) => {
    setCurrentModal(type);
    setDropVisible(!dropVisible);
  };

  const DropDown = ({ current,selected,setSelected}) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dropDownContainer}
      >
        {current.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionContainer,
              selected === option.label && styles.selectedOption, // Ajouter la couleur de sélection
            ]}
            onPress={() => {
              setSelected(option.label); // Mettre à jour la catégorie sélectionnée
              // setDropVisible(false); // Fermer le menu déroulant après la sélection
            }}
          >
            <Text
              style={[
                styles.optionText,
                selected === option.label && styles.selectedText, // Appliquer une couleur spécifique au texte
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
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
              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('category')}>
                  <Text style={styles.buttonText}>{selectedCategory || 'Select Category'}</Text>
                  {dropVisible && currentModal === 'category' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'category' && <DropDown current={categories} selected={selectedCategory} setSelected={setSelectedCategory}  />}
              </View>

              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('color')}>
                  <Text style={styles.buttonText}>{selectedColor || 'Select Color'}</Text>
                  {dropVisible && currentModal === 'color' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'color' && <DropDown current={colors} selected={selectedColor} setSelected={setSelectedColor} />}
              </View>

              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('brand')}>
                  <Text style={styles.buttonText}>{selectedBrand || 'Select Brand'}</Text>
                  {dropVisible && currentModal === 'brand' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'brand' && <DropDown current={brands} selected={selectedBrand} setSelected={setSelectedBrand} />}
              </View>

              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('occasion')}>
                  <Text style={styles.buttonText}>{selectedOccasion || 'Select Occasion'}</Text>
                  {dropVisible && currentModal === 'occasion' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'occasion' && <DropDown current={occasions} selected={selectedOccasion} setSelected={setSelectedOccasion} />}
              </View>

              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('item')}>
                  <Text style={styles.buttonText}>{selectedItem || 'Select Item'}</Text>
                  {dropVisible && currentModal === 'item' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'item' && <DropDown current={items} selected={selectedItem} setSelected={setSelectedItem} />}
              </View>

              <View style={{marginTop:10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => openModal('proFilter')}>
                  <Text style={styles.buttonText}>{selectedProFilter || 'Select Pro Filter'}</Text>
                  {dropVisible && currentModal === 'proFilter' ? (
                    <FontAwesome name="caret-down" size={24} color="black" />
                  ) : (
                    <FontAwesome name="caret-right" size={24} color="black" />
                  )}
                </TouchableOpacity>
                {dropVisible && currentModal === 'proFilter' && <DropDown current={proFilters} selected={selectedProFilter} setSelected={setSelectedProFilter} />}
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Select Price Range</Text>


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
  dropDownContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  popup: {
    width: '100%',
    height: 650,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  priceContainer: {
    marginTop: 30,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50',
  },
  sliderContainer: {
    marginBottom: 25,
  },
  priceText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2980b9',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  pinkButton: {
    backgroundColor: '#AD669E',
    padding: 14,
    borderRadius: 30,
    marginTop: 25,
    alignItems: 'center',
  },
  pinkButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  selectedOption: {
    backgroundColor: '#FFB6C8', // Couleur de fond sélectionnée
  },
  selectedText: {
    color: '#fff', // Couleur du texte sélectionné
  },
});


export default FilterPopup;
