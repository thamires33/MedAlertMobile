// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Home/HomeScreen';
import AlarmScreen from '../Alarm/AlarmScreen';
import MedicamentosScreen from '../Medicamentos/MedicamentosScreen';
import LogoffScreen from '../Logoff/LogoffScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Medicamentos">
      <Drawer.Screen name="Home" component={HomeScreen} options={{drawerLabel: 'Receitas'}}/>
      <Drawer.Screen name="Medicamentos" component={MedicamentosScreen} />
      <Drawer.Screen name="Cadastrar medicamento" component={AlarmScreen} options={{ drawerLabel: 'Cadastrar medicamento' }}/>
      <Drawer.Screen name="Logoff" component={LogoffScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
