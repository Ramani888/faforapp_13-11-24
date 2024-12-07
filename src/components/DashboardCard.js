import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AppText from './AppText';
import colors from '../themes/colors';
import {Montserrat} from '../themes/fonts';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../utils/responsive';

const DashboardCard = ({title, value, bgColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, bgColor && {backgroundColor: bgColor}]}>
      <AppText
        label={value}
        fontFamily={Montserrat.Bold}
        size={'medium'}
        color={colors.white}
      />
      <AppText
        label={title}
        fontFamily={Montserrat.Regular}
        size={'extraSmall'}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenHue,
    paddingVertical: moderateHeight(1),
    width: moderateWidth(41),
    paddingLeft: moderateWidth(5),
    borderRadius: moderateScale(8),
    elevation: 3,
    marginBottom: moderateHeight(1.2),
  },
});
