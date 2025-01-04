import React, { useState } from 'react';
import { View, StyleSheet, ScrollView ,Text} from 'react-native';
import CartItem from './widgets/CartItem';
import PromoCodeInput from './widgets/PromoCodeInput';
import TotalAmount from './widgets/TotalAmount';
import Recommendations from './widgets/Recommendations';
import Footer from '../widgets/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';

const MyBag = () => {
    const navigation = useNavigation();
  
  const [promoCode, setPromoCode] = useState('');
  const cartItems = [
    {
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
      title: 'Pullover',
      color: 'Black',
      size: 'L',
      unitPrice:51
    },
    {
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
      title: 'Pullover',
      color: 'Black',
      size: 'L',
      unitPrice:51
    },
    {
      image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=',
      title: 'Pullover',
      color: 'Black',
      size: 'L',
      unitPrice:51
    },
    // Add more items
  ];
  const recommendations = [
    { image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
    { image: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' },
    // Add more recommendations
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{fontSize:50,fontWeight:700 ,margin:10}} >My Bag</Text>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            {...item}
            onIncrement={() => console.log('Increment')}
            onDecrement={() => console.log('Decrement')}
          />
        ))}
        <PromoCodeInput
          value={promoCode}
          onChange={setPromoCode}
          onApply={() => console.log('Promo applied')}
        />
        <TotalAmount amount={1245} onCheckout={()=> navigation.navigate("Checkout")} />
        <Recommendations items={recommendations} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    marginBottom:"10%"
  },
  footerContainer: {
    padding: 10, // Adjust the padding as per your design
    backgroundColor: '#FFF', // Optional: Add a background color to the footer
  },
});

export default MyBag;
