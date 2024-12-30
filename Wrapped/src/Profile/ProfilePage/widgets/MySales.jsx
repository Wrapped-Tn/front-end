import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions,ScrollView } from 'react-native';
import { Box, Progress, Center, NativeBaseProvider } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
// import nextW from '../../../assets/nextW.png';
import { BarChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;

const MySales = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { gradeId } = route.params;


  
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

  const ChartGrade=()=>{
    return(
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
    )
  }
  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const Chart1 =()=>{
    const startDate = new Date();
  const endDate = new Date();

  return (
    <View style={styles.container2}>
      <View style={styles.dateRange}>
        <Text style={styles.statValue} >De</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{formatDate(startDate).substring(0,5)}</Text>
        </TouchableOpacity>
        <Text style={styles.statValue}>à</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{formatDate(endDate).substring(0,5)}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <Text style={styles.countText}>115</Text>
          <Text style={styles.percentageText}>(20%)</Text>
          <Text style={styles.labelText}>Commandes Livrées</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.countText}>115</Text>
          <Text style={styles.percentageText}>(20%)</Text>
          <Text style={styles.labelText}>Commandes Non Livrées</Text>
        </View>
      </View>
    </View>
    )
  }

  const Chart2 =()=>{
    return(
      <View style={styles.container2}>
      <View>
        <Text style={styles.statValue}>Ventes par periodes</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <TouchableOpacity style={styles.chart2btn}>
          <Text style={styles.statValue}>Jour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chart2btn} >
          <Text style={styles.statValue}>Mois</Text>
        </TouchableOpacity  >
        <TouchableOpacity style={styles.chart2btn}>
          <Text style={styles.statValue}>Année</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      <BarChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43,28, 80, 99, 43,99, 43]
            }
          ]
        }}
        width={Dimensions.get('window').width+150 } // Width of the chart
        height={250} // Height of the chart
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#AD669E",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // Number of decimal places in y-axis values
          color: (opacity = 1) => `rgba(173, 102, 158, ${opacity})`, // Changed to #AD669E in rgba format
          style: {
            borderRadius: 2
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
            </ScrollView>

    </View>
    )
  }
  const Chart3 =()=>{
    return(
      <View style={styles.container2}>
      <View>
        <Text style={styles.statValue}>Ventes par Brand</Text>
      </View>
     
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      <BarChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43,28, 80, 99, 43,99, 43]
            }
          ]
        }}
        width={Dimensions.get('window').width+150 } // Width of the chart
        height={250} // Height of the chart
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#AD669E",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2, // Number of decimal places in y-axis values
          color: (opacity = 1) => `rgba(173, 102, 158, ${opacity})`, // Changed to #AD669E in rgba format
          style: {
            borderRadius: 2
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
            </ScrollView>

    </View>
    )
  }

  const Chart4=()=>{
    return(
      <View style={styles.ch4Container}>
      <View style={styles.ch4Header}>
        <Text style={styles.statValue}>My Top 5 Posts!</Text>
      </View>
      {Array.from({length:5}).map(e=>(
      <View style={styles.ch4RowContainer}>
        <View style={styles.ch4ImageContainer}>
          {/* Replace with actual image */}
          <Image source={{ uri: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg' }} style={styles.ch4Image} />
        </View>
        <Text style={styles.ch4PostTitle}>titre du post1</Text>
      <TouchableOpacity style={styles.ch4Button}>
        <Text style={styles.ch4ButtonText}>voir post</Text>
      </TouchableOpacity>
      </View>
      ))}
    </View>
    )
  }
  const Chart5=()=>{
    return (
      <View style={styles.ch5Container}>
        <Text style={styles.ch5HeaderText}>Commissions</Text>
        
        <View style={styles.ch5Row}>
          <View style={styles.ch5BalanceContainer}>
            <Text style={styles.ch4ButtonText}>Solde Disponible</Text>
          </View>
          
          <Text style={styles.ch5AmountText}>120dt</Text>
          
          <TouchableOpacity style={styles.ch5WithdrawButton}>
            <Text style={styles.ch5WithdrawText}>Retirer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ch5DetailsButton}>
            <Text style={styles.ch5DetailsText}>Details</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.ch5Row}>
          <View style={styles.ch5BalanceContainer}>
            <Text style={styles.ch4ButtonText}>Solde en cours</Text>
          </View>
          <Text style={styles.ch5AmountText}>120dt</Text>
          <TouchableOpacity style={styles.ch5DetailsButton}>
            <Text style={styles.ch5DetailsText}>Details</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.ch5Row}>
          <View style={styles.ch5BalanceContainer}>
            <Text style={styles.ch4ButtonText}>Solde retiré</Text>
          </View>
          <Text style={styles.ch5AmountText}>120dt</Text>
          <TouchableOpacity style={styles.ch5DetailsButton}>
            <Text style={styles.ch5DetailsText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
  }

  return (
    <NativeBaseProvider>
      <View>
        <ScrollView>
       {ChartGrade()}
       {Chart1()}
       {Chart2()}
       {Chart3()}
       {Chart4()}
       {Chart5()}
       </ScrollView>
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
  container2: {
    padding: 15,
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '70%',
    marginLeft:'5%'
  },
  dateButton: {
    marginHorizontal: 20,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#AD669E', 
    width:'45%',
    alignItems:'center'
  },
  dateText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight:'700'
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBox: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '49%',
    backgroundColor:'#AD669E',
    
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  percentageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  labelText: {
    fontSize: 14,
    color: '#ffffff',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AD669E',
  },
  chart2btn:{
    backgroundColor:'#fcecec',
    padding:3,
    borderRadius:14,
    borderWidth:2,
    borderColor:"#AD669E",
    width:'22%',
    alignItems:"center"
  },
  ch4Container: {
    padding: 16,
    borderRadius: 8,
  },
  ch4Header: {
    marginBottom: 12,
  },
  ch4HeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ch4RowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor:"#F7D8EEFF",
    borderRadius:15

  },
  ch4ImageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  ch4Image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ch4PostTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    color:'#AD669E',

  },
  ch4Button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  ch4ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    color:'#AD669E',

  },
  ch5Container: {
    padding: 16,
  },
  ch5HeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ch5Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ch5BalanceContainer: {
    flex: 2,
    padding: 12,
    backgroundColor: '#F5E8F7',
    borderRadius: 8,
  },
  ch5BalanceLabel: {
    color: '#AD669E',
    fontSize: 14,
  },
  ch5AmountText: {
    flex: 1,
    textAlign: 'center',
    color: '#AD669E',
    fontSize: 16,
    fontWeight:'700'
  },
  ch5WithdrawButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  ch5WithdrawText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ch5DetailsButton: {
    flex: 1,
    backgroundColor: '#AD669E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  ch5DetailsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MySales;
