import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import CustomeButton from '../../../../Custome/CustomeButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import screens from '../../../../constants/screens';

const WelcomeRepurchase = () => {
  const navigation = useNavigation()

  const baseButtonProps = {
    buttonheight: verticalScale(30),
    borderRadius: scale(5),
    fontcolor: colors.skyBlue,
    fontSize: scale(15),
    fontFamily: Montserrat.SemiBold,
    elevation: scale(10),
    marginHorizontal: scale(-15),
    alignSelf: 'center',
    marginTop: verticalScale(-20),
    iconRight: true,
    IconComponentName: FontAwesome6,
    iconsize: scale(17),
    marginBottom: verticalScale(50),
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/welcomerepurchase.jpg')}
        style={styles.topHalf}
        resizeMode="cover">

      <ImageBackground
        source={require('../../../../assets/images/repurschasestorebackground1.png')}
        style={styles.bottomHalf}
        resizeMode="cover">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>FAFORLIFE</Text>
          <Text style={styles.subtitle}>Repurchase Store</Text>
          <Text style={styles.text}>Experience Shopping With Ease</Text>
        </View>
        <CustomeButton
          {...baseButtonProps}
          buttoncolor={colors.white}
          buttonwidth={scale(150)}
          title="Proceed"
          iconname={'arrow-right-long'}
          iconcolor={colors.pink}
          iconRightStyle={styles.icon}
          alignSelf={'flex-end'}
          marginRight={scale(20)}
          onPress={() => navigation.navigate(screens.regionSelection)}
        />
      </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default WelcomeRepurchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    marginBottom:verticalScale(130),
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width:'100%',
    marginBottom:verticalScale(-150),
  },
  contentContainer: {
    alignItems: 'flex-start',
    marginBottom: verticalScale(30),
    marginLeft: verticalScale(30),
  },
  title: {
    fontSize: scale(35),
    color: colors.white,
    fontFamily: Montserrat.SemiBold,
    marginBottom: verticalScale(-5),
  },
  subtitle: {
    fontSize: scale(20),
    color: colors.white,
    fontFamily: Montserrat.Medium,
    marginBottom: verticalScale(30),
  },
  text: {
    fontSize: scale(15),
    width: scale(190),
    color: colors.white,
    fontFamily: Montserrat.Medium,
    marginBottom: verticalScale(20),
  },
  icon: {
    backgroundColor: '#3f85c6',
    height: verticalScale(20),
    paddingTop: verticalScale(2),
    marginLeft: scale(15),
  },
});
