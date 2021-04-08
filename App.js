import * as React from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import People from './views/People'
import Home from './views/Home'
import Products from './views/Products'
import Cockpit from './views/Cockpit'

const SCREEN = Dimensions.get('screen')

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen 
          options={{
            headerShown: false,
            title: ' ',
            headerLeftContainerStyle: {paddingLeft: SCREEN.width * 0.06},
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name="People" component={People} 
        />
        <Stack.Screen 
          options={{
            headerShown: false,
            title: ' ',
            headerLeftContainerStyle: {paddingLeft: SCREEN.width * 0.06},
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name="Products" component={Products} 
        />
        <Stack.Screen 
          options={{
            headerShown: false,
            title: ' ',
            headerLeftContainerStyle: {paddingLeft: SCREEN.width * 0.06},
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name="Cockpit" component={Cockpit} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 100,
    damping: 300,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default App;