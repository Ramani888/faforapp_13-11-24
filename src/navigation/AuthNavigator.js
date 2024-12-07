import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import CountryScreen from '../screens/auth/CountryScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import screens from '../constants/screens';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Welcome from '../screens/auth/Welcome';
import storageKeys from '../constants/storageKeys';
import {getStorageValue} from '../utils/storageManager';
import strings from '../constants/strings';

const Stack = createStackNavigator();

const AuthNavigator = ({onBoardingState}) => {
  console.log('onBoardingState:>>>', onBoardingState);
  return (
    <Stack.Navigator
      initialRouteName={onBoardingState ? screens.country : screens.welcome}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.welcome} component={Welcome} />
      <Stack.Screen name={screens.country} component={CountryScreen} />
      <Stack.Screen name={screens.login} component={LoginScreen} />
      <Stack.Screen name={screens.forgetPassword} component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
