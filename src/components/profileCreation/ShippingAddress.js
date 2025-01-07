import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomeInputField from '../../Custome/CustomeInputField';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import CustomDropDown from '../CustomDropDown';

const ShippingAddress = ({
  handleChange,
  handleBlur,
  values,
  setFieldValue,
  touched,
  errors,
  setAddressLine2,
  addressLine2,
  stateData,
  handleStateSelect,
  selectedState,
}) => {
  const renderBody = () => {
    return (
      <View>
        <Text
          style={[
            styles.title,
            styles.heading,
            {marginTop: verticalScale(15)},
          ]}>
          Shipping Address
        </Text>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Address Line 1*</Text>
          <CustomeInputField
            placeholder={'Enter address'}
            onChangeText={handleChange('shippingAddressLine1')}
            onBlur={handleBlur('shippingAddressLine1')}
            value={values.shippingAddressLine1}
            touched={touched.shippingAddressLine1}
            errors={errors.shippingAddressLine1}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Address Line 2</Text>
          <CustomeInputField
            placeholder={'Enter address'}
            onChangeText={setAddressLine2}
            value={addressLine2}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>State*</Text>
          <CustomDropDown
            placeholder="Select State"
            data={stateData}
            onSelect={selectedItem =>
              setFieldValue('shippingState', selectedItem.state_name)
            }
            selected={values.shippingState}
            errors={errors.shippingState}
            touched={touched.shippingState}
            labelKey={'state_name'}
            buttonStyle={styles.dropdownButtonStyle1}
            buttonTextStyle={styles.dropdownButtonText}
            arrowStyle={styles.dropdownArrow}
            menuStyle={styles.dropdownMenu}
            itemStyle={styles.dropdownItem}
            selectedItemStyle={styles.selectedItem}
            placeholderStyle={[styles.placeholder, styles.placeholderOffset]}
            textAlign={'left'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>City*</Text>
          <CustomeInputField
            placeholder={'Enter city'}
            onChangeText={handleChange('shippingCity')}
            onBlur={handleBlur('shippingCity')}
            value={values.shippingCity}
            touched={touched.shippingCity}
            errors={errors.shippingCity}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>
      </View>
    );
  };
  return <View>{renderBody()}</View>;
};

export default ShippingAddress;

const styles = StyleSheet.create({
  title: {
    fontSize: scale(14),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    paddingLeft: scale(20),
  },
  heading: {
    paddingLeft: 0,
    paddingBottom: verticalScale(10),
  },
  label: {
    fontSize: scale(12),
    color: colors.darkGrey,
  },
  dropdownButtonStyle1: {
    backgroundColor: colors.lighterGrey,
    height: verticalScale(35),
    marginTop: verticalScale(10),
  },
  dropdownArrow: {
    color: colors.black,
  },
});
