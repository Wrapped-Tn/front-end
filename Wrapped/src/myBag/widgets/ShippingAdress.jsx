import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HStack, Checkbox, Center, NativeBaseProvider } from "native-base";

const ShippingAddress = ({ name, address, onChange, checkbox }) => {
  const [showCheckbox, setShowCheckbox] = useState(checkbox);
  const [isChecked, setIsChecked] = useState(false);


  const Check = () => {
    return <HStack space={6}>
        <Checkbox shadow={2} value="test" colorScheme="purple" accessibilityLabel="This is a dummy checkbox" >
        Use as the shipping address
        </Checkbox>
      </HStack>;
  };

  return (
    <NativeBaseProvider>
    <View style={styles.card}>
      {/* Nom et bouton Modifier */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 10 }}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={onChange}>
          {showCheckbox ? (
            <Text style={styles.changeText}>Edit</Text>
          ) : (
            <Text style={styles.changeText}>Change</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Adresse */}
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address}</Text>
      </View>
      {/* Checkbox */}
          { showCheckbox && (
              <View style={styles.checkboxContainer}>
                <Check/>
              </View>
            )
          }
   
    </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addressContainer: {
    marginTop: 10,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  changeText: {
    fontSize: 14,
    color: "#AD669E",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
});

export default ShippingAddress;
