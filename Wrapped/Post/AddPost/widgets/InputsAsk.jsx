import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Select, Box, CheckIcon, Center, NativeBaseProvider } from "native-base";
import iconAddImg from '../../../assets/addimg.png'
import pencilicon from '../../../assets/pencil.png'

const InputsAsk = ({ description, setDescription, compositions, setCompositions, occasion, setOccasion }) => {
  const [selectedCompositions, setSelectedCompositions] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const handleCompositionChange = (item) => {
    setSelectedCompositions((prevState) =>
      prevState.includes(item) ? prevState.filter((i) => i !== item) : [...prevState, item]
    );
  };

  const handleOccasionChange = (item) => {
    setSelectedOccasions((prevState) =>
      prevState.includes(item) ? prevState.filter((i) => i !== item) : [...prevState, item]
    );
  };
  const Example = ({ text, selectedValue, onValueChange, items }) => {
    return (
      <Center style={styles.boxContainer}>
        <Text style={styles.headerText}>{text}</Text>
        <Box style={styles.inputContainer}>
          <Image
            source={iconAddImg}
            style={styles.iconImage}
          />
          <Select
            selectedValue={selectedValue}
            minWidth="300"
            placeholder="Select an option"
            _selectedItem={{
              bg: "blue.100",
              borderRadius: 5,
              endIcon: <CheckIcon size="5" color="blue.500" />,
            }}
            style={styles.selectInput}
            onValueChange={onValueChange}
          >
            {items.map((item, index) => (
              <Select.Item
                key={index}
                label={item.label}
                value={item.value}
                startIcon={
                  <Image
                    source={{ uri: item.url }}
                    style={styles.itemIcon}
                  />
                }
              />
            ))}
          </Select>
        </Box>
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            {selectedValue.length > 0
              ? `Selected: ${selectedValue.join(", ")}`
              : "No options selected"}
          </Text>
        </View>
      </Center>
    );
  };

  // Liste des compositions et occasions avec leurs options respectives
  const compositionsList = [
    { label: "T-shirt", value: "tshirt", url:"https://www.emoji.family/api/emojis/👕/fluent/png" },
    { label: "Chemise", value: "shirt", url:"https://www.emoji.family/api/emojis/👔/fluent/png" },
    { label: "Pantalon", value: "pants", url:"https://www.emoji.family/api/emojis/👖/fluent/png" },
    { label: "Jean", value: "jeans", url:"https://www.emoji.family/api/emojis/👖/fluent/png" },
    { label: "Short", value: "short", url:"https://www.emoji.family/api/emojis/🩳/fluent/png" },
    { label: "Jupe", value: "skirt", url:"https://www.emoji.family/api/emojis/👗/fluent/png" },
    { label: "Robe", value: "dress", url:"https://www.emoji.family/api/emojis/👗/fluent/png" },
    { label: "Blouse", value: "blouse", url:"https://www.emoji.family/api/emojis/👚/fluent/png" },
    { label: "Pull", value: "sweater", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Manteau", value: "coat", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Veste", value: "jacket", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Cardigan", value: "cardigan", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Sweat", value: "hoodie", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Veste en cuir", value: "leather_jacket", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Parka", value: "parka", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Manteau en laine", value: "wool_coat", url:"https://www.emoji.family/api/emojis/🧥/fluent/png" },
    { label: "Chaussettes", value: "socks", url:"https://www.emoji.family/api/emojis/🧦/fluent/png" },
    { label: "Chaussures", value: "shoes", url:"https://www.emoji.family/api/emojis/👟/fluent/png" },
    { label: "Baskets", value: "sneakers", url:"https://www.emoji.family/api/emojis/👟/fluent/png" },
    { label: "Bottes", value: "boots", url:"https://www.emoji.family/api/emojis/👢/fluent/png" },
    { label: "Sandales", value: "sandals", url:"https://www.emoji.family/api/emojis/👡/fluent/png" },
    { label: "Escarpins", value: "heels", url:"https://www.emoji.family/api/emojis/👠/fluent/png" }
];


  const occasionsList = [
    { label: "Casual", value: "casual" },
    { label: "Business", value: "business" },
    { label: "Sport", value: "sport" },
    { label: "Party", value: "party" },
    { label: "Wedding", value: "wedding" },
    { label: "Beach", value: "beach" },
    { label: "Evening", value: "evening" },
    { label: "Vacation", value: "vacation" }
  ];

  return (
    <NativeBaseProvider>
          <View style={styles.textAreaContainer}>
        <View style={styles.textAreaHeader}>
          <Image
            source={pencilicon}
            style={styles.headerIcon}
          />
          <Text style={styles.label}>Describe your fit (optional)</Text>
        </View>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Describe your fit..."
          placeholderTextColor="#A0AEC0"
          multiline={true}
          numberOfLines={4}
          maxLength={280}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

        <Example
          text={"What are the compositions of your outfit?"}
          selectedValue={selectedCompositions}
          onValueChange={itemValue =>
            setSelectedCompositions(prev =>
              prev.includes(itemValue)
                ? prev.filter(value => value !== itemValue)
                : [...prev, itemValue]
            )
          }
          items={compositionsList}
        />

        <Example
          text={"For what occasion is your outfit?"}
          selectedValue={selectedOccasions}
          onValueChange={itemValue =>
            setSelectedOccasions(prev =>
              prev.includes(itemValue)
                ? prev.filter(value => value !== itemValue)
                : [...prev, itemValue]
            )
          }
          items={occasionsList}
        />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    maxWidth: 400,
    padding: 15,
    marginVertical: 20,
    borderRadius: 12,
    backgroundColor: '#F9FAFC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  boxContainer2: {
    maxWidth: 400,
    borderColor: '#C8C8C86D',
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  select: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F08DB7',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    marginLeft: 10,
  },
  textAreaContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textAreaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: 'top', // Assure un alignement correct du texte
    fontSize: 14,
    color: '#2D3748',
    backgroundColor: '#F9FAFC',
    borderRadius: 8,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  iconImage: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  selectInput: {
    fontSize: 16,
    color: '#2C5282',
    flex: 1,
  },
  itemIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
    borderRadius: 3,
  },
  selectedContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
});

export default InputsAsk;
