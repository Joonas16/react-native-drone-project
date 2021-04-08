import React, { useRef, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { Video } from 'expo-av';
import * as Animatable from 'react-native-animatable'

const SCREEN = Dimensions.get('screen')

function Home({navigation}) {
    let font = require('../assets/fonts/Bebas.ttf')
    let logo = require('../assets/fonts/Unica.ttf')
    const video = useRef(null)

    const animation = useRef(new Animated.Value(0)).current;
    /* const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(animation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true
        }).start();
      }; */

    let [fontsLoaded] = useFonts({ font, logo });
  
    if(!fontsLoaded) {
      return <ActivityIndicator size='large' />
    }

    return (
        <View>
            <Video
                ref={video}
                style={{width: SCREEN.width, height: SCREEN.height}}
                source={{
                    uri: 'https://assets.mixkit.co/videos/preview/mixkit-bubbles-of-water-rising-to-the-surface-186-large.mp4',
                }}
                shouldPlay
                resizeMode="cover"
                isLooping
            />
            <View style={styles.centerLine} />
            <Animatable.Text iterationDelay={2000} animation='pulse' iterationCount='infinite' onPress={() => navigation.navigate('Products')} style={styles.yourProducts}>Your <Text style={{color: 'black'}}>Products</Text></Animatable.Text>
            <Animatable.Text iterationDelay={2000} animation='pulse' iterationCount='infinite' onPress={() => navigation.navigate('People')} style={styles.ourPeople}>Our <Text style={{color: 'black'}}>People</Text></Animatable.Text>
        </View>
    );
}
const styles = StyleSheet.create({
    centerLine: {
        position: 'absolute',
        top: SCREEN.height * 0.2, 
        left: SCREEN.width * 0.15, 
        height: SCREEN.height, 
        width: SCREEN.width * 0.4, 
        backgroundColor: 'black',
        borderRadius: 26,
    },
    ourPeople: {
        fontSize: SCREEN.width * 0.12, 
        fontFamily: 'font', 
        position: 'absolute',
        top: SCREEN.height * 0.5, 
        left: SCREEN.width * 0.37, 
        color: 'white',
        letterSpacing: 2
    },
    yourProducts: {
        fontSize: SCREEN.width * 0.12, 
        fontFamily: 'font', 
        position: 'absolute',
        top: SCREEN.height * 0.3, 
        left: SCREEN.width * 0.35, 
        color: 'white'
    },
})

export default Home