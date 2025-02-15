import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import iconSettings from '../../../../assets/settings.png';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Add this import

import axios from 'axios'
import { PORT_URL ,PORT} from '../../../Port'

const ProfileCardView = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [load,setLoad]=useState(false)

  const [userCard,setUserCard]=useState([])
  const [gradeCard,setGradeCard]=useState([])
  const [userImg,setUserImg]=useState("https://th.bing.com/th/id/OIP.1mSyfMp-r01kxBYitbubbAHaHa?rs=1&pid=ImgDetMain")
  const [idgarde,setIdgrade]=useState(null);
  const [idUser, setIdUser] = useState(null);
  const [idAuth, setIdAuth] = useState(null);

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

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const idAuth = await AsyncStorage.getItem('idAuth');
        setIdAuth(idAuth);
      } catch (e) {
        console.error('Failed to fetch User ID:', e);
      }
    };

    fetchUserId();
  }, []);
 console.log(idgarde);
 
 const GetUserCart =async(iduser,idauth)=>{
  try{
    const response= await axios.post(PORT+'/users/UserCart',{idUser:iduser,idAuth:idauth});
    console.log('****************usercart*******************',response.data);
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
      const response= await axios.get(PORT+'/grades/gradename/'+id);
      if(response.status==200){
        setGradeCard(response.data)
        console.log(response.data);
        
      }
    
  }catch(e){
    console.log("error :"+e);
    
  }
 }

 useEffect(() => {
  // Initial data fetch
  GetUserCart(idUser, idAuth);

  // Add focus listener to reload data when screen comes into focus
  const unsubscribe = navigation.addListener('focus', () => {
    GetUserCart(idUser, idAuth);
    console.log('data reloadet')
  });

  // Cleanup subscription
  return unsubscribe;
}, [navigation, idUser, idAuth]);

  
  const optimizedImageUrl = `${userCard.profile_picture_url}?w=200&h=200&fit=fill`;
  console.log(`${PORT_URL}/uploads/profil/${userCard.role}/${userCard.user_id}/${userCard.profile_picture_url}`);


  return (
    <View style={styles.card}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image
          source={{uri:userCard.profile_picture_url?`${PORT_URL}/uploads/profil/${userCard.role}/${userCard.user_id}/${userCard.profile_picture_url}`:userImg}} 
          style={styles.profileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            Aziz Channoufi
            {/* {userCard.full_name} */}
            </Text>
          <Text style={styles.userGrade}>
            Debutant
            {/* {gradeCard.titre} */}
            </Text>
        </View>
        {/* Sales and Basket Section */}
        {/* <View style={styles.stats}> */}
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
                0
                {/* {gradeCard.sales} */}
                </Text>
            <Text style={styles.statLabel}>Sales</Text>
          {/* </View> */}
        </View>
      </View>

      {/* Scrollable Tag Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagRow}>
        {/* <Text style={styles.tag}>option1</Text>
        <Text style={styles.tag}>option2</Text>
        <Text style={styles.tag}>option3</Text>
        <Text style={styles.tag}>option4</Text>
        <Text style={styles.tag}>option5</Text> */}
      </ScrollView>
      {/* Bottom Buttons */}
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
    marginHorizontal: 'auto',
    backgroundColor: 'rgba(255, 182, 200, 0.31)',
    padding:10,
    borderRadius:8,
    minWidth:70,
    maxWidth:80
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AD669E',
  },
  statLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    marginTop:5
  },
  tagRow: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    marginVertical: 10,
    marginTop:55
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
    fontSize:13
    
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

export default ProfileCardView;
