import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import screens from '../constants/screens';
import {DrawerContent} from './DrawerContent';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={screens.tabBar} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
