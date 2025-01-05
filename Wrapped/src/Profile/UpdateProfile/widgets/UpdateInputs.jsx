import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert,TouchableOpacity ,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Add this import
import axios from "axios";
import {PORT} from '../../../Port';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserForm = ({ OneUser, onDataUpdate }) => {

  const [fullName, setFullName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [existmdp, setExistmdp] = useState('');
  const [newmdp, setNewmdp] = useState('');
  const [newmdp2, setNewmdp2] = useState('');
  const [userData, setUserData] = useState(null);
  const [showExistPassword, setShowExistPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);


  const handleSubmit = () => {
    if (!fullName || !birthDay || !location || !gender) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
    } else {
      Alert.alert('Succès', `Nom: ${fullName}\nDate de naissance: ${birthDay}\nLocalisation: ${location}\nGenre: ${gender}`);
    }
  };
 
  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser');
      if (!userId) {
        console.log('No user ID found in AsyncStorage');
        return;
      }
      console.log("userId",userId)
      const response = await axios.get(`${PORT}/users/UserAuth/${userId}`);
      console.log("user.data",response.data)
      setUserData(response.data);
      
      // Update form states with fetched data
      if(response.data) {
        setFullName(response.data?.user_info?.full_name || '');
        const fullBirthdate = response.data?.user_info?.birthdate || '';
        const dateOnly = fullBirthdate ? fullBirthdate.split('T')[0] : '';
        setBirthDay(dateOnly);
        setLocation(response.data?.auth_info?.region || '');
        setEmail(response?.data?.auth_info?.email || '');
        setPhone(response?.data?.auth_info?.phone_number || '');
        setGender(response?.data?.user_info?.sexe || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      // Get user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('idUser');
      console.log("userIdfor update",userId)
      if (!userId) {
        Alert.alert('Error', 'User ID not found');
        return;
      }

      // Prepare the data object
      const updateData = {
        // User table fields
        full_name: fullName,
        sexe: gender,
        birthdate: birthDay,
        // Auth table fields
        email: email,
        phone_number: phone,
        region: location,
        current_password: existmdp,
        // Add password fields if they exist
        ...(newmdp ? { password: newmdp } : {})
      };

      // Validate passwords if changing
      if (newmdp || newmdp2 ) {
        
        if (newmdp !== newmdp2) {
          Alert.alert('Error', 'New passwords do not match');
          return;
        }
      }

      if (!existmdp) {
        Alert.alert('Error', 'Please enter your current password to update profile');
        return;
      }
      // Make the API call
      const response = await axios.put(
        `${PORT}/users/UserAuth/${userId}`,
        updateData
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
        // Clear password fields
        setExistmdp('');
        setNewmdp('');
        setNewmdp2('');
        // Call the callback to refresh data
        onDataUpdate();
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  };

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
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
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
        onChangeText={(text) => {
          // Only allow numbers
          const numericValue = text.replace(/[^0-9]/g, '');
          setPhone(numericValue);
        }}
        keyboardType="numeric"
      />
      <View style={styles.container1}>
      <View style={styles.line1} />
      <Text style={styles.text1}>Change Password</Text>
      <View style={styles.line1} />
    </View>
    <Text style={styles.label}>Current Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Entrer votre mot de passe"
          value={existmdp}
          onChangeText={setExistmdp}
          secureTextEntry={!showExistPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowExistPassword(!showExistPassword)}
        >
          <MaterialCommunityIcons
            name={showExistPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#AD669E"
          />
        </TouchableOpacity>
      </View>
       <Text style={styles.label}>New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Entrer votre nouveau Password"
          value={newmdp}
          onChangeText={setNewmdp}
          secureTextEntry={!showNewPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <MaterialCommunityIcons
            name={showNewPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#AD669E"
          />
        </TouchableOpacity>
      </View>
       <Text style={styles.label}>Repeat the New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Repete votre nouveau Password"
          value={newmdp2}
          onChangeText={setNewmdp2}
          secureTextEntry={!showNewPassword2}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowNewPassword2(!showNewPassword2)}
        >
          <MaterialCommunityIcons
            name={showNewPassword2 ? 'eye-off' : 'eye'}
            size={24}
            color="#AD669E"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
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
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default UserForm;
