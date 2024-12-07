import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import AppText from './AppText';

const AuthInput = React.forwardRef(
  (
    {
      placeholder,
      icon,
      value,
      onChangeText,
      onSubmitEditing,
      secureTextEntry,
      error,
    },
    ref,
  ) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {icon && icon}
          <TextInput
            ref={ref}
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.darkGrey}
            keyboardType="default"
            returnKeyType="next"
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
          />
          {icon && <View style={styles.blank} />}
        </View>
        {error && (
          <AppText
            label={error}
            fontFamily={Montserrat.Regular}
            color={colors.red}
          />
        )}
      </View>
    );
  },
);

export default AuthInput;

const styles = StyleSheet.create({
  mainContainer: {marginBottom: moderateHeight(2.5)},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateWidth(4),
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: moderateWidth(4.5),
    flex: 1,
    textAlign: 'center',
    fontFamily: Montserrat.SemiBold,
  },
  blank: {width: moderateScale(25)},
});
