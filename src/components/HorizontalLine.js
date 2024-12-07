import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {moderateScale} from '../utils/responsive';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

export default HorizontalLine;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.darkGrey,
    marginBottom: moderateScale(10),
  },
});
