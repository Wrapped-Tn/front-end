import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity,SafeAreaView, Text, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import UpdateCard from './widgets/UpdateCard'
import UserForm from './widgets/UpdateInputs';
import Footer from '../../widgets/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from "axios";
import {PORT} from '../../Port';

const screenWidth = Dimensions.get('window').width;
const UpdatePage = () => {
  const navigation = useNavigation();
    const route = useRoute();
    const { name, grade , idUser,idAuth,PDP ,userCards} = route.params;

    const [user,setUser]=useState([])
    const [loading, setLoading] = useState(false);
    
    console.log(user);
    
  const GetOneUser=async()=>{
    try{
      const response=await axios.get(PORT+'/users/'+idUser.idUser)
      if(response.status===200){
        setUser(response.data)
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    GetOneUser()
  },[])



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
                <UpdateCard userdata={userCards} fullname={name} grade={grade} idUser={idUser} idAuth={idAuth} PDP={PDP}/>
            </View>
          </View>
          <SafeAreaView style={{ flex: 1,marginTop:'10%' }}>
      <UserForm OneUser={user} />
    </SafeAreaView>

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
export default UpdatePage;