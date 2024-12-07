import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const FooterWithConcaveShape = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { idUser } = route.params;
console.log(idUser);

  // State to manage the selected icon
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Handle icon click
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
    if(iconName==="person"){
      navigation.navigate("ProfilePage",{idUser:idUser} );
    }
    if(iconName==="add"){
      navigation.navigate("AddPost",{idUser:idUser});
    }
  };

  // Handle circle click
  const handleCirclePress = () => {
    console.log('Circle clicked!');
    // Add logic for circle press here
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        {/* The concave shape */}
        <Svg height="60" width={width} viewBox={`0 0 ${width} 60`} style={styles.svg}>
          <Path
            d={`M0 -3 H${width} V100 H0 Z M${width / 2 - 55} -8 Q${width / 2} 85 ${width / 2 + 55} -8 Z`}
            fill="white"  // Adjust this to match your background color
            stroke="#ccc"
            strokeWidth="0"
          />
        </Svg>

        {/* The circle with logo (make clickable) */}
        <TouchableOpacity style={styles.circle} onPress={handleCirclePress}>
          <Image source={require('../assets/Logo&Name.png')} style={styles.logo} />
        </TouchableOpacity>

        {/* Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleIconPress('flame')}>
            <Icon
              name="flame-outline"
              size={30}
              color={selectedIcon === 'flame' ? '#AD669E' : 'black'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress('eye')}>
            <Icon
              name="eye-outline"
              size={30}
              color={selectedIcon === 'eye' ? '#AD669E' : 'black'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress('add')}>
            <Icon
              name="add-outline"
              size={30}
              color={selectedIcon === 'add' ? '#AD669E' : 'black'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress('person')}>
            <Icon
              name="person-outline"
              size={30}
              color={selectedIcon === 'person' ? '#AD669E' : 'black'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    backgroundColor: '#F0F0F000',
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
    bottom: 30, // Adjust to position the circle correctly
    width: 80, // Adjust size
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFB6C8',
    borderWidth: 0,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60, // Adjust size
    height: 60,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '110%',
    paddingHorizontal: 0,
    position: 'absolute',
    bottom: 10,
  },
  icon: {
    paddingHorizontal: 20, // Adjust spacing between icons
    
  },
});

export default FooterWithConcaveShape;
