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
import axios from 'axios';
import { PORT } from '../../Port';

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
    const [results, setResults] = useState([]); // Résultats de la recherche

    const categories = ['S', 'M', 'L', 'XL', 'XXL']; 

    /////////////////////////////////////////AXIOS////////////////////////////////////////////////////////
    const SearchBrandName =async()=>{
        try{
            const response =await axios.post(`${PORT}/brands/searchbyname`,{
                params: { search: brandName }
            });
            if(response.status===200){
                setResults(response.data);
            }
            else{
              console.log("Failed to find brand. Please try again.",response.message);
            }
          }catch(e){
            console.log(e);
          }
    }
    /////////////////////////////////////////AXIOS////////////////////////////////////////////////////////
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
                brand: brandName,
                prix: brandPrice,
                size: selectedCategory,
                x: selectedRegion.x,
                y: selectedRegion.y,
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
        // Alert.alert('Region Selected', `X: ${locationX}, Y: ${locationY}`);
    };

    // Supprime une marque
    const deleteBrand = (index) => {
        const updatedBrands = brands.filter((_, i) => i !== index);
        setBrands(updatedBrands);
    };

    // Prépare l'édition d'une marque
    const editBrand = (index) => {
        const brand = brands[index];
        setBrandName(brand.brand);
        setBrandPrice(brand.prix);
        setSelectedCategory(brand.size);
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
                            {item.brand} - ${item.prix} - {item.size}
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
    <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            {/* En-tête de la modale */}
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>select the product :</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Icon name="" size={24} color="#333" />
                </TouchableOpacity>
            </View>

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
                                left: selectedRegion.x - 15,
                                top: selectedRegion.y - 15,
                            },
                        ]}
                    >
                        <Icon name="map-marker" size={20} color="white" />
                    </View>
                )}
            </TouchableOpacity>

            {/* Formulaire pour les informations */}
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
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select size" value="" />
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>

                    {/* Boutons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            onPress={closeModal}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.primaryButton]}
                            onPress={saveBrandInfo}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    </View>
</Modal>
        <TouchableOpacity style={styles.button2} 
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
    // input: {
    //     width: '100%',
    //     borderBottomWidth: 1,
    //     borderColor: '#ccc',
    //     marginBottom: 15,
    //     padding: 5,
    // },
    saveButton: {
        backgroundColor: '#AD669E',
        padding: 10,
        borderRadius: 5,
        width: '40%',
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#AD669E',
        borderRadius: 5,
    },
    actionText: {
        color: '#fff',
        fontSize: 14,
    },
    button2: {
        marginTop: 20,
        backgroundColor: '#AD669E',
        padding: 15,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
    },
 
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    fullScreenImageContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    formContainer: {
        marginTop: 10,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    primaryButton: {
        backgroundColor: '#AD669E',
    },
    secondaryButton: {
        backgroundColor: '#E0E0E0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default AddBrand;
