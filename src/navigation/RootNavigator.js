import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import SplashScreen from '../screens/SplashScreen';
import {useSelector} from 'react-redux';
import {getStorageValue} from '../utils/storageManager';
import storageKeys from '../constants/storageKeys';
import strings from '../constants/strings';
import {Alert} from 'react-native';

const RootNavigator = () => {
  const {isLoggedIn} = useSelector(state => state.userLogin);
  const {isLoggedOut} = useSelector(state => state.logout);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isSplash, setIsSplash] = useState(true);
  const [isOnboardingCompleted, setIsOnbordingCompleted] = useState(false);

  const getLocalData = async () => {
    try {
      const onBoardingData = await getStorageValue(storageKeys.onBoarding);
      const userData = await getStorageValue(storageKeys.userData);
      console.log('onBoardingData:>>>>', onBoardingData);
      if (onBoardingData?.onBoardingComplete) {
        setIsOnbordingCompleted(true);
      }
      console.log('userData:>>>>', userData);
      if (userData) {
        global.userData = userData;
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      Alert.alert(strings.faforlife, strings.somethingWentWrong);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getLocalData();
    // if (isLoggedIn) {
    //   setIsAuthenticated(true);
    // }
    // if (isLoggedOut) {
    //   setIsAuthenticated(false);
    // }
  }, [isLoggedIn, isLoggedOut]);

  if (isSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator onBoardingState={isOnboardingCompleted} />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
