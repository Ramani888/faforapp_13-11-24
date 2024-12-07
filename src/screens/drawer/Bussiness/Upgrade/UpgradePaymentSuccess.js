import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import CustomeButton from '../../../../Custome/CustomeButton';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';

const UpgradePaymentSuccess = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../../assets/images/upgradepaymentsuccess.jpg')}
      style={styles.background}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Payment Success</Text>
        <Text style={styles.subtitle}>Your Payment was successful</Text>
        <CustomeButton
          buttoncolor={colors.white}
          buttonwidth={scale(170)}
          buttonheight={verticalScale(40)}
          borderRadius={scale(5)}
          title={'Detail Order'}
          fontcolor={colors.skyBlue}
          fontSize={scale(16)}
          fontWeight={'500'}
          fontFamily={Montserrat.SemiBold}
          elevation={scale(10)}
          alignSelf={'center'}
          marginTop={verticalScale(15)}
          onPress={() => ''}
        />
        <CustomeButton
          buttoncolor={colors.transparent}
          buttonwidth={scale(170)}
          buttonheight={verticalScale(40)}
          borderRadius={scale(5)}
          title={'Back to Home'}
          fontcolor={colors.white}
          fontSize={scale(16)}
          fontFamily={Montserrat.SemiBold}
          alignSelf={'center'}
          marginTop={verticalScale(15)}
          borderWidth={scale(1)}
          borderColor={colors.white}
          onPress={() => navigation.navigate(screens.dashboard)}
        />
      </View>
    </ImageBackground>
  );
};

export default UpgradePaymentSuccess;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: scale(18),
    color: colors.white,
    fontFamily: Montserrat.SemiBold,
    marginBottom: verticalScale(15),
  },
  subtitle: {
    fontSize: scale(15),
    color: colors.white,
    fontFamily: Montserrat.Medium,
    marginBottom: verticalScale(20),
  },
});
