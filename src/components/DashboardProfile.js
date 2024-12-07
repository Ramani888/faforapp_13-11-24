import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
import strings from '../constants/strings';
import {Montserrat} from '../themes/fonts';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import images from '../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
  verticalScale,
} from '../utils/responsive';
import colors from '../themes/colors';
import {useNavigation} from '@react-navigation/native';
import screens from '../constants/screens';

const {height, width} = Dimensions.get('window');

const DashboardProfile = ({data, hideStatus, hideAction}) => {
  const navigation = useNavigation();
  const Chip = ({title, color, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <AppText
          label={title}
          fontFamily={Montserrat.Regular}
          color={colors.white}
          textStyles={[styles.chip, {backgroundColor: color}]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.userWrapper}>
      <View style={styles.userContainer}>
        <ImageBackground
          source={require('../assets/images/background2.jpg')}
          resizeMode="cover"
          style={{...styles.userContainer}}
        >
          <View style={styles.userTopContainer}>
            <View style={styles.optionContainer}>
              <AppText
                label={strings.welcomeToFaforlife}
                fontFamily={Montserrat.SemiBold}
                size={'regular'}
                color={colors.white}
              />
            </View>
            <View style={styles.walletContainer}>
              <Image source={images.walletCircle} style={styles.walletIcon} />
              <AppText
                label={strings.walletBalance}
                fontFamily={Montserrat.SemiBold}
                color={colors.green}
              />
            </View>
            <AppText
              label={data?.balance}
              size={'huge'}
              fontFamily={Montserrat.SemiBold}
              color={colors.white}
              underline
            />
            <View style={styles.profileWrapper}>
              <Image source={images.userPlaceholder} style={styles.userProfile} />
              <View>
                <AppText
                  label={data?.name}
                  size={'medium'}
                  fontFamily={Montserrat.Bold}
                  color={colors.white}
                  textStyles={styles.name}
                />
                {hideStatus ? (
                  <AppText
                    label={data?.place_id}
                    fontFamily={Montserrat.Bold}
                    color={colors.green}
                  />
                ) : (
                  <AppText
                    label={data?.active == 1 ? strings.online : null}
                    fontFamily={Montserrat.Bold}
                    color={colors.green}
                  />
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {!hideAction && (
        <View style={styles.profileFooter}>
          <Chip
            title={strings.cashout}
            color={colors.pink}
            onPress={() => navigation.navigate(screens.cashoutRequest)}
          />
          <Chip
            title={strings.transfer}
            color={colors.greenHue}
            onPress={() => navigation.navigate(screens.balanceTransfer)}
          />
          <Chip
            title={strings.myTeam}
            color={colors.blueHue}
            onPress={() => navigation.navigate(screens.directTeam)}
          />
        </View>
      )}
    </View>
  );
};

export default DashboardProfile;

const styles = StyleSheet.create({
  userContainer: {
    height: verticalScale(190),
    // paddingLeft: (25),
    // paddingRight: (25),
    // paddingTop: (10),
    backgroundColor: 'orange',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  userWrapper: {
    height: verticalScale(230),
    width: scale(280),
    marginHorizontal: moderateWidth(10),
    backgroundColor: '#ffffff',
    display:'flex',
    flexDirection: 'column',
  },
  userTopContainer: {
    paddingLeft: (25),
    paddingRight: (25),
    paddingTop: (10),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateHeight(1.2),
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(5),
  },
  walletIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateWidth(2),
  },
  userProfile: {
    height: moderateScale(78),
    width: moderateScale(78),
    borderRadius: moderateScale(40),
    borderWidth: moderateScale(3),
    borderColor: colors.lightGrey,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateWidth(3),
    marginTop: moderateHeight(2),
  },
  name: {width: moderateWidth(40)},
  profileFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    height: verticalScale(40),
    alignItems: 'center',
    paddingLeft: (25),
    paddingRight: (25),
  },
  chip: {
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(5),
    fontSize: moderateWidth(2.7),
  },
});