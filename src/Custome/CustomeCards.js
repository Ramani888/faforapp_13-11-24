import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {scale, verticalScale} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';

const CustomeCards = ({
  item,
  imageUri,
  badgeUri,
  title,
  description,
  price,
  setSelectedProduct,
  selectedProduct,
  index,
}) => {
  const isSelected = selectedProduct == item?.id;
  
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setSelectedProduct(item?.id);
        global.packageId = item?.id;
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUri}} style={styles.image} />
        {isSelected && <Image source={badgeUri} style={styles.badge} />}
      </View>
      {title && description && price && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    width: scale(170),
    padding: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(20),
  },
  imageContainer: {
    backgroundColor: colors.lightGrey,
    width: scale(140),
    height: scale(170),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(10),
  },
  badge: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    position: 'absolute',
    top: verticalScale(-10),
    right: scale(-10),
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: scale(13),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingTop: verticalScale(10),
  },
  description: {
    fontSize: scale(13),
    color: colors.grey,
    fontFamily: Montserrat.Medium,
    paddingTop: verticalScale(2),
  },
  price: {
    fontSize: scale(13),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    paddingTop: verticalScale(2),
  },
});

export default CustomeCards;
