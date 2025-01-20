import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import ImageWidget from './Widgets/ImageWidget';
import TagsWidget from './Widgets/TagsWidget';
import CaptionWidget from './Widgets/CaptionWidget';
import ButtonsWidget from './Widgets/ButtonsWidget';
import ActionsWidget from './Widgets/ActionsWidget';
import CommentWidget from './Widgets/CommentWidget.jsx';
import SizeSelectorPopup from './Widgets/SizeSelectorPopup.jsx';
import UserDetails from './Widgets/UserDetailsPost.jsx';
import Footer from '../../widgets/Footer.jsx';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {PORT} from '../../Port.jsx';

const ArticleDetails = () => {
        const route = useRoute();
        const {PostId,idUser} = route.params;
        const [onePost, setOnePost] = useState(null); // Initialisez à null
        const [userProfile, setUserProfile] = useState(null); // Initialisez à null
        const [showPop, setShowPop] = useState(false);
        const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement
        
        const handleAddCart = () => {
            setShowPop(true);
        };
        
        const handleClosePopup = () => {
            setShowPop(false);
        };
        
        // Formatage de la date
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        }
    
        // Récupérer un post spécifique
        const getOnePost = async () => {
            try {
                const response = await axios.get(`${PORT}/posts/posts/user/${idUser}/${PostId}`);
                if (response.status === 200) {
                    setOnePost(response.data);
                } else {
                    console.log('Erreur dans la récupération du post');
                }
            } catch (e) {
                console.log(e);
            }
        };
    
        // Récupérer le profil de l'utilisateur
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`${PORT}/users/userProfile/${idUser}`);
                if (response.status === 200) {
                    setUserProfile(response.data);
                } else {
                    console.log('Erreur dans la récupération du profil');
                }
            } catch (e) {
                console.log(e);
            }
        };
    
        // Charger les données au montage
        useEffect(() => {
            setIsLoading(true); // Déclenche le chargement
            getOnePost();
            getUserProfile();
        }, []);
    
        // Lorsque les deux données sont chargées, on modifie l'état de chargement
        useEffect(() => {
            if (onePost && userProfile) {
                setIsLoading(false); // Données chargées
            }
        }, [onePost, userProfile]);
    
        if (isLoading) {
            return (
                <View style={styles.mainContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Chargement des données...</Text>
                </View>
            );
        }
    
        console.log('OnePost :', onePost.post.PostImages[0].PostPositions);
        
        // Si les données sont prêtes
        const imageSource = { uri: onePost.post.PostImages[0].url };
        const caption = onePost.post.description;
        const tags = [...onePost.post.category, ...onePost.post.occasion];

////////////////////////////////////////////////////AXIOS///////////////////////////////////////////////////////////////////    
    return (
        <View style={styles.mainContainer}>
            <UserDetails
                userName={userProfile.full_name}
                userIcon={userProfile.profile_picture_url}
                postDate={onePost.post.createdAt?formatDate(onePost.post.createdAt):'this week'}
            />
            <ImageWidget imageSource={imageSource} brands={onePost.post.PostImages[0].PostPositions} />
            <ActionsWidget handleAddCart={handleAddCart} />
            
            <ScrollView style={styles.captionContainer}>
            <CaptionWidget
                caption={caption}
                />
                <TagsWidget tags={tags} />
                <View style={{height:'78%'}}>
                <CommentWidget />
                </View>
            </ScrollView>
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
        height:'55%',
        marginBottom: '5%',
        height: '100%',
        // Retirez position: 'Absolute' pour éviter de couvrir d'autres éléments
    },
});

export default ArticleDetails;