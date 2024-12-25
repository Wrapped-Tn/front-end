import React, { useRef,useState,useEffect  } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/flecheIcon.png';
import LogoWarpeed from '../assets/logo2.png'
import axios from 'axios';
import {PORT} from '../Port'
const ForgetPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre,email } = route.params;

    // Create refs for each TextInput
    const inputRefs = useRef([]);
    const [code, setCode] = useState(''); // State for the 4-digit code
    const [counter, setCounter] = useState(90); // Initialiser à 90 secondes (1 minute 30)
    const [isExpired, setIsExpired] = useState(false); // État pour vérifier si le compteur est expiré

    // Function to handle input change and focus on the next TextInput
    const handleInputChange = (text, index) => {
        // Update the code as the digits are entered
        const newCode = code.slice(0, index) + text + code.slice(index + 1);
        setCode(newCode);

        if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();  // Move to the next input
        }

        // Log the code when it's complete
        if (newCode.length === 4) {
            console.log('Full code:', newCode); // This will display the full 4-digit code
        }
    };

    const VerifyCode = async(email,code)=>{
        let infoverif={
            email:email,
            code:code
        }
        try{
            const response = await axios.post(PORT+'/auth/verify-code',infoverif)
            if(response.status===200){
                if(response.data.valid===false){
                    alert('Error : '+response.data.message)
                    setCode('')
                }
                else{
                    navigation.navigate("NPassword" ,{genre,email})
                }
            }
        }catch (error) {
            console.log(error);
            alert('Error: ' + error.message);
        }
    }
    const handleForgetPassword = async () => {
        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        try {
            const response = await axios.post(PORT + "/auth/forgot-password", { email });
            if (response.status === 200) {
                alert('A reset code has been sent to your email.');
            } else {
                throw new Error('Error sending reset code');
            }
        } catch (error) {
            console.log(error);
            alert('Error: ' + error.message);
        }
    };
    const handleResendCode = () => {
        setCounter(90); // Réinitialiser le compteur à 90 secondes
        setIsExpired(false); // Réinitialiser l'état expiré
        handleForgetPassword(); // Appel de la fonction pour renvoyer le code
    };
    ///////////////////////////////useEffects//////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsExpired(true); // Activer l'état expiré quand le compteur atteint 0
        }
    }, [counter]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>Please enter your recovery code</Text>

                <View style={styles.inputContainer}>
                    {[...Array(4)].map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}  // Assign ref to each input
                            style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                            keyboardType="numeric"  // Display numeric keyboard
                            maxLength={1}  // Restrict input to a single character
                            onChangeText={(text) => handleInputChange(text, index)}  // Handle input change
                        />
                    ))}
                </View>
                {isExpired ? (
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendText}>Renvoyer le code</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.counterText}>
                    {`Code expires in ${Math.floor(counter / 60)}:${(counter % 60).toString().padStart(2, '0')}`}
                </Text>
            )}
                <TouchableOpacity 
                onPress={()=>{VerifyCode(email,code)}}
                style={[styles.proceedButton, { backgroundColor: genre === 'man' ? '#2C9AEE' : '#AD669E' }]}>
                    <Text style={styles.proceedText}>Verif</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
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
    inputContainer: {
        marginTop: '12%',
        width: '100%',
        marginBottom: "10%",
        flexDirection: "row",
        justifyContent: "center",
    },
    input: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
        width: "15%",
        textAlign: 'center',
        margin: "3%",
    },
    counterText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    resendText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    proceedButton: {
        borderRadius: 25,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginTop:20
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ForgetPassword;
