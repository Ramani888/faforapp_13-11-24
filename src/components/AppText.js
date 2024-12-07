import {Text} from 'react-native';
import React from 'react';
import {moderateWidth} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';

const AppText = props => {
  const {
    label,
    color = colors.black,
    size,
    centered,
    right,
    capitalize,
    upperCase,
    underline,
    textStyles,
    opacity,
    lines,
    onPress,
    fontFamily = Montserrat.Regular,
    ellipsizeMode,
  } = props;
  const fontSizes =
    size === 'tiny'
      ? moderateWidth(2)
      : size === 'extraSmall'
      ? moderateWidth(2.5)
      : size === 'small'
      ? moderateWidth(3)
      : size === 'regular'
      ? moderateWidth(4)
      : size === 'medium'
      ? moderateWidth(4.7)
      : size === 'large'
      ? moderateWidth(5)
      : size === 'extraLarge'
      ? moderateWidth(5.5)
      : size === 'big'
      ? moderateWidth(6)
      : size === 'huge'
      ? moderateWidth(7.5)
      : size === 'enormous'
      ? moderateWidth(8)
      : size === 'gigantic'
      ? moderateWidth(8.5)
      : size === 'colossal'
      ? moderateWidth(9)
      : size === 'immense'
      ? moderateWidth(9.5)
      : size === 'modest'
      ? moderateWidth(10)
      : textStyles?.fontSize
      ? textStyles?.fontSize
      : moderateWidth(3.5);
  return (
    <Text
      onPress={onPress}
      numberOfLines={lines}
      ellipsizeMode={ellipsizeMode}
      style={[
        {
          color,
          fontSize: fontSizes,
          textAlign: right ? 'right' : centered ? 'center' : 'left',
          textDecorationLine: underline ? 'underline' : 'none',
          textTransform: capitalize
            ? 'capitalize'
            : upperCase
            ? 'uppercase'
            : 'none',
          fontFamily: fontFamily,
          opacity,
        },
        textStyles,
      ]}>
      {label}
    </Text>
  );
};

export default AppText;
