import React from 'react'
import { Dimensions, Text } from 'react-native'

const SCREEN = Dimensions.get('screen')

export default BackButton = ({ navigation }) => {

    return (
        <Text style={[{ fontSize: 30, position: 'absolute', left: SCREEN.width * 0.1, top: SCREEN.height * 0.05, fontFamily: 'font', zIndex: 5, color: '#000000' }]} onPress={() => navigation.goBack()}>back</Text>
    )
}