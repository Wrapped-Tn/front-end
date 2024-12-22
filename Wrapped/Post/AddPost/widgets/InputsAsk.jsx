import React, { useState } from 'react';
import { View,Image, TextInput, Text, StyleSheet, Button, Alert,TouchableOpacity ,ScrollView } from 'react-native';
import { Select, Box, CheckIcon, Center, NativeBaseProvider } from "native-base";
import iconAddImg from '../../../assets/addimg.png'
import pencilicon from '../../../assets/pencil.png'
const InputsAsk=({ description, setDescription, compositions, setCompositions, occasion, setOccasion })=>{
    const Example = ({ text, selectedValue, onValueChange }) => {
        //////modification future => il doit choisir plusieur compositions
        return (
          <Center style={styles.boxContainer2}>
            <Text style={{fontSize:16,fontWeight:"bold"}}>{text}</Text>
            <Box style={styles.boxContainer}>
                <Image
                source={iconAddImg}
                style={{height:24, width:24,marginTop:10}}
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
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>
          </Center>
        );
      };
    return(
        <NativeBaseProvider>

            <View
            style={styles.textArea}>
                <View style={{flexDirection:"row"}}>
             <Image
             source={pencilicon}
             style={{height:24, width:24}}
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
            />
            <Example 
             text={"For what occasion is your outfit?"}
             selectedValue={occasion}
             onValueChange={itemValue => setOccasion(itemValue)}
              />
        </NativeBaseProvider>

    )

}
const styles = StyleSheet.create({
    boxContainer: {
        maxWidth: 400,
        borderColor: '#C8C8C86D', 
        borderWidth: 0,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#fff', // Fond blanc pour le composant
        marginBottom: '10%',
        flexDirection:'row',
        
        // Ombre pour iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Déplacement horizontal et vertical
        shadowOpacity: 0.3, // Opacité de l'ombre
        shadowRadius: 4, // Rayon de l'ombre
    
        // Ombre pour Android
      },
      boxContainer2: {
        maxWidth: 400,
        borderColor: '#C8C8C86D', 
        borderWidth: 2,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#fff', // Fond blanc pour le composant
        marginBottom: '10%',
        
        // Ombre pour iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Déplacement horizontal et vertical
        shadowOpacity: 0.3, // Opacité de l'ombre
        shadowRadius: 4, // Rayon de l'ombre
    
        // Ombre pour Android
        elevation: 2, // Propriété spécifique à Android pour gérer l'ombre
      },
      select: {
        fontSize: 16, // Taille du texte
        color: '#333', // Couleur du texte
        paddingHorizontal: 10, // Espacement horizontal interne
        paddingVertical: 12, // Espacement vertical interne
        borderRadius: 5, // Bordures arrondies pour les éléments
        borderColor: '#F08DB7', // Bordure personnalisée
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
        textAlignVertical: 'top', // Assurer que le texte commence en haut
        marginBottom: 20,
        backgroundColor: '#fff',
        elevation: 2, // Propriété spécifique à Android pour gérer l'ombre
        
      }
})
export default InputsAsk;