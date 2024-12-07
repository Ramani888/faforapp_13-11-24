import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import CustomButton from '../../components/CustomButton';
import CustomDropDown from '../../components/CustomDropDown';
import Header from '../../components/Header';
import {Loader} from '../../components/Loader';
import strings from '../../constants/strings';
import {
  getUserDetails,
  getUserDetailsClear,
} from '../../redux/slices/getUserDetails';
import {
  walletConversion,
  walletConversionClear,
} from '../../redux/slices/walletConversion';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import globalStyles from '../../themes/globalStyles';
import images from '../../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  verticalScale,
} from '../../utils/responsive';

const data = [
  {id: 1, title: 'Cash Wallet Point', key: 'cash_wallet'},
  {id: 2, title: 'Pair Bonus Point', key: 'pair_bouns'},
  {id: 3, title: 'Matching Bonus Point', key: 'match_bouns'},
  {id: 4, title: 'Placement Bonus Point', key: 'placement_bouns'},
  {id: 6, title: 'Stockist Retail Bonus', key: 'stockist_retail_wallet'},
  {id: 8, title: 'Indirect Bonus', key: 'indirect_bouns'},
];

const WalletConversion = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [selectWallet, setSelectWallet] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const walletConversionRes = useSelector(state => state.walletConversion);
  console.log('walletConversionRes',walletConversionRes)

  const walletList = useMemo(() => {
    const newList = data?.map(item => {
      return {...item, title: `${item?.title}(${userData[item?.key]})`};
    });
    return newList;
  }, [userData]);

  const onConvert = () => {
    if (!selectWallet) {
      Alert.alert(strings.faforlife, strings.pleaseSelectWallet);
    } else {
      
      const data = {
        user_id: global?.userData?.id,
        type: selectWallet?.id,
      };
      console.log(data);
      /*
      dispatch(walletConversion(data));
      */
    }
  };

  const resetState = () => {
    setSelectWallet(null);
    dispatch(walletConversionClear());
  };

  useEffect(() => {
    if (walletConversionRes?.data) {
      Alert.alert(strings.faforlife, walletConversionRes?.data?.msg);
      resetState();
      const data = {self_id: global.userData?.self_id};
      dispatch(getUserDetails(data));
    }
    if (walletConversionRes?.error) {
      Alert.alert(strings.faforlife, walletConversionRes?.error);
      resetState();
    }
  }, [walletConversionRes]);

  useEffect(() => {
    if (userDetails?.data) {
      setUserData(userDetails?.data);
    }
    if (userDetails?.error) {
      Alert.alert(strings.faforlife, userDetails?.error);
      dispatch(getUserDetailsClear());
    }
  }, [userDetails]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <Header title={strings.screenTitles.WalletConversation} hideAction />
        <View style={styles.container}>
          <ImageBackground
            source={images.cashoutBg}
            resizeMode="contain"
            style={styles.balanceContainer}>
              {/* {console.log('userData',userData)} */}
            <AppText
              label={`N ${userData?.spending_wallet}`}
              size={'enormous'}
              fontFamily={Montserrat.Bold}
              color={colors.white}
            />
            <AppText
              label={strings.spendingWalletBalance}
              size={'regular'}
              fontFamily={Montserrat.Regular}
              color={colors.green}
            />
          </ImageBackground>
          <View style={styles.innerContainer}>
            <CustomDropDown
              placeholder={strings.selectWallet}
              data={walletList}
              onSelect={setSelectWallet}
              selected={selectWallet?.title}
              labelKey={'title'}
              buttonStyle={{backgroundColor: colors.screenColor}}
              buttonTextStyle={{color: colors.black}}
              arrowStyle={{color: colors.black}}
              menuStyle={{backgroundColor: colors.lightGrey}}
              itemStyle={{paddingVertical: verticalScale(10)}}
              selectedItemStyle={{backgroundColor: colors.lightBlue}}
              placeholderStyle={{color: colors.grey}}
              style={styles.dropdownText}
            />
            <CustomButton
              onPress={onConvert}
              title={strings.convert}
              bgColor={colors.darkBlue}
              btnRadius={moderateScale(5)}
              containerStyle={styles.btnContainer}
            />
          </View>
        </View>
      </ScrollView>
      {(walletConversionRes?.isLoading || userDetails?.isLoading) && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: globalStyles.statusBarMargin,
    paddingHorizontal: moderateWidth(4),
  },
  balanceContainer: {
    width: '100%',
    height: moderateHeight(30),
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(65),
    marginTop: moderateScale(-7),
    marginBottom: moderateScale(50),
  },
  container: {
    marginTop: moderateScale(33),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
  },
  innerContainer: {
    paddingHorizontal: moderateWidth(5),
  },
  paymentTitle: {marginTop: moderateScale(20), marginBottom: moderateScale(7)},
  btnContainer: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(70),
  },
  dropdownText:{
    color: '#fff',
  }
});

export default WalletConversion;
