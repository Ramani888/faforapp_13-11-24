import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../themes/colors';

// app's common loader
const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

export {Loader};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black50,
    zIndex: 3,
  },
});
