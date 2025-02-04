import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomeInputField from '../../Custome/CustomeInputField';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import CustomDropDown from '../CustomDropDown';

const CorrespondensAddress = ({
  handleChange,
  handleBlur,
  values,
  setFieldValue,
  touched,
  errors,
  setAddressLine2,
  addressLine2,
  stateData,
  selectedState,
  handleStateSelect
}) => {
    console.log('values',values)
  const renderBody = () => {
    return (
      <View>
        <Text
          style={[
            styles.title,
            styles.heading,
            {marginTop: verticalScale(15)},
          ]}>
          Correspondens Address
        </Text>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Address Line 1*</Text>
          <CustomeInputField
            placeholder={'Enter address'}
            onChangeText={handleChange('addressLine1')}
            onBlur={handleBlur('addressLine1')}
            value={values.addressLine1}
            touched={touched.addressLine1}
            errors={errors.addressLine1}
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
              setFieldValue('state', selectedItem.state_name)
            }
            // onSelect={setState}
            selected={values?.state}
            errors={errors.state}
            touched={touched.state}
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
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
            touched={touched.city}
            errors={errors.city}
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

export default CorrespondensAddress;

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
