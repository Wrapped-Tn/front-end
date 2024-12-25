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
    <Center style={styles.boxContainer2}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{text}</Text>
      <Box style={styles.boxContainer}>
        <Image
          source={iconAddImg}
          style={{ height: 24, width: 24, marginTop: 10 }}
        />
        <Select
          selectedValue={selectedValue}
          minWidth="330"
          accessibilityLabel=""
          placeholder=""
          _selectedItem={{
            bg: "pink.200", // Couleur de fond de l'élément sélectionné
            endIcon: <CheckIcon size="5" />,
            borderRadius: 5, // Ajouter des bordures arrondies aux éléments sélectionnés
          }}
          _input={{
            borderWidth: 0, // Supprime la bordure par défaut
          }}
          _light={{
            borderWidth: 0, // Supprime la bordure par défaut
          }}
          style={styles.select}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Select.Item key={index} label={<Text>{item.label}</Text>} value={item.value}>
              {/* Affichage de l'emoji à côté du texte */}
              <Image source={{ uri: item.url }} alt={item.label} style={{ height: 20, width: 20, marginRight: 10 }} />
            </Select.Item>
          ))}
        </Select>
      </Box>
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
      <View style={styles.textArea}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={pencilicon}
            style={{ height: 24, width: 24 }}
          />
          <Text style={styles.label}>Describe your fit (optional)</Text>
        </View>
        <TextInput
          placeholder="Describe your fit..."
          multiline={true}
          numberOfLines={4}
          maxLength={280}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <Example
        text={"What are the compositions of your outfit?"}
        selectedValue={compositions}
        onValueChange={itemValue => setCompositions(itemValue)}
        items={compositionsList}
      />

      <Example
        text={"For what occasion is your outfit?"}
        selectedValue={occasion}
        onValueChange={itemValue => setOccasion(itemValue)}
        items={occasionsList}
      />

    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    maxWidth: 400,
    borderColor: '#C8C8C86D',
    borderWidth: 0,
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: '10%',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    borderColor: '#F08DB7',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    marginLeft: 10
  },
  textArea: {
    height: 100,
    borderColor: '#C8C8C86D',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  }
});

export default InputsAsk;
