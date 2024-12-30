import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ProfileCard from './widgets/ProfileCartPro';
import MyFashionistas from './widgets/myFashionista/MyFashionistas';
import MyOrders from './widgets/myOrders/MyOrders';
import Footer from '../../widgets/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ProfilePro = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token ,idUser , idAuth } = route.params;

  const [activeTab, setActiveTab] = useState(0);
  const underlinePosition = useRef(new Animated.Value(0)).current; // This controls the underline position
  const tabWidth = screenWidth / 2; // Divide screen width by number of tabs

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
      {/* Navigation Section */}
      <View style={styles.nav}>
        <LinearGradient
          colors={['rgba(173,102,158,1)', 'rgba(255,182,200,1)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        />
        <View style={styles.Card}>
          <ProfileCard idUser={idUser} idAuth={idAuth} />
        </View>
      </View>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabSwitch(0)} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 0 ? styles.activeText : null]}>My Fashionistas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabSwitch(1)} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 1 ? styles.activeText : null]}>My orders </Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.underline,
            {
              width: tabWidth,
              transform: [{ translateX: underlinePosition }],
            },
          ]}
        />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {activeTab === 0 && <MyFashionistas />}
        {activeTab === 1 && <MyOrders />}
      </View>

      {/* Fixed Footer */}
      <View style={styles.footerContainer}>
        <Footer idUser={idUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    height: "25%",
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '20%',
    position: 'relative', // Needed for underline positioning
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 10,
    width: screenWidth / 2, // Each tab takes up half the screen width
  },
  tabText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  activeText: {
    color: '#AD669E',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#ffb6c8', // Color of the underline
  },
  contentContainer: {
    flex: 1,
    paddingBottom: "50%",
  },
  footerContainer: {},
});

export default ProfilePro;
