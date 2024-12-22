import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert,TouchableOpacity ,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import {PORT} from '../../../Port';

const UserForm = (OneUser) => {
  const User=OneUser.OneUser

  const [fullName, setFullName] = useState(User.full_name);
  const [birthDay, setBirthDay] = useState('');
  const [location, setLocation] = useState(User.region);
  const [email, setEmail] = useState(User.email);
  const [phone, setPhone] = useState(User.phone_number);
  const [gender, setGender] = useState('');
  const [existmdp, setExistmdp] = useState('');
  const [newmdp, setNewmdp] = useState('');
  const [newmdp2, setNewmdp2] = useState('');


  const handleSubmit = () => {
    if (!fullName || !birthDay || !location || !gender) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
    } else {
      Alert.alert('Succès', `Nom: ${fullName}\nDate de naissance: ${birthDay}\nLocalisation: ${location}\nGenre: ${gender}`);
    }
  };
  console.log(User.full_name)
  




  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom:'20%'}}>

      <View style={styles.container1}>
      <View style={styles.line1} />
      <Text style={styles.text1}>Informations Personnelles</Text>
      <View style={styles.line1} />
    </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nom complet"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Birth Day</Text>
      <TextInput
        style={styles.input}
        placeholder="JJ/MM/AAAA"
        value={birthDay}
        onChangeText={setBirthDay}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre localisation"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Genre</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Sélectionner le genre" value="" />
          <Picker.Item label="Homme" value="Homme" />
          <Picker.Item label="Femme" value="Femme" />
          <Picker.Item label="Autre" value="Autre" />
        </Picker>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre email"
        value={email}
        onChangeText={setEmail}
      />
       <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="+216"
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.container1}>
      <View style={styles.line1} />
      <Text style={styles.text1}>Change Password</Text>
      <View style={styles.line1} />
    </View>
    <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre mot de passe"
        value={existmdp}
        onChangeText={setExistmdp}
      />
       <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nouveau Password"
        value={newmdp}
        onChangeText={setNewmdp}
      />
       <Text style={styles.label}>Repete the New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Repete votre nouveau Password"
        value={newmdp2}
        onChangeText={setNewmdp2}
      />
      {/* <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}
          onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color:"#AD669E",
    fontWeight:"500"
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#AD669E',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line1: {
    flex: 1,
    height: 3,
    backgroundColor: '#AD669E', // Light blue color for the line
  },
  text1: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AD669E', // Light blue color for the text
  },
});

export default UserForm;
