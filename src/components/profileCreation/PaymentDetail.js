import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Montserrat} from '../../themes/fonts';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import CustomeInputField from '../../Custome/CustomeInputField';

const PaymentDetail = ({
  setBitcoinWalletCode,
  bitcoinWalletCode,
  setPaypalEmail,
  paypalEmail,
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
          Optional Payment Detail
        </Text>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Bitcoin Wallet Code</Text>
          <CustomeInputField
            placeholder={'Enter Bitcoin Wallet Code'}
            onChangeText={setBitcoinWalletCode}
            value={bitcoinWalletCode}
            borderBottomWidth={scale(0.7)}
            borderBottomColor={colors.darkerGrey}
            width={'100%'}
            placeholderTextColor={colors.darkGray}
            color={colors.black}
            inputWidth={'90%'}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text style={styles.label}>Paypal Email</Text>
          <CustomeInputField
            placeholder={'Enter Paypal Email'}
            onChangeText={setPaypalEmail}
            value={paypalEmail}
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

export default PaymentDetail;

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
