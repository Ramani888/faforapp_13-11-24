import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
};

const GetFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new generated token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
      }
    } catch (error) {
      console.log('error in fcm token', error);
    }
  }
};

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log(
      'notification on froground state......',
      remoteMessage.notification.body,
    );
    Alert.alert(JSON.stringify(remoteMessage.notification.body));
  });
};
