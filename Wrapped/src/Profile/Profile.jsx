import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity,SafeAreaView, Text, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
// import SettingsCard from './widgets/SettingsCard'
import Footer from '../../widgets/Footer';
const screenWidth = Dimensions.get('window').width;
const SettingsPage = () => {

    return(
        <View style={styles.container}>
        {/* Navigation Section */}
        <View style={styles.nav}>
          <LinearGradient
            colors={['rgba(173,102,158,1)', 'rgba(255,182,200,1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradient}
          />
            <View style={styles.Card}>
                {/* <SettingsCard/> */}
            </View>
          </View>
          {/* <SafeAreaView style={{ flex: 1,marginTop:'10%' }}>
    </SafeAreaView> */}

          <View style={styles.footerContainer}>
        <Footer />
      </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      nav: {
        height: "25%", // Height of the nav section
      },
      gradient: {
        flex: 1, // Make the gradient fill the entire nav section
      },
      Card: {
        position: 'absolute',
        top: '10%',
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity (0 to 1)
        shadowRadius: 3.5,
      },
})
export default SettingsPage;