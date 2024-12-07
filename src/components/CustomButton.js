import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';
import AppText from './AppText';
import {moderateHeight, moderateScale} from '../utils/responsive';

const CustomButton = ({
  title,
  onPress,
  bgColor,
  textColor,
  btnRadius,
  textStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        bgColor && {backgroundColor: bgColor},
        btnRadius && {borderRadius: btnRadius},
        containerStyle && containerStyle,
      ]}
      onPress={onPress}>
      <AppText
        label={title}
        fontFamily={Montserrat.SemiBold}
        size={'medium'}
        color={textColor ? textColor : colors.white}
        textStyles={textStyle}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.blueAccent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateHeight(1.7),
    borderRadius: moderateScale(30),
  },
});
