import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateHeight, moderateScale} from '../utils/responsive';
import colors from '../themes/colors';

const VerticleLine = () => {
  return <View style={styles.line} />;
};

export default VerticleLine;

const styles = StyleSheet.create({
  line: {
    width: moderateScale(1),
    height: moderateHeight(5),
    backgroundColor: colors.darkerGrey,
  },
});
