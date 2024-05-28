import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(tabs)/index';
import PokeGrid from './PokeGrid';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='PokeGrid' component={PokeGrid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
