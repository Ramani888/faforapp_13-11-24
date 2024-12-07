import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {Montserrat} from '../themes/fonts';
import {moderateScale, moderateWidth} from '../utils/responsive';

const Row = ({title, value, valueStyle}) => {
  return (
    <View style={styles.container}>
      <AppText
        label={title}
        fontFamily={Montserrat.Bold}
        textStyles={styles.title}
      />
      <AppText
        label={value}
        fontFamily={Montserrat.Bold}
        textStyles={valueStyle && valueStyle}
      />
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  title: {width: moderateWidth(48)},
});
