import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import CustomeInputField from '../../Custome/CustomeInputField';
import { Montserrat } from '../../themes/fonts';

const ContactDetail = ({handleChange, handleBlur, values, touched, errors}) => {
  const renderBody = () => {
    return (
      <View>
        <Text
          style={[
            styles.title,
            styles.heading,
            {marginTop: verticalScale(15)},
          ]}>
          Contact Detail
        </Text>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Email*</Text>
          <CustomeInputField
            placeholder={'Enter Email'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            touched={touched.email}
            errors={errors.email}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            // secureTextEntry={true}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Mobile Number*</Text>
          <CustomeInputField
            placeholder={'Enter Mobile Number'}
            onChangeText={handleChange('mobileNo')}
            onBlur={handleBlur('mobileNo')}
            value={values.mobileNo}
            touched={touched.mobileNo}
            errors={errors.mobileNo}
            maxLength={10}
            keyboardType={'numeric'}
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

export default ContactDetail;

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
});
