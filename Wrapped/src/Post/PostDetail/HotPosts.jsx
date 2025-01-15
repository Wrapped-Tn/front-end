import React, { useState, useRef } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import HotImages from './HotWidgets/HotImages.jsx';
import UserDetails from './Widgets/UserDetailsPost.jsx';
import HotActionsWidget from './HotWidgets/HotActionsWidget';
import CaptionWidget from './Widgets/CaptionWidget';
import TagsWidget from './Widgets/TagsWidget';
import SizeSelectorPopup from './Widgets/SizeSelectorPopup.jsx';
import CommentWidget from './Widgets/CommentWidget.jsx';


const HotPosts = ({ imageSource, userName, userIcon, postDate,caption,tags}) => {
    const [imageHeight, setImageHeight] = useState(0); // State pour enregistrer la hauteur de l'image
    const imageContainerRef = useRef(null); // Référence pour obtenir les dimensions de l'image
    const [showPop,setShowPop]=useState(false)
    const [showComnt,setShowComnt]=useState(false)
    
    const handleImageLayout = (event) => {
        const { height } = event.nativeEvent.layout; // Récupère la hauteur de l'image
        setImageHeight(height); // Met à jour la hauteur
    };
    const handleClosePopup = () => {
        setShowPop(false);
      };
    const handleComnt = () => {
        setShowComnt(!showComnt);
      };
    const handleAddCart = () => {
        console.log('hello');
        setShowPop(true);
    };

    return (
        <View style={styles.mainContainer}>
            <UserDetails 
                userName={userName}
                userIcon={userIcon}
                postDate={postDate}
            />
            <View
                ref={imageContainerRef}
                onLayout={handleImageLayout} // Récupère les dimensions au rendu
            >
                <HotImages imageSource={imageSource} />
            </View>
            <View
                style={[
                    styles.actions,
                    {
                        top: imageHeight - 70, // Position dynamique basée sur la hauteur de l'image
                    },
                ]}
            >
                <HotActionsWidget handleAddCart={handleAddCart} handleComnt={handleComnt} showComnt={showComnt}/>
            </View>
            <View style={styles.captionAndTagsContainer}>
            <CaptionWidget caption={caption} />
                <TagsWidget tags={tags} />
            </View>
        {showComnt&& <View>
            <CommentWidget />
            </View>}
            <SizeSelectorPopup visible={showPop} onClose={handleClosePopup} />
        </View>
    );
};

const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            position: 'relative',
        },
        actions: {
            position: 'absolute',
            right: '2%',
            width: '100%',
        },
        captionAndTagsContainer: {
            paddingLeft:10,
            marginTop: -90, // Ajustez cette valeur pour réduire ou augmenter l'espace

        },
    });

export default HotPosts;
