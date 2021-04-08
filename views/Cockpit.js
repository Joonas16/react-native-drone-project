import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, ActivityIndicator, Image } from 'react-native'
import BackButton from '../components/BackButton'
import { Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { AntDesign, Fontisto } from '@expo/vector-icons';

const SCREEN = Dimensions.get('screen')

function Cockpit({ navigation, route }) {
    let font = require('../assets/fonts/Bebas.ttf')
    let [fontsLoaded] = useFonts({ font });
    const video = useRef(null)
    const { drone } = route.params
    const [isDroneStarted, setIsDroneStarted] = useState(false)


    if (!fontsLoaded) {
        return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size={60} color='red' />
        </View>
    }

    return(
        <View style={styles.container}>
            <BackButton navigation={navigation}/>
            <View style={styles.content}>
                <View style={styles.videoWrapper}>
                    {
                        isDroneStarted ?
                        <Video
                            ref={video}
                            style={{width: '100%', height: '100%', borderRadius: 26, borderWidth: .5}}
                            source={{
                                uri: 'https://assets.mixkit.co/videos/preview/mixkit-landscape-of-a-mountainous-valley-at-sunrise-27028-large.mp4',
                            }}
                            shouldPlay
                            resizeMode="cover"
                            isLooping
                        />
                        :
                        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={drone.image} style={styles.img} />
                            <Text style={styles.header}>{drone.title}</Text>
                            <Fontisto style={styles.battery} name="battery-empty" size={SCREEN.width * 0.2} color="black" />
                            <Text style={styles.batteryText}>67%</Text>
                        </View>
                    }
                </View>
                <View style={styles.controls}>
                    {

                        !isDroneStarted ?

                        <TouchableHighlight style={styles.launch} underlayColor='white' onPress={() => setIsDroneStarted(true)}>
                            <Text style={styles.launchText}>LAUNCH</Text>
                        </TouchableHighlight>

                        : 
                        
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <TouchableHighlight>
                                <AntDesign name="caretleft" size={50} color="black" />
                            </TouchableHighlight>
                            <TouchableHighlight>
                            <AntDesign name="closecircle" size={50} color="black" />
                            </TouchableHighlight>
                            <TouchableHighlight>
                            <AntDesign name="caretright" size={50} color="black" />
                            </TouchableHighlight>
                        </View>
                    
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    content: {
        height: SCREEN.height,
        width: SCREEN.width * 0.8,
        marginTop: SCREEN.height * 0.12,
        flex: 1,
        borderRadius: 26,
    },
    videoWrapper: {
        flex: 3,
    },
    controls: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    launch: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '100%',
        height: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    launchText: {
        fontFamily: 'font', 
        fontSize: 40,
        letterSpacing: 4,
    },
    header: {
        fontSize: SCREEN.width * .15, 
        fontFamily: 'font',
        letterSpacing: 2,
        textShadowColor: 'black',
        textShadowRadius: 16,
        textShadowOffset: {
            width: 1,
            height: 4,
        },
    },
    img: {
        resizeMode: 'cover',
        width: SCREEN.width * .7,
        height: SCREEN.height * .2
    },
    battery: {
        position: 'absolute',
        left: SCREEN.width * 0.305,
        top: SCREEN.height * 0.46
    },
    batteryText: {
        position: 'absolute',
        left: SCREEN.width * 0.36,
        top: SCREEN.height * 0.49,
        fontFamily: 'font',
        fontSize: 25
    }
})

export default Cockpit
