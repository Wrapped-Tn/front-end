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
import { useRoute, useNavigation } from '@react-navigation/native';
import FilterPopup from './FilterPopup'; // Import the popup component
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const FooterWithConcaveShape = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // State for storing the user ID
  const [idUser, setIdUser] = useState(null);

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('idUser');
        setIdUser(userId);
      } catch (e) {
        console.error('Failed to fetch User ID:', e);
      }
    };

    fetchUserId();
  }, []);

  // State for managing selected icon and popup visibility
  const [selectedIcon, setSelectedIcon] = useState('person');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // State to track keyboard visibility
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Keyboard event listeners
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

  // Handle icon press to navigate and save the selected icon
  const handleIconPress = async (iconName, routeName) => {
 
    try {
      await AsyncStorage.setItem('selectedIcon', iconName);
      navigation.navigate(routeName, { idUser });
    } catch (error) {
      console.error('Failed to save selected icon:', error);
    }
  };

  // Toggle popup visibility
  const handleCirclePress = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Load previously selected icon from AsyncStorage
  useEffect(() => {
    const loadSelectedIcon = async () => {
      try {
        const savedIcon = await AsyncStorage.getItem('selectedIcon');
        console.log('Saved icon:', savedIcon);
        
        if (savedIcon) {
          setSelectedIcon(savedIcon);
        }
      } catch (error) {
        console.error('Failed to load selected icon:', error);
      }
    };

    loadSelectedIcon();
  }, [selectedIcon]);

  return (
    <View style={styles.container}>
      {/* Popup component */}
      {isPopupVisible && (
        <FilterPopup 
          isPopupVisible={isPopupVisible} 
          setIsPopupVisible={setIsPopupVisible} 
        />
      )}

      {/* Footer with concave shape */}
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

          {/* Central circle with logo */}
          <TouchableOpacity style={styles.circle} onPress={handleCirclePress}>
            <Image source={require('../../assets/Logo&Name.png')} style={styles.logo} />
          </TouchableOpacity>

          {/* Icon navigation */}
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

// Styles
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
