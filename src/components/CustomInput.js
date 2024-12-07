import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import AppText from './AppText';
import strings from '../constants/strings';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';
import {moderateScale, moderateWidth} from '../utils/responsive';

const CustomInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  keyboardType,
}) => {
  return (
    <View style={containerStyle}>
      <AppText
        label={title}
        fontFamily={Montserrat.Bold}
        color={colors.black}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={colors.darkerGrey}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    marginTop: moderateScale(5),
    backgroundColor: colors.lighterGrey,
    borderRadius: moderateScale(7),
    fontFamily: Montserrat.Bold,
    fontSize: moderateWidth(4.5),
    paddingHorizontal: moderateWidth(3),
    color: colors.black,
  },
});
