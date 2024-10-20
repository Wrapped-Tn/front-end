import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Box, Progress, Center, NativeBaseProvider } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import nextW from '../../../assets/nextW.png';

const MySales = () => {

  const ExampleProgress = () => {
    return (
      <Center w="100%">
        <Box w="90%" maxW="400">
          <Progress
            value={45}
            mx="4"
            size="xs"
            bg="gray.300" // Background of the progress bar track
            _filledTrack={{
              bg: "white" // Color of the filled progress
            }}
          />
        </Box>
      </Center>
    );
  };

  const ButtonElement = (text) => {
    return (
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
          <Image
            source={nextW}
            style={{ width: 8, height: 14, marginRight: 10, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <View>
        <View style={styles.view2}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Vous êtes à 10 étoiles du niveau 3 !
          </Text>
          <View style={styles.view3}>
            {/* Level 2 Star and Text */}
            <View style={{ alignItems: 'center' }}> 
              <FontAwesome
                name='star'
                size={24}
                color='white'
              />
              <Text style={styles.textv3}>Niveau 2</Text>
            </View>
            {/* Level 3 Star and Text */}
            <View style={{ alignItems: 'center' }}>
              <FontAwesome
                name='star-o'
                size={24}
                color='white'
              />
              <Text style={styles.textv3}>Niveau 3</Text>
            </View>
          </View>
          <ExampleProgress />
        </View>
        {ButtonElement("ventes réalisées via recommandations")}
        {ButtonElement("commissions gagnées")}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  view2: {
    alignItems: "center",
    margin: "5%",
    padding: "5%",
    backgroundColor: "#AD669E",
    borderRadius: 10
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    marginBottom: "5%",
    width: "100%" // Ensures the two icons and texts are spaced properly
  },
  textv3: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5, // Space between icon and text
  },
  button: {
    backgroundColor: '#FFB6C8BB',
    marginHorizontal: 10,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#AD669E',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default MySales;