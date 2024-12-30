  import React, { useState, useEffect } from 'react';
  import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Keyboard,
  } from 'react-native';
  import Svg, { Path } from 'react-native-svg';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useRoute ,useNavigation } from '@react-navigation/native';
  import FilterPopup from './FilterPopup'; // Import the Popup component

  const { width } = Dimensions.get('window');

  const FooterWithConcaveShape = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const idUser = route?.params?.idUser ?? null; // Safely extract idUser, default to null if not present

    console.log('User ID:', idUser); // Check if idUser is being logged correctly

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    // Listen for keyboard events
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
        setIsKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
        setIsKeyboardVisible(false)
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const handleIconPress = (iconName, routeName) => {
      setSelectedIcon(iconName);
      // Pass idUser as a route param to AddPost and ProfilePage
      if (routeName === 'AddPost' || routeName === 'ProfilePage' || routeName === 'whatsHot' || routeName === 'descovery') {
        navigation.navigate(routeName, { idUser });
      } else {
        navigation.navigate(routeName);
      }
    };

    const handleCirclePress = () => {
      setIsPopupVisible(!isPopupVisible);
    };

    return (
      <View style={styles.container}>
        {isPopupVisible && (
          <FilterPopup 
            isPopupVisible={isPopupVisible} 
            setIsPopupVisible={setIsPopupVisible} 
          />
        )}

        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <Svg height="60" width={width} viewBox={`0 0 ${width} 60`} style={styles.svg}>
              <Path
                d={`M0 -3 H${width} V100 H0 Z M${width / 2 - 55} -8 Q${width / 2} 85 ${width / 2 + 55} -8 Z`}
                fill="white"
                stroke="#ccc"
                strokeWidth="0"
              />
            </Svg>

            <TouchableOpacity style={styles.circle} onPress={handleCirclePress}>
              <Image source={require('../../assets/Logo&Name.png')} style={styles.logo} />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleIconPress('flame', 'whatsHot')}>
                <Icon
                  name="flame-outline"
                  size={30}
                  color={selectedIcon === 'flame' ? '#AD669E' : 'black'}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress('eye', 'descovery')}>
                <Icon
                  name="eye-outline"
                  size={30}
                  color={selectedIcon === 'eye' ? '#AD669E' : 'black'}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress('add', 'AddPost')}>
                <Icon
                  name="add-outline"
                  size={30}
                  color={selectedIcon === 'add' ? '#AD669E' : 'black'}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress('person', 'ProfilePage')}>
                <Icon
                  name="person-outline"
                  size={30}
                  color={selectedIcon === 'person' ? '#AD669E' : 'black'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#F8F8F8',  
      zIndex: 9999,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: 'transparent',
      height: 80,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    svg: {
      position: 'absolute',
      bottom: 0,
    },
    circle: {
      position: 'absolute',
      bottom: 30,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#FFB6C8',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '110%',
      position: 'absolute',
      bottom: 10,
    },
    icon: {
      paddingHorizontal: 20,
    },
  });

  export default FooterWithConcaveShape;
