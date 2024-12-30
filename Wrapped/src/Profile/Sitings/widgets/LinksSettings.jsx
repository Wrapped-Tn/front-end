import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert,TouchableOpacity ,ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import nextW from '../../../../assets/nextW.png'
const SettingsForm = () => {
    const ButtonElement=(text)=>{
        return(
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{text}</Text>
                    <Image
                    source={nextW}
                    style={{width:8,height:14,marginRight:10,marginLeft:10}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
return(
    <View style={styles.container}>
        {ButtonElement("Notifications And Prefernces")}
        {ButtonElement("privacy and security")}
        {ButtonElement("Regional Languages And Preferences")}
        {ButtonElement("Help And Support")}
        {ButtonElement("Display Settings")}
        <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      button:{
        backgroundColor: '#FFB6C8BB',
        marginHorizontal: 10,
        height:50,
        padding:10,
        borderRadius:10,
        marginBottom: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',

      },
      buttonText:{
        color:'#AD669E',
        fontSize:16,
        fontWeight:'bold'
      },
      button2:{
        marginHorizontal: 10,
        height:50,
        padding:10,
        borderRadius:10,
        borderWidth:2,
        borderColor:"#AD669E",
        marginBottom: 20,
        
      },
})
export default SettingsForm;
