import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ProfileCardView from './Widgets/ProfileCardView';
import VisitorProfilePosts from './Widgets/VisitorProfilePosts';
import Footer from '../../widgets/Footer';

import { useRoute, useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ViewProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { idUser, idAuth } = route.params;

  const [activeTab, setActiveTab] = useState(0);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const tabWidth = screenWidth / 2;

  // Handle tab switch and animate underline
  const handleTabSwitch = (index) => {
    setActiveTab(index);
    Animated.timing(underlinePosition, {
      toValue: index * tabWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <ProfileCardView
            // idUser={idUser} idAuth={idAuth}
            />
          </View>
        </View>

        {/* Main Content Section */}
        <View style={styles.content}>
          <VisitorProfilePosts />
        </View>
      </View>
    </ScrollView>
    <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  nav: {
    height: "12%",
    // marginBottom: 90,
  },
  Card: {
    position: 'absolute',
    top: '10%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  gradient: {
    flex: 1,
  },
  content: {
    marginTop: '15%', // Adjust margin to avoid overlapping with the navigation section
    paddingHorizontal: 5,
    marginBottom:'50%'
  },
});

export default ViewProfile;
