import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import colors from '../../themes/colors';
import AppText from '../../components/AppText';
import strings from '../../constants/strings';
import {Montserrat} from '../../themes/fonts';
import icons from '../../themes/icons';
import {setStorageValue} from '../../utils/storageManager';
import storageKeys from '../../constants/storageKeys';
import screens from '../../constants/screens';

const Welcome = ({navigation}) => {
  const onContinue = async () => {
    try {
      const data = {onBoardingComplete: true};
      await setStorageValue(storageKeys.onBoarding, data);
      //navigation.replace(screens.login);
      navigation.replace(screens.country);
    } catch (error) {
      Alert.alert(strings.faforlife, strings.somethingWentWrong);
    }
  };
  return (
    <ImageBackground style={styles.container} source={images.welcomeBg}>
      <Image style={styles.logo} source={images.logoWithBg} />
      <View style={styles.contentContainer}>
        <AppText
          label={strings.welcome}
          fontFamily={Montserrat.Bold}
          size={'huge'}
          color={colors.white}
        />
        <AppText
          label={strings.welcomeMsg}
          fontFamily={Montserrat.SemiBold}
          color={colors.white}
          textStyles={styles.msg}
        />
        <TouchableOpacity onPress={onContinue}>
          <Image style={styles.continueIcon} source={icons.continue} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {flex: 1},
  logo: {
    width: moderateScale(250),
    height: moderateScale(250),
    alignSelf: 'center',
    marginTop: moderateHeight(25),
    borderWidth: 2,
    borderColor: colors.lightCyan,
    borderRadius: moderateScale(150),
  },
  contentContainer: {
    marginTop: moderateHeight(3.5),
    paddingHorizontal: moderateWidth(15),
  },
  msg: {marginTop: moderateHeight(1), marginBottom: moderateHeight(1.5)},
  continueIcon: {
    width: moderateScale(70),
    height: moderateScale(70),
    resizeMode: 'contain',
    borderRadius: moderateScale(30),
    alignSelf: 'flex-end',
  },
});
