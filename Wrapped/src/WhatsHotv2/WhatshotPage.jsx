import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AppBar from '../WhatsHotv2/widgets/AppBar.jsx';
import HotPosts from '../Post/PostDetail/HotPosts.jsx';
import Footer from '../widgets/Footer.jsx';

const WhatsHotV2 = () => {
    return (
        <SafeAreaView style={styles.safeArea}> 
        
            <View style={styles.container}>
              <AppBar />
                    <View style={styles.content}>
                <ScrollView style={styles.scrollContainer}>
                    {[1, 2, 3,4,5,6,7,8,9].map((item) => (
                        <HotPosts
                            key={item}
                            userName={`User ${item}`}
                            userIcon={`https://th.bing.com/th/id/OIP.vzx5Y7Bt_zpR8SYLJ2RoLwHaKe?rs=1&pid=ImgDetMain`}
                            postDate={`2025-01-14`}
                            imageSource={{uri:`https://th.bing.com/th/id/OIP.vzx5Y7Bt_zpR8SYLJ2RoLwHaKe?rs=1&pid=ImgDetMain`}}
                            caption={`Ceci est la légende du post ${item}`}
                            tags={[`#tag${item}`, `#post${item}`]}
                        />
                    ))}
                </ScrollView>
            </View>
                <Footer />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFFFF',
    },
    container: {
        flex: 1,
    },
    content: {
        // flex: 1,
        marginTop: 80,
        marginBottom: 80,
        // padding: 10,
      },
    scrollContainer: {
        // flex: 1,
        paddingHorizontal: 10,
    },
});

export default WhatsHotV2;
