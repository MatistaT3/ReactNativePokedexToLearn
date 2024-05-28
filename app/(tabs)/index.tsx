import React from 'react';
import { AppRegistry } from 'react-native';
import App from '../App';
import { expo as appConfig } from '../../app.json';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, Button, Heading } from 'native-base';
import { Text, View } from '@/components/Themed';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const appName = appConfig.name;
AppRegistry.registerComponent(appName, () => App);

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading size='4xl' fontSize={50} style={styles.title}>
          Pokédex
        </Heading>
        <View lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
        <Button
          style={styles.button}
          variant='subtle'
          onPress={() => navigation.navigate('PokeGrid')}
        >
          Empezar
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020629',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    marginTop: 20,
  },
});
