import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ActivityIndicator, Animated, Button, TouchableOpacity } from 'react-native';
import faker from 'faker'
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN = Dimensions.get('screen')
let DOT_SIZE = SCREEN.height * 0.03
let PRODUCTS = [
  {
    id: 0,
    image: require('../assets/productImages/drone1.png'),
    title: 'Phoenix V3',
    description: faker.lorem.words(10),
  },
  {
    id: 1,
    image: require('../assets/productImages/drone2.png'),
    title: 'Astronomer',
    description: faker.lorem.words(10),
  },
  {
    id: 2,
    image: require('../assets/productImages/drone3.png'),
    title: 'HyperPixel HD',
    description: faker.lorem.words(10),
  },
]
let colors = [
  '#E6E6ED', '#121212', '#E6E6ED'
]
export let fontColors = [
  '#121212', '#E6E6ED', '#121212'
]

function People({ navigation, route }) {
  let font = require('../assets/fonts/Bebas.ttf')
  let [fontsLoaded] = useFonts({ font });

  faker.locale = "en"
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
  const scrollX = useRef(new Animated.Value(0)).current;

  const BackDrop = ({ scrollX }) => {
    const bg = scrollX.interpolate({
      inputRange: colors.map((_, i) => i * SCREEN.width),
      outputRange: colors.map((bg) => bg)
    })
    return (
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bg, zIndex: -1 }]} />
    )
  }

  const BackButton = ({ scrollX }) => {
    const fontColor = scrollX.interpolate({
      inputRange: fontColors.map((_, i) => i * SCREEN.width),
      outputRange: fontColors.map((bg) => bg).reverse()
    })
    return(
      <Animated.Text style={[{ fontSize: 30, position: 'absolute', left: SCREEN.width * 0.1, top: SCREEN.height * 0.05, fontFamily: 'font', zIndex: 5, color: fontColor }]} onPress={() => navigation.goBack()}>back</Animated.Text>
    )
  }
  
  const renderItem = ({ item, index }) => {

    const inputRange = [(index - 1) * SCREEN.width, index * SCREEN.width, (index + 1) * SCREEN.width]
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [.1, 1, .1]
    })
    const slideXTitle = scrollX.interpolate({
      inputRange,
      outputRange: [SCREEN.width * 0.3, 0, -SCREEN.width * 0.3]
    })
    const slideXDescription = scrollX.interpolate({
      inputRange,
      outputRange: [SCREEN.width * 0.7, 0, -SCREEN.width * 0.7]
    })
    const fontColor = scrollX.interpolate({
      inputRange: fontColors.map((_, i) => i * SCREEN.width),
      outputRange: fontColors.map((color) => color).reverse()
    })

    return (
      <Animated.View style={styles.item}>
        <Animated.View style={{
          width: SCREEN.width,
          height: SCREEN.height * .5,
          display: 'flex',
          transform: [{ scale }],
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: SCREEN.height * 0.1,
          flex: 1,
        }}>
          <Image source={item.image} style={styles.img} />
        </Animated.View>
        <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Animated.Text style={[styles.title, {
            transform: [{ translateX: slideXTitle }],
            color: fontColor
          }]}>{item.title}</Animated.Text>
          <Animated.Text style={[styles.descriptionText, {
            transform: [{ translateX: slideXDescription }],
            color: fontColor
          }]}>{item.description}</Animated.Text>
          </View>
          <AnimatedButton onPress={() => navigation.navigate('Cockpit', {drone: item})} style={[styles.button, {backgroundColor: fontColor, shadowColor: 'black', transform: [{ translateX: slideXTitle }]}]}>
            <Animated.Text style={[styles.buttonText, { color: 'red' }]}>CONNECT</Animated.Text>
          </AnimatedButton>
        </View>
      </Animated.View>
    )
  }

  if (!fontsLoaded) {
    return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator size={60} color='red' />
    </View>
  }

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} scrollX={scrollX} />
      <View />
      <BackDrop scrollX={scrollX} />
      <Animated.FlatList
        snapToAlignment={"start"}
        snapToInterval={SCREEN.width}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRODUCTS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: SCREEN.height,
    width: SCREEN.width,
    display: 'flex',
  },
  img: {
    resizeMode: 'cover',
    width: SCREEN.width * .7,
    height: SCREEN.height * .2
  },
  title: {
    fontSize: 0.08 * SCREEN.width,
    fontFamily: 'font',
    color: 'black'
  },
  description: {
    fontSize: 0.03 * SCREEN.width,
    fontFamily: 'font',
    color: 'green'
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SCREEN.width * 0.2,
  },
  button: {
    backgroundColor: 'red',
    height: SCREEN.height * 0.05,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 15.14,
    elevation: 20,
  },
  textWrapper: {
    height: SCREEN.height * 0.15
  },
  buttonText: {
    fontSize: 0.07 * SCREEN.width,
    fontFamily: 'font',
    letterSpacing: SCREEN.width * 0.015
  },
});

export default People
