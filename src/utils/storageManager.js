import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../constants/strings';
import {Alert} from 'react-native';

export const setStorageValue = async (key, value) => {
  try {
    const _value = JSON.stringify(value);
    await AsyncStorage.setItem(key, _value);
  } catch (error) {
    Alert.alert(strings.faforlife, strings.somethingWentWrong);
  }
};

export const getStorageValue = async key => {
  try {
    const _item = await AsyncStorage.getItem(key);
    const item = JSON.parse(_item);
    return item;
  } catch (error) {
    Alert.alert(strings.faforlife, strings.somethingWentWrong);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    Alert.alert(strings.faforlife, strings.somethingWentWrong);
  }
};

export const clearStorageByKey = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Alert.alert(strings.faforlife, strings.somethingWentWrong);
  }
};

export const clearStorageByMultipleKeys = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    Alert.alert(strings.faforlife, strings.somethingWentWrong);
  }
};
