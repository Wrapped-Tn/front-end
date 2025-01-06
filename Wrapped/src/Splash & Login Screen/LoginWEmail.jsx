import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Select, Box, CheckIcon, Center, NativeBaseProvider, Spinner, HStack, Heading } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../../assets/flecheIcon.png';
import LogoWarpeed from '../../assets/logo2.png'
import axios from 'axios';
import {PORT} from '../Port';

const LoginWEmail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre } = route.params; // 'genre' passed from previous screen
    
    // Define states for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSpiner,setShowSpiner]=useState(false)



    const handleLogin =() => {
        // Handle login logic here, e.g., validate email and password, authenticate user
        if (!email || !password) {
            alert('Please fill out both fields.');
        setShowSpiner(false)

        } else {
            // For example, navigate to the home screen on successful login
            Login()
        }
    };
    const Login = async () => {
        try {
            let infoUser = {
                email: email,
                password: password
            };
            setShowSpiner(true)
            const response = await axios.post(PORT+"/auth/login", infoUser); // Corrected URL format            
            if (response.status === 200) {
                setShowSpiner(false)
                const token = response.data.token; // Assuming the token is in the response
                const idUser=response.data.idUser
                const idAuth=response.data.idAuth
                await AsyncStorage.setItem('authToken', token);
                await AsyncStorage.setItem('idUser', idUser.toString()); 
                await AsyncStorage.setItem('idAuth', idAuth.toString()); 
                console.log(response.data);
                               
                   if(response.data.role=="brand"){
                       navigation.navigate("ProfilePro", { token,idUser,idAuth });
                   }else{
                    navigation.navigate("ProfilePage", { token,idUser,idAuth });
                   }
            } else {
                throw new Error('Login failed'); // Handle non-200 responses
            }
        } catch (e) {
            console.log(e);
            setShowSpiner(false)

            alert('Error logging in: ' + e.message); // Notify user of error
        }
    };
    const handleForgetPassword = async () => {
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        try {
            if (!await handleEmailExist(email)) {
                const response = await axios.post(PORT + "/auth/forgot-password", { email });
                if (response.status === 200) {
                    alert('A reset code has been sent to your email.');
                    navigation.navigate("ForgetPassword", { genre, email });
                } else {
                    throw new Error('Error sending reset code');
                }
            } else {
                alert('Email not found');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    const handleEmailExist = async (email) => {
        try {
            const response = await axios.post(PORT + "/auth/check-email", { email });
            return response.status === 200 && response.data.exists;
        } catch (error) {
            console.log(error);
            alert('Error: ' + error.message);
            return false;
        }
    };
///////////////////////////NATIVE BASE//////////////////////////////

    const ExampleSpiner = () => {
        return <HStack space={2} justifyContent="center" mb={10}>
            <Spinner color={genre === 'man' ? "cyan.800" : "indigo.800"}  size="lg" />
          </HStack>;
      };
///////////////////////////NATIVE BASE//////////////////////////////
    return (
        <NativeBaseProvider>
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
                    <Text style={styles.textstyle}>Log In</Text>
                </TouchableOpacity>
                <Image 
                    source={LogoWarpeed}
                    style={styles.logo1}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Email"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        value={email}
                        onChangeText={setEmail} // Update email state
                    />
                    <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Password"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} // Update password state
                    />
                </View>
                <TouchableOpacity style={{ marginBottom: '15%' }}
                    onPress={handleForgetPassword}              >
                    <Text style={styles.forgetpass}>Forget Password !</Text>
                </TouchableOpacity>
                {!showSpiner?
                <TouchableOpacity 
                    style={[styles.proceedButton, { backgroundColor: genre === 'man' ? '#2C9AEE' : '#AD669E' }]}
                    onPress={handleLogin} // Handle login action
                >
                    <Text style={styles.proceedText}>Log In</Text>
                </TouchableOpacity>
                :
                <ExampleSpiner/>

            }
                
                
                  
            </LinearGradient>
        </View>
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
        width: "45%",
        height: "25%",
    },
    textstyle: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    inputContainer: {
        marginTop: '-12%',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        marginBottom: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
    },
    forgetpass: {
        color: '#FFFFFFAD',
        fontSize: 16,
        textDecorationLine: 'underline',
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
        width: "110%",
        marginLeft: '-5%',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 35,
        width: "100%",
        alignItems: 'center',
        marginBottom: "5%",
    },
    logo2: {
        width: "25%",
        height: 70,
        borderRadius: 0,
        marginHorizontal: 10,
    },
    textstyle1: {
        fontSize: 20,
        color: "#AD669E",
        fontWeight: '500',
    },
    proceedButton: {
        borderRadius: 25,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default LoginWEmail;
