import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import CustomeInputField from '../../Custome/CustomeInputField';

const AccountDetail = ({handleChange, handleBlur, values, touched, errors}) => {
  const renderBody = () => {
    return (
      <View>
        <Text
          style={[
            styles.title,
            styles.heading,
            {marginTop: verticalScale(15)},
          ]}>
          Acount Detail
        </Text>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>IFSC Code*</Text>
          <CustomeInputField
            placeholder={'Enter IFSC Code'}
            onChangeText={handleChange('ifscCode')}
            onBlur={handleBlur('ifscCode')}
            value={values.ifscCode}
            touched={touched.ifscCode}
            errors={errors.ifscCode}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Bank Name*</Text>
          <CustomeInputField
            placeholder={'Enter Bank Name'}
            onChangeText={handleChange('bankName')}
            onBlur={handleBlur('bankName')}
            value={values.bankName}
            touched={touched.bankName}
            errors={errors.bankName}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Branch Name*</Text>
          <CustomeInputField
            placeholder={'Enter Branch Name'}
            onChangeText={handleChange('branchName')}
            onBlur={handleBlur('branchName')}
            value={values.branchName}
            touched={touched.branchName}
            errors={errors.branchName}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Account No*</Text>
          <CustomeInputField
            placeholder={'Enter Account Number'}
            onChangeText={handleChange('accountNumber')}
            onBlur={handleBlur('accountNumber')}
            value={values.accountNumber}
            touched={touched.accountNumber}
            errors={errors.accountNumber}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Account Name*</Text>
          <CustomeInputField
            placeholder={'Enter Account Name'}
            onChangeText={handleChange('accountName')}
            onBlur={handleBlur('accountName')}
            value={values.accountName}
            touched={touched.accountName}
            errors={errors.accountName}
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

export default AccountDetail;

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
