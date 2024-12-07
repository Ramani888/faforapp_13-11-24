import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {scale} from '../utils/responsive';

const CustomeButton = ({
  title,
  buttonwidth,
  buttonheight,
  buttoncolor,
  fontSize,
  fontcolor,
  onPress,
  fontFamily,
  fontWeight,
  disabled,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  paddingHorizontal,
  marginVertical,
  paddingVertical,
  padding,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  borderRadius,
  borderWidth,
  borderColor,
  iconLeft,
  iconLeftMarginLeft,
  iconRight,
  iconRightStyle,
  IconComponentName,
  iconname,
  iconsize,
  iconcolor,
  iconPaddingRight,
  iconPaddingLeft,
  iconViewLeft,
  elevation,
  alignSelf,
  position,
  left,
  right,
  top,
  bottom,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.BtnStyle,
        {
          backgroundColor: buttoncolor,
          width: buttonwidth,
          height: buttonheight,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
          borderTopLeftRadius: borderTopLeftRadius,
          borderTopRightRadius: borderTopRightRadius,
          borderBottomRightRadius: borderBottomRightRadius,
          borderBottomLeftRadius: borderBottomLeftRadius,
          borderColor: borderColor,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
          marginRight: marginRight,
          marginHorizontal: marginHorizontal,
          paddingHorizontal: paddingHorizontal,
          marginVertical: marginVertical,
          paddingVertical: paddingVertical,
          padding: padding,
          fontFamily: fontFamily,
          elevation: elevation,
          alignSelf: alignSelf,
          position: position,
          left: left,
          right: right,
          top: top,
          bottom: bottom,
        },
      ]}>
      {iconLeft && (
        <View style={[styles.iconRightView,{marginRight:iconLeftMarginLeft}]}>
          <IconComponentName
            name={iconname}
            size={iconsize}
            color={iconcolor}
            style={{paddingRight: iconPaddingRight}}
          />
        </View>
      )}
      <Text
        style={{
          fontSize: fontSize,
          color: fontcolor,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
        }}>
        {title}
      </Text>
      {iconRight && (
        <View
          style={[
            styles.iconRightView,
            {marginLeft: iconViewLeft ? iconViewLeft : scale(10)},
            ,
            iconRightStyle,
          ]}>
          <IconComponentName
            name={iconname}
            size={iconsize}
            color={iconcolor}
            style={{paddingLeft: iconPaddingLeft}}
          />
        </View>
      )}
    </Pressable>
  );
};

export default CustomeButton;

const styles = StyleSheet.create({
  BtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRightView: {
    backgroundColor: colors.white,
    width: scale(45),
    alignItems: 'center',
    borderRadius: scale(5),
  },
});
