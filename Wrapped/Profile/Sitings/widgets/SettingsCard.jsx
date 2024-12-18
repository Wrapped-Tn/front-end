import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import iconSettings from '../../../assets/settings.png';

const SettingsCard = ({ fullname, grade, idUser, PDP }) => {

    return(
        <View style={styles.card}>
        {/* User Info Section */}
        <View style={styles.userInfo}>
          <Image
            source={{ uri:  PDP }} // Replace with the actual image URL
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{fullname}</Text>
            <Text style={styles.userGrade}>{grade}</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <View style={styles.button}>
          <Image
            source={iconSettings}
            style={{width:24,height:24,marginRight:15,marginLeft:10}}
            />
            <Text style={styles.buttonText}>Settings</Text>
          </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fcecec', // Light pinkish background
        borderRadius: 15,
        padding: 20,
        margin: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderColor:"white",
        borderWidth:2
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
      },
      userDetails: {
        marginLeft: 10,
        flex: 1,
      },
      userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      userGrade: {
        fontSize: 14,
        color: '#888',
      },
    //   stats: {
    //     flexDirection: 'row',
    //   },
      statItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'rgba(255, 182, 200, 0.31)',
        padding:10,
        borderRadius:20,
        minWidth:170,
        maxWidth:170,
        flexDirection: 'row',
        borderWidth:2,
        borderColor:"#AD669E"
      },
      statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#AD669E',
      },
      statLabel: {
        fontSize: 14,
        color: 'black',
      },
      tagRow: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        marginVertical: 10,
        marginTop:35
      },
      tag: {
        backgroundColor: 'rgba(255, 182, 200, 0.31)',
        color: '#AD669E',
        // padding: 10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:2,
        paddingTop:2,
        marginHorizontal: 5,
        borderRadius: 20,
        fontSize:16
        
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: "20%",
      },
      button1: {
        flex: 1,
        backgroundColor: '#AD669E',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    
      },
      button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#AD669E',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent:'center'
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      ImageText: {
        color: '#AD669E',
        fontWeight: 'bold',
      },
      
})
export default SettingsCard;