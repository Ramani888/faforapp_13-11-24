import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import colors from '../themes/colors';
import images from '../themes/images';
import {moderateHeight} from '../utils/responsive';

const SplashScreen = () => {
  return (
    <ImageBackground style={styles.container} source={images.bgFull}>
      <Image source={images.logo} style={styles.logo} />
      <ActivityIndicator
        color={colors.white}
        size="large"
        style={styles.activityIndicator}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {width: '90%', resizeMode: 'contain', marginBottom: moderateHeight(4)},
});
