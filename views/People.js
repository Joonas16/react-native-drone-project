import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ActivityIndicator, Animated, Button } from 'react-native';
import faker from 'faker'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable'
import BackButton from '../components/BackButton'

const SCREEN = Dimensions.get('screen')

function People({ navigation, route }) {
  let font = require('../assets/fonts/Bebas.ttf')
  let [fontsLoaded] = useFonts({ font });

  faker.locale = "en"
  let colors = [
    {
      key: 1,
      color: '#CEC9DF'
    },
    {
      key: 2,
      color: '#fdf1ca'
    },
    {
      key: 3,
      color: '#edccb6'
    },
    {
      key: 4,
      color: '#b2c6de'
    },
    {
      key: 6,
      color: '#c8dcb8'
    },
    {
      key: 7,
      color: '#f1d8c5'
    },
    {
      key: 8,
      color: '#f9f0c2'
    },
    {
      key: 9,
      color: '#b1d4ec'
    },
    {
      key: 10,
      color: '#b3b8df'
    },
    {
      key: 11,
      color: '#ece9dd'
    },
  ]
  const scrollX = useRef(new Animated.Value(0)).current;

  const createUser = () => {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      jobTitle: faker.name.jobTitle(),
      address: faker.address.streetAddress(),
      bio: faker.lorem.words(50),
      image: faker.image.avatar(),
      phone: faker.phone.phoneNumber()
    }
  }

  const createUsers = (numUsers = 5) => {
    return new Array(numUsers)
      .fill(undefined)
      .map(createUser);
  }

  let users = createUsers(10)

  const renderItem = ({ item, index }) => {

    const inputRange = [(index - 1) * SCREEN.width, index * SCREEN.width, (index + 1) * SCREEN.width]
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [.5, 1, .5]
    })

    return (
      <View style={[styles.item]}>
        <Animated.View style={{
          backgroundColor: colors[index % colors.length].color,
          width: SCREEN.width * 0.8,
          height: SCREEN.height * 0.6,
          borderRadius: 26,
          display: 'flex',
          transform: [{ scale }]
        }}>
          <View style={[styles.card]}>
            <View style={styles.info}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={{ display: 'flex', flexDirection: 'column', flex: 2, marginLeft: SCREEN.width * 0.05 }}>
                <Text style={{ fontSize: item.name.length < 15 ? 0.06 * SCREEN.width : 0.05 * SCREEN.width, fontFamily: 'font' }}>{item.name}</Text>
                <Text style={styles.infoText}>{item.jobTitle}</Text>
                <Text style={styles.infoText}>{item.email}</Text>
                <Text style={styles.infoText}>{item.phone}</Text>
              </View>
            </View>
            <View style={styles.other}>
              <Text style={{ margin: 20, textTransform: 'capitalize', fontFamily: 'font', letterSpacing: 3 }}>{item.bio}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    )

  }
  if (!fontsLoaded) {
    return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator size={100} color='#000000' />
    </View>
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.bg2}
      />
      <BackButton navigation={navigation} scrollX={scrollX} />
      <View />
      <LinearGradient
        colors={['rgba(00, 10, 20, 0.9)', 'transparent']}
        style={styles.bg}
      />
      <Animatable.Text animation='bounceInLeft' style={{ fontSize: 50, position: 'absolute', left: SCREEN.width * 0.1, top: SCREEN.height * 0.23, fontFamily: 'font' }}>
        Our people
      </Animatable.Text>
      <Animated.FlatList
        snapToAlignment={"start"}
        snapToInterval={SCREEN.width}
        pagingEnabled
        horizontal
        data={users}
        keyExtractor={item => `${item.address}` + `${item.name}`}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
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
    backgroundColor: '#FFFFFF'
  },
  item: {
    flex: 1,
    width: SCREEN.width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  bg: {
    position: 'absolute',
    top: SCREEN.height * 0.1,
    height: SCREEN.height * 2,
    width: SCREEN.width,
    borderRadius: 26,
    transform: [
      {
        rotate: '-40deg',
      },
    ]
  },
  bg2: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: -300,
    left: 100,
    height: 900,
    width: 600,
    borderRadius: 26,
    transform: [
      {
        rotate: '50deg',
      },
    ]
  },
  card: {
    margin: 20,
    display: 'flex',
    flex: 1
  },
  img: {
    resizeMode: 'contain',
    width: '33%',
    height: '100%',
    borderRadius: 10,
    flex: 1
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  other: {
    flex: 4,
    borderRadius: 26,
    marginTop: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    justifyContent: 'center',
    alignContent: 'center'
  },
  infoText: {
    fontSize: 0.035 * SCREEN.width,
    fontFamily: 'font'
  },
});

export default People
