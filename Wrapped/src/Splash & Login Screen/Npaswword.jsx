import React, { useRef,useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/flecheIcon.png';
import LogoWarpeed from '../../assets/logo2.png';
import axios from 'axios';
import {PORT} from '../Port'

const NPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre,email } = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const restePassword = async () =>{
        let infoRest={
            email:email,
            newPassword:password
        }
        try{
            const response=await axios.post(PORT+"/auth/reset-password",infoRest)
            console.log(email);
            if(response.status===200){
                navigation.navigate("LoginWEmail" ,{genre})
                
            }
        }catch (error) {
            console.log(error);
            alert('Error: ' + error.message);
        }
    }

    const handleVerification = () => {
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
        } else {
            setErrorMessage('');
            restePassword()
        }
    };


    return (
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
                    <Text style={styles.textstyle}>Forget Password</Text>
                </TouchableOpacity>

                <Image 
                    source={LogoWarpeed}
                    style={styles.logo1}
                />
                <View style={styles.inputContainer}>
                <View style={{flexDirection:"column",alignItems:"center"}}>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>Entrer votre </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>nouveau mot de passe </Text>
                </View>
                <View style={{marginTop:20}}>
                    <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="New Password"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Confirm New Password"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                </View>
                </View>
                <TouchableOpacity 
                onPress={handleVerification}
                style={[styles.proceedButton, { backgroundColor: genre === 'man' ? '#2C9AEE' : '#AD669E' }]}>
                    <Text style={styles.proceedText}>Verif</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
        )
}
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
    textstyle: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: '600',
        marginLeft: "8%",
    },
    logo1: {
        width: "45%",
        height: "25%",
        marginTop: "10%",
    },
    logo: {
        width: 20,
        height: 35,
        marginRight: "3%",
    },
    errorText: {
        color: '#FFFFFFFF', // Couleur rouge pour le message d'erreur
        fontSize: 14,
        marginTop: -15,
        marginBottom: 10,
        textAlign: 'center',
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
    input: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        marginBottom: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
    },
    inputContainer: {
        marginTop: '-12%',
        width: '100%',
        marginBottom: 20,
    },
});

export default NPassword;
