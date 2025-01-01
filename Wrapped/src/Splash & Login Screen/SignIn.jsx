import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IconButton, Icon, NativeBaseProvider  } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; // Import des icônes Ionicons
import BackIcon from '../../assets/flecheIcon.png';
// import GoogleLogoW from "../assets/googleLogoW.png";
// import FbLogoW from "../assets/fbLogoW.png";
import LogoWarpeed from '../../assets/logo2.png';
import axios from 'axios';
import {PORT} from '../Port'


const SignIn = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre } = route.params; // Make sure 'genre' is defined here

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showOauth ,setShowOauth]=useState(false)
    // State for showing/hiding password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailExsit,setEmailExsit] = useState(Boolean);
    // Email validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

// Email existence check
const EmailExisting = async () => {
    try {
        const response = await axios.post(PORT + "/auth/check-email", { email });
        console.log(response.status);

        if (response.status === 201) {
            alert(response.data.message);
            console.log('heyy1' + response.data.message);
            setEmailExsit(false) ;  // Email does not exist
        } else if (response.status === 200) {
            console.log('heyy2' + response.data.message);
            setEmailExsit(true) ;  // Email exists
            // alert(response.data.message);
        } else {
            setEmailExsit(false) ;  // Default to false if status is neither 200 nor 201
        }
    } catch (e) {
        console.log(e);
        alert('Error: ' + e.message);
        setEmailExsit(false) ;  // Email does not exist
    }
};


    // Password validation
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&+_]{1,8}$/;
        return regex.test(password);
    };

    const handleSubmit = async () => {
        setShowOauth(true);
        let isValid = true;
        console.log('here'+emailExsit);
        EmailExisting()

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else if (!emailExsit) {  // Use await here
            setEmailError('Email exists already.');
            isValid = false;
        } else {
            setEmailError('');
        }
    
        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must contain at least one uppercase letter, one digit, and be 8 characters or less.');
            isValid = false;
        } else {
            setPasswordError('');
        }
    
        // Validate confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }
    
        // Proceed if all validations pass
        if (isValid) {
            navigation.navigate("AcountDet", { genre, password, email });
        }
    };

    return (
        <NativeBaseProvider>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          
        <View style={styles.container}>
            <LinearGradient
                colors={genre === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#AD669E', '#FFB6C8']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.background}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Splash2", { genre })}
                >
                    <Image
                        source={BackIcon}
                        style={styles.logo}
                    />
                    <Text style={styles.textstyle}>Sign Up</Text>
                </TouchableOpacity>
                <Image 
                    source={LogoWarpeed}
                    style={styles.logo1}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={[styles.input, { flex: 1, borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                            placeholder="Email"
                            placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        />
                       
                    </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={[styles.input, { flex: 1, borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                            placeholder="Password"
                            placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                            secureTextEntry={!showPassword}
                        />
                        <IconButton
                            icon={<Icon as={Ionicons} name={showPassword ? "eye-off" : "eye"} size={5} color="muted.400" />}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={[styles.input, { flex: 1, borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                            placeholder="Confirm Password"
                            placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <IconButton
                            icon={<Icon as={Ionicons} name={showConfirmPassword ? "eye-off" : "eye"} size={5} color="muted.400" />}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </View>
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                </View>
                <View style={styles.buttonContainer}> 
                <TouchableOpacity
                    style={[styles.proceedButton, { backgroundColor: genre === 'man' ? '#2C9AEE' : '#AD669E' }]}
                      onPress={handleSubmit}                >
                    <Text style={styles.proceedText}>Next</Text>
                </TouchableOpacity>
                </View>

                {/* {!showOauth&&
                <>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>Or</Text>              
                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={GoogleLogoW}
                                style={styles.logo2}
                            />
                            <Text style={styles.textstyle1}>Login with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={FbLogoW}
                                style={styles.logo2}
                            />
                            <Text style={styles.textstyle1}>Login with Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
                } */}
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    logo: {
        width: 20,
        height: 35,
        marginRight: "8%",
    },
    logo1: {
        width: 180, 
        height: 200, 
    },
    textstyle: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    inputContainer: {
       
        width: '100%',
        marginBottom: "10%",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#FFFFFFEC',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
    },
    view1: {
        flex: 3,
        padding: "8%",
        width: "90%",
        height: "50%",
        borderRadius: 25,
        justifyContent: 'center',
    },
    view2: {
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: '#FFFFFF78',
        borderColor: "#ffffff",
        borderWidth: 1,
        padding: 15,
        width: '100%',
        height: "45%",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 50,  // Adjust this value as needed
        paddingHorizontal: 20,
    },

    proceedButton: {
        borderRadius: 10,
        paddingVertical: 15,  // Increased from 10
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    textstyle1: {
        color: "black",
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    logo2: {
        width: 30,
        height: 30,
    },
});

export default SignIn;
