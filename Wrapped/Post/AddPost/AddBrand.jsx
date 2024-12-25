import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Picker } from '@react-native-picker/picker'; // Ajoutez cette dépendance si nécessaire
import { useNavigation } from '@react-navigation/native'; // Importer la navigation
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importer les icônes FontAwesome5


const AddBrand = ({ route }) => {
    const { image } = route.params; // Récupère l'image depuis les paramètres
    const navigation = useNavigation(); // Hook de navigation

    const [isModalVisible, setModalVisible] = useState(false); // Contrôle de la popup
    const [brandName, setBrandName] = useState(''); // Nom de la marque
    const [brandPrice, setBrandPrice] = useState(''); // Prix
    const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée
    const [selectedRegion, setSelectedRegion] = useState(null); // Région sélectionnée
    const [brands, setBrands] = useState([]); // Liste des marques ajoutées
    const [editingIndex, setEditingIndex] = useState(null); // Marque en cours de modification

    const categories = ['T-shirt', 'Pull', 'Robe', 'Jeans', 'Veste'];

    // Fonction pour ouvrir le modal
    const openModal = () => {
        setModalVisible(true);
        setBrandName('');
        setBrandPrice('');
        setSelectedRegion(null);
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedRegion(null);
    };

    // Enregistre les informations de la marque
    const saveBrandInfo = () => {
        if (brandName && brandPrice && selectedCategory && selectedRegion) {
            const newBrand = {
                name: brandName,
                price: brandPrice,
                category: selectedCategory,
                region: selectedRegion, // Ajoutez la région sélectionnée
            };
    
            if (editingIndex !== null) {
                const updatedBrands = [...brands];
                updatedBrands[editingIndex] = newBrand;
                setBrands(updatedBrands);
                setEditingIndex(null);
            } else {
                setBrands([...brands, newBrand]);
            }
    
            closeModal();
        } else {
            Alert.alert('Error', 'Please fill in all fields, including selecting a region.');
        }
    };

    // Fonction de sélection d'une région sur l'image
    const handleImageTouch = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        setSelectedRegion({ x: locationX, y: locationY });
        Alert.alert('Region Selected', `X: ${locationX}, Y: ${locationY}`);
    };

    // Supprime une marque
    const deleteBrand = (index) => {
        const updatedBrands = brands.filter((_, i) => i !== index);
        setBrands(updatedBrands);
    };

    // Prépare l'édition d'une marque
    const editBrand = (index) => {
        const brand = brands[index];
        setBrandName(brand.name);
        setBrandPrice(brand.price);
        setSelectedCategory(brand.category);
        setSelectedRegion(brand.region); // Prise en charge de la région
        setEditingIndex(index);
        setModalVisible(true);
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/* Image avec un cadre */}
                <View style={styles.imageContainer2}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity>
                            <Image source={image} style={styles.image} />
                        </TouchableOpacity>
                    </View>

                    {/* Bouton pour ajouter des tags de marque */}
                    <TouchableOpacity
                        style={styles.addBrandButton}
                        onPress={openModal}
                    >
                    <Text style={styles.addBrandText}>+ Add brand tags</Text>
                    </TouchableOpacity>
                </View>

                {/* Liste des marques ajoutées */}
                <FlatList
                    data={brands}
                    keyExtractor={(_, index) => index.toString()}
                    style={styles.brandList}
                    renderItem={({ item, index }) => (
                        <View style={styles.brandItem}>
                            <Text style={styles.brandText}>
                            {item.name} - ${item.price} - {item.category}
                            </Text>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    onPress={() => editBrand(index)}
                                    style={styles.actionButton}
                                >
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deleteBrand(index)}
                                    style={styles.actionButton}
                                >
                                    <Text style={styles.actionText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                {/* Modal pour l'image agrandie et le formulaire */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        {/* Image agrandie */}
                        <TouchableOpacity
                            style={styles.fullScreenImageContainer}
                            onPress={handleImageTouch}
                        >
                            <Image source={image} style={styles.fullScreenImage} />
                            {selectedRegion && (
                                <View
                                    style={[
                                        styles.regionMarker,
                                        {
                                            left: selectedRegion.x - 15, // Centrer l'icône horizontalement
                                            top: selectedRegion.y - 15, // Centrer l'icône verticalement
                                        },
                                    ]}
                                >
                                    <Icon name="map-marker" size={20} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                        {/* Formulaire pour les informations de la marque */}
                        {selectedRegion && (
                            <View style={styles.formContainer}>
                                <TextInput
                                    placeholder="Enter brand name"
                                    value={brandName}
                                    onChangeText={setBrandName}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Enter brand price"
                                    value={brandPrice}
                                    onChangeText={setBrandPrice}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                                {/* Sélecteur de catégorie */}
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) =>
                                    setSelectedCategory(itemValue)
                                }
                                style={styles.picker}
                            >
                                <Picker.Item label="Select category" value="" />
                                {categories.map((category, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={category}
                                        value={category}
                                    />
                                ))}
                            </Picker>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={saveBrandInfo}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
        <TouchableOpacity style={styles.button} 
        onPress={()=>{
            console.log(brands);
            navigation.navigate('AddPost', { brands }); // Navigue vers la page de prévisualisation
        }}
        >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    icon: {
        color: '#fff',
        fontSize: 18,
        marginRight: 8,
    },
    regionMarker: {
        position: 'absolute',
    }, 
    imageContainer: {
        width: '100%',
        height: '80%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        padding: 10,
    },
    imageContainer2: {
        width: '90%',
        height: '60%',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#D1D1D1',
        overflow: 'hidden',
        shadowColor: '#A9A6A6FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    addBrandButton: {
        backgroundColor: '#AD669E',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: '5%',
    },
    addBrandText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImageContainer: {
        width: '90%',
        height: '70%',
        marginBottom: 20,
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        padding: 5,
    },
    saveButton: {
        backgroundColor: '#AD669E',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    brandList: {
        width: '90%',
        marginTop: 20,
    },
    brandItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    brandText: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    actionText: {
        fontSize: 14,
        color: '#007BFF',
    },
    button: {
        backgroundColor: "#F08DB7",
        alignSelf: "flex-end",
        width: "25%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      },
      picker: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});

export default AddBrand;
