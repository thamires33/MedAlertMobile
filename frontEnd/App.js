import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/Login/LoginScreen';
import AlarmScreen from './components/Alarm/AlarmScreen';
import CadastroScreen from './components/Cadastro/CadastroScreen';
import ProfileScreen from './components/Profile/ProfileScreen';

import { StatusBar } from 'expo-status-bar';
import HomeScreen from './components/Home/HomeScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Cadastro" component={CadastroScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );

};