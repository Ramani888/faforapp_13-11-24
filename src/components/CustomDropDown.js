import {StyleSheet, View, Image, Text} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../themes/colors';
import {moderateScale, moderateWidth, scale, verticalScale} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import AppText from './AppText';
import showMessageonTheScreen from './showMessageonTheScreen';

const CustomDropDown = ({
  placeholder,
  data,
  onSelect,
  selected,
  buttonStyle,
  buttonTextStyle,
  arrowStyle,
  menuStyle,
  placeholderAndTextStyle,
  itemStyle,
  selectedItemStyle,
  placeholderStyle,
  Icon,
  leftIcon,
  lefticonSize,
  leftIconColor,
  leftImage,
  leftImageUrl,
  leftIconStyle,
  leftImageStyle,
  textAlign,
  initialValue,
  labelKey,
  validationMessage,
  leftSpace,
  errors, 
  touched, 
}) => {
  const renderButton = (selectedItem, isOpened) => {
    return (
      <View style={[styles.dropdownButtonStyle, buttonStyle]}>
        {leftIcon && (
          <Icon name={leftIcon} style={[styles.leftIconStyle, leftIconStyle]} />
        )}
        {leftImage && (
          <Image
            source={leftImage}
            style={[styles.leftImageStyle, leftImageStyle]}
          />
        )}
        {leftImageUrl && (
          <Image
            source={{uri: leftImageUrl}}
            style={[styles.leftImageStyle, leftImageStyle]}
          />
        )}
        {leftSpace && <View style={styles.leftImageStyle} />}
        <View
          style={[
            styles.textContainer,
            {alignItems: textAlign},
            placeholderAndTextStyle,
          ]}>
          <AppText
            label={selected || placeholder}
            fontFamily={Montserrat.SemiBold}
            color={colors.black}
            size={'small'}
          />
        </View>
        <AntDesign
          name={isOpened ? 'caretup' : 'caretdown'}
          style={[styles.dropdownButtonArrowStyle, arrowStyle]}
        />
      </View>
    );
  };

  const renderItem = (item, index, isSelected) => {
    return (
      <View
        style={[
          styles.dropdownItemStyle,
          itemStyle,
          isSelected && [styles.selectedItemStyle, selectedItemStyle],
        ]}>
        <AppText
          label={item?.[labelKey]}
          fontFamily={Montserrat.SemiBold}
          color={colors.black}
          size={'regular'}
        />
      </View>
    );
  };

  const handleSelect = (selectedItem, index) => {
    onSelect(selectedItem);
  };

  const handleDropdownPress = () => {
    if (!data || data.length === 0) {
      showMessageonTheScreen(validationMessage);
      return;
    }
  };

  return (
    <View>
      <SelectDropdown
        data={data && data.length > 0 ? data : []}
        onSelect={handleSelect}
        defaultButtonText={initialValue || placeholder}
        renderButton={renderButton}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{...styles.dropdownMenuStyle, ...menuStyle}}
        onFocus={handleDropdownPress}
      />
      {errors && touched && (
        <View style={styles.viewError}>
          <Text style={styles.textError}>{errors}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: moderateScale(45),
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateWidth(3),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leftIconStyle: {
    fontSize: moderateScale(20),
  },
  leftImageStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  dropdownButtonArrowStyle: {
    fontSize: moderateScale(16),
  },
  dropdownMenuStyle: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(-35),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },
  selectedItemStyle: {
    backgroundColor: colors.lightGrey,
  },
  viewError: {
    marginVertical: verticalScale(2),
    marginLeft: scale(-5),
  },
  textError: {
    fontSize: moderateScale(10),
    color: colors.red,
    paddingLeft: scale(5),
    fontFamily: 'Montserrat-Regular',
  },
});



// {
//   /* <CustomDropDown
//   placeholder="Please Select Placement Setting"
//   data={placementData}
//   onSelect={setSelectPlacement}
//   selected={selectPlacement}
//   buttonStyle={{backgroundColor: colors.screenColor}}
//   buttonTextStyle={{color: colors.black}}
//   arrowStyle={{color: colors.black}}
//   menuStyle={{backgroundColor: colors.lightBlue}}
//   itemStyle={{paddingVertical: verticalScale(10)}}
//   selectedItemStyle={{backgroundColor: colors.screenColor}}
//   placeholderStyle={{color: colors.grey}}
//   leftIcon="account" // For an icon on the left
//   leftIconStyle={{color: 'white'}}
//   leftImage={require('../../assets/images/crown.png')}
//   leftImageStyle={{tintColor: 'white'}}
// />; */
// }
