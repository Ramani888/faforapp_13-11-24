import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../themes/colors';
import {scale} from '../utils/responsive';
import showMessageonTheScreen from '../components/showMessageonTheScreen';

const CustomeCounter = ({
  initialCount = 1,
  minCount = 1,
  handleQuantityChange,
  item,
  quantity,
  cartTotalPrice,
  priceLimit,
  type,
  uniqueId = 'pid'
}) => {
  const increment = () => {
    if (type == 'register' || type == 'upgrade') {
      if (cartTotalPrice < priceLimit) {
        handleQuantityChange(item[uniqueId], quantity + 1);
      } else {
        showMessageonTheScreen(
          'you have reached the price limit for this package',
        );
      }
    } else {
      handleQuantityChange(item[uniqueId], quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > minCount) {
      handleQuantityChange(item[uniqueId], quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.countText}>{quantity}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(50),
  },
  button: {
    backgroundColor: colors.yellow,
    height: scale(15),
    width: scale(15),
    // borderRadius: scale(12.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: scale(9),
    fontWeight: 'bold',
  },
  countText: {
    paddingHorizontal: 15,
    marginHorizontal: scale(2),
    fontSize: 10,
    color: colors.black,
    borderWidth: scale(1),
    borderColor: colors.black,
  },
});

export default CustomeCounter;
