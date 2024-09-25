import React from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './components/Login/LoginScreen';
import AlarmScreen from './components/Alarm/AlarmScreen';
import CadastroScreen from './components/Cadastro/CadastroScreen';
<<<<<<< HEAD
=======
import ProfileScreen from './components/Profile/ProfileScreen';

import { StatusBar } from 'expo-status-bar';
>>>>>>> 0b8fd46f02b0c189c4c7d6e80eff601c0ee3bd0a
import HomeScreen from './components/Home/HomeScreen';
import ProfileScreen from './components/Profile/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Alarm" component={AlarmScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
=======

        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Cadastro" component={CadastroScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
>>>>>>> 0b8fd46f02b0c189c4c7d6e80eff601c0ee3bd0a
  );
}
