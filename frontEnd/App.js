import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/Login/LoginScreen';
import AlarmScreen from './components/Alarm/AlarmScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );

};