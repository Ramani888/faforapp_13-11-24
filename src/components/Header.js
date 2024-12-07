import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, scale, verticalScale} from '../utils/responsive';
import strings from '../constants/strings';

const Header = ({title, rightBgColor, hideAction}) => {
  return (
    <View
      style={[
        styles.container,
        hideAction && {marginTop: moderateScale(13.5)},
      ]}>
      <AppText
        label={title}
        fontFamily={Montserrat.Bold}
        size={'extraLarge'}
        color={colors.black1A}
      />
      {!hideAction && (
        <TouchableOpacity
          style={[
            styles.rightButton,
            rightBgColor && {backgroundColor: rightBgColor},
          ]}>
          <Icon
            name={'history'}
            size={moderateScale(20)}
            color={colors.white}
          />
          <AppText
            label={strings.history}
            fontFamily={Montserrat.SemiBold}
            size={'tiny'}
            color={colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightButton: {
    height: verticalScale(50),
    width: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    // padding: moderateScale(12),
    borderRadius: scale(25),
    elevation: 5,
  },
});
