import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute,useNavigation } from '@react-navigation/native';
import Pic1 from "../assets/splashPic1.png";
import Pic2 from "../assets/splashPic2.png";

const Splash2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { genre } = route.params;
  const text = "Let the community help choose your outfit";
  const text2 = "Create Professional Account?";
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [annimation,setAnimation]=useState(true)
  // Animation values for each button
  const animatedOpacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length && annimation) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setAnimation(false)
      }
    }, 40);

    return () => clearInterval(intervalId);
  }, [text]);

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text2.length && annimation) {
        setDisplayedText2((prev) => prev + text2[currentIndex]);
        currentIndex++;
        setAnimation(false)
      } else {
        clearInterval(intervalId);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [text2]);

  // Animate opacity for each button
  useEffect(() => {
    Animated.timing(animatedOpacity3, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={genre === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#FFB6C8', '#AD669E']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <View style={styles.imageRow}>
            <Image
              source={Pic1}
              style={styles.logo}
            />
            <Image
              source={Pic2}
              style={styles.logo}
            />
          </View>
          <Animated.Text style={styles.textstyle2}>
            {displayedText}
          </Animated.Text>
        </View>

          <TouchableOpacity 
            style={genre === 'man' ? styles.buttonContainerMan : styles.buttonContainer} 
            onPress={() => navigation.navigate("LoginWEmail",{genre})}
            >
            <Text style={styles.textstyle}>Login</Text>
          </TouchableOpacity>
        
          <TouchableOpacity 
            style={genre === 'man' ? styles.buttonContainer2Man : styles.buttonContainer2}
            onPress={() => navigation.navigate("SignIn",{genre})}
            >
            <Text style={styles.textstyle}>Sign Up</Text>
          </TouchableOpacity>
        
        <Animated.View style={{ opacity: animatedOpacity3 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpPro",{genre})}
          >
            <Text style={styles.textstyle1}>{displayedText2}</Text>
          </TouchableOpacity>
        </Animated.View>

      </LinearGradient>
    </View>
  );
}

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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: "70%",
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    width: "43%",
    height: 150,
    borderRadius: 0,
    marginHorizontal: 10,
  },
  buttonContainer: {
    width: "70%",
    height: "6%",
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: "#8A2F76",
    alignItems: 'center',
    marginBottom: '5%',
  },
  buttonContainer2: {
    width: "70%",
    height: "6%",
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: "#AD629D",
    alignItems: 'center',
    marginBottom: '15%',
  },
  buttonContainerMan: {
    width: "70%",
    height: "6%",
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: "#1F69A1",
    alignItems: 'center',
    marginBottom: '5%',
  },
  buttonContainer2Man: {
    width: "70%",
    height: "6%",
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: "#2C9AEE",
    alignItems: 'center',
    marginBottom: '15%',
  },
  textstyle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: '500',
  },
  textstyle1: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: '10%',
  },
  textstyle2: {
    fontSize: 34,
    color: "#FFFFFF",
    marginBottom: '10%',
    fontWeight: '500',
    textAlign: "center",
  }
});

export default Splash2;
