import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageWidget from './Widgets/ImageWidget';
import TagsWidget from './Widgets/TagsWidget';
import CaptionWidget from './Widgets/CaptionWidget';
import ButtonsWidget from './Widgets/ButtonsWidget';
import ActionsWidget from './Widgets/ActionsWidget';
import CommentWidget from './Widgets/CommentWidget.jsx';
import SizeSelectorPopup from './Widgets/SizeSelectorPopup.jsx';
import Footer from '../../widgets/Footer.jsx';

const ArticleDetails = () => {
    const imageSource = { uri: 'https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c=' };
    const tags = ['React', 'Native', 'Widgets'];
    const caption = 'This is a sample caption';
    const buttons = ['Button 1', 'Button 2', 'Button 3'];
    const [showPop,setShowPop]=useState(false)
    const handleAddCart=()=>{
      console.log('hello');
      setShowPop(true);
    }
    const handleClosePopup = () => {
      setShowPop(false);
    };
    return (
        <View style={styles.mainContainer}>
            <ImageWidget imageSource={imageSource} />
            <ActionsWidget handleAddCart={handleAddCart} />
            
            <View style={styles.captionContainer}>
                <CaptionWidget caption={caption} />
                <TagsWidget tags={tags} />
                <View style={{height:'78%'}}>
                <CommentWidget />
                </View>
            </View>
            <SizeSelectorPopup visible={showPop} onClose={handleClosePopup} />
            {/* <ButtonsWidget buttons={buttons} /> */}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'column', // Assurez-vous que les éléments sont empilés verticalement
    },
    captionContainer: {
        flexDirection: 'column', // Assurez-vous que les éléments sont empilés verticalement
        padding: 10,
        backgroundColor: '#FFF2F6FF',
        borderRadius: 10,
        marginTop:'-48%',
        height:'55%'
        // Retirez position: 'Absolute' pour éviter de couvrir d'autres éléments
    },
});

export default ArticleDetails;