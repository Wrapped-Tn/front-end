import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import iconSettings from '../../../assets/settings.png';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Port from '../../../Port'

const ProfileCard = ({idUser,idAuth}) => {
  const navigation = useNavigation();
  const route = useRoute();
console.log(idUser,idAuth);

  const [load,setLoad]=useState(false)

  const [userCard,setUserCard]=useState([])
  const [gradeCard,setGradeCard]=useState([])

  const [idgarde,setIdgrade]=useState(null);

 console.log(idgarde);
 
 const GetUserCart =async(iduser,idauth)=>{
  try{
    const response= await axios.post(Port+'/users/UserCart',{idUser:iduser,idAuth:idauth});
    console.log(response.data);
    if(response.status==200){
      setUserCard(response.data)
      GetGradeCart(response.data.grade)
      
    }
    else{
      console.log(response.status)
    }
  }catch(e){
    throw new Error('Error :'+e)
  }
 }

 const GetGradeCart =async(id)=>{
  try{
      const response= await axios.get(Port+'/grades/gradename/'+id);
      if(response.status==200){
        setGradeCard(response.data)
        console.log(response.data);
        
      }
    
  }catch(e){
    console.log("error :"+e);
    
  }
 }

  useEffect(()=>{
    GetUserCart(idUser,idAuth)
    // if(!idgarde){
    //   GetGradeCart(idgarde)
    //   // setLoad(!load)
    // }
    // else{
    //   GetUserCart(idUser.idUser)
    //   GetGradeCart(idgarde);
    // }
  },[load])

  
  const optimizedImageUrl = `${userCard.profile_picture_url}?w=200&h=200&fit=fill`;
  console.log(optimizedImageUrl);


  return (
    <View style={styles.card}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image
          source={{uri:userCard.profile_picture_url?userCard.profile_picture_url:"https://th.bing.com/th/id/OIP.1mSyfMp-r01kxBYitbubbAHaHa?rs=1&pid=ImgDetMain"}} // Replace with the actual image URL
          style={styles.profileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userCard.full_name}</Text>
          <Text style={styles.userGrade}>{gradeCard.titre}</Text>
        </View>
        {/* Sales and Basket Section */}
        <View style={styles.stats}>
          <TouchableOpacity onPress={()=>{navigation.navigate("MySales",{gradeId:userCard.grade} )}} >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{gradeCard.sales}</Text>
            <Text style={styles.statLabel}>Sales</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>800</Text>
            <Text style={styles.statLabel}>Basket</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Tag Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagRow}>
        <Text style={styles.tag}>option1</Text>
        <Text style={styles.tag}>option2</Text>
        <Text style={styles.tag}>option3</Text>
        <Text style={styles.tag}>option4</Text>
        <Text style={styles.tag}>option5</Text>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button1}
        onPress={()=>{
          navigation.navigate("SettingsPage", )
        }}
        >
            <Image
            source={iconSettings}
            style={{width:24,height:24,marginRight:15,marginLeft:10}}
            />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
          navigation.navigate("UpdatePage",{name:userCard.full_name,grade:gradeCard.titre,idUser} );
        }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  stats: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 182, 200, 0.31)',
    padding:10,
    borderRadius:8,
    minWidth:70,
    maxWidth:100
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
    marginTop: 10,
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
    backgroundColor: '#AD669E',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileCard;
