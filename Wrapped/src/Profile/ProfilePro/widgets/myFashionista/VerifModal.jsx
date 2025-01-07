import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ArticleVerificationModal = ({ article, isVisible, onClose, onAccept, onReject }) => {
  const [price, setPrice] = useState(article.price);
  const [availableSizes, setAvailableSizes] = useState(article.sizes);
  const [selectedCategory, setSelectedCategory] = useState(article.category);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isAvailable, setIsAvailable] = useState(article.isAvailable);
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept(price, availableSizes, selectedCategory, isAvailable);
    }
  };

  const handlePriceValidation = (priceInput) => {
    const priceValue = parseFloat(priceInput);
    setPrice(priceValue);
    setIsPriceValid(priceValue > 0);
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>Vérification de l'article</Text>

            {/* Image de l'article */}
            <Image source={{ uri: article.image }} style={styles.articleImage} />

            {/* Vérification du prix */}
            <Text style={styles.label}>Prix:</Text>
            <TextInput
              value={price.toString()}
              onChangeText={handlePriceValidation}
              keyboardType="numeric"
              style={[styles.input, !isPriceValid && styles.errorBorder]}
            />
            {!isPriceValid && <Text style={styles.errorText}>Veuillez entrer un prix valide.</Text>}

            {/* Vérification de la disponibilité */}
            <View style={styles.section}>
              <Text style={styles.label}>Disponibilité:</Text>
              <TouchableOpacity
                style={[styles.availabilityButton, isAvailable ? styles.available : styles.unavailable]}
                onPress={() => setIsAvailable(!isAvailable)}
              >
                <Text style={styles.availabilityText}>
                  {isAvailable ? 'Disponible' : 'Indisponible'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Vérification des tailles */}
            <Text style={styles.label}>Tailles disponibles:</Text>
            <TextInput
              value={availableSizes.join(', ')}
              onChangeText={(text) => setAvailableSizes(text.split(', '))}
              style={styles.input}
            />

            {/* Vérification de la catégorie */}
            <Text style={styles.label}>Catégorie:</Text>
            <View style={styles.categoryContainer}>
              {['Homme', 'Femme', 'Enfant'].map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Vérification de tous les critères */}
            <View style={styles.checkSection}>
              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                style={styles.checkbox}
              >
                <Text style={{ fontSize: 20 }}>{isChecked ? '✔️' : '❌'}</Text>
              </TouchableOpacity>
              <Text style={styles.checkLabel}>Tout vérifier</Text>
            </View>

            {/* Boutons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={onReject}>
                <Text style={styles.actionText}>Refuser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.acceptButton,
                  !isChecked && styles.disabledButton,
                ]}
                onPress={handleAccept}
                disabled={!isChecked}
              >
                <Text style={styles.actionText}>Accepter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    marginVertical: 10,
  },
  availabilityButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  available: {
    backgroundColor: '#d4edda',
  },
  unavailable: {
    backgroundColor: '#f8d7da',
  },
  availabilityText: {
    textAlign: 'center',
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonSelected: {
    backgroundColor: '#ffd700',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    fontWeight: 'bold',
  },
  checkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: '#ff4d4f',
  },
  acceptButton: {
    backgroundColor: '#4caf50',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default ArticleVerificationModal;
