import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo1 from '../../assets/logo1.png'; 
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  const [genre, setGenre] = useState('woman'); 

  const translateYLogo = useRef(new Animated.Value(600)).current; 
  const [displayText, setDisplayText] = useState('');

  const fullText = 'Wrapped';

  useEffect(() => {
    // Animation du logo
    Animated.timing(translateYLogo, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Animation du texte
      let timeout = 0;
      for (let i = 0; i < fullText.length; i++) {
        setTimeout(() => {
          setDisplayText((prev) => prev + fullText[i]);
        }, timeout);
        timeout += 130; // Délai entre chaque lettre
      }
    });

    // Naviguer automatiquement après 5 secondes
    const timer = setTimeout(() => {
      navigation.navigate("Splash2", { genre });
    }, 3000);

    // Nettoyer le timer
    return () => clearTimeout(timer);
  }, [translateYLogo, navigation, genre]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={genre === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#FFB6C8', '#AD669E']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <Animated.Image
            source={Logo1}
            style={[styles.logo, { transform: [{ translateY: translateYLogo }] }]}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            {displayText}
          </Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: -140,
  },
});

export default Splash;
