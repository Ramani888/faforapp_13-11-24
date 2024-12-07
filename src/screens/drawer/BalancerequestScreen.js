import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/Header';
import HorizontalSelector from '../../components/HorizontalSelector';
import {Loader} from '../../components/Loader';
import {months} from '../../constants/localData';
import strings from '../../constants/strings';
import {
  balanceRequest,
  balanceRequestClear,
} from '../../redux/slices/balanceRequest';
import {
  getUserDetails,
  getUserDetailsClear,
} from '../../redux/slices/getUserDetails';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import globalStyles from '../../themes/globalStyles';
import images from '../../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import {genrateDays} from '../../utils';

const BalancerequestScreen = ({navigation}) => {
  const days = genrateDays(1, moment().daysInMonth());

  const [userData, setUserData] = useState({});
  const [transactionAmount, settransactionAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [doc, setDoc] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(months[moment().month()]);
  const [selectedDay, setSelectedDay] = useState(
    days[moment().format('D') - 1],
  );

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const balanceRequestRes = useSelector(state => state.balanceRequest);

  const dayFlatlistRef = useRef();
  const monthFlatlistRef = useRef();

  const chooseReceipt = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setDoc(doc);
    } catch (err) {}
  };

  const onSubmit = () => {
    if (!selectedMonth) {
      Alert.alert(strings.faforlife, strings.pleaseSelectDate);
    } else if (!transactionAmount) {
      Alert.alert(strings.faforlife, strings.pleaseEnterTransactionAmount);
    } else if (!remark) {
      Alert.alert(strings.faforlife, strings.pleaseEnterRemark);
    } else {
      const date = moment({
        month: selectedMonth?.id,
        day: selectedDay?.id,
      }).format('YYYY-MM-DD');
      const data = new FormData();
      data.append('pay_date', date);
      data.append('self_id', global.userData?.self_id);
      data.append('amount', transactionAmount);
      data.append('image', doc);
      data.append('remark', remark);
      dispatch(balanceRequest(data));
    }
  };

  const monthScroll = () => {
    const currentMonth = moment().month();
    const index = months?.findIndex(item => item?.id == currentMonth);
    monthFlatlistRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  const dayScroll = () => {
    let index = days[moment().format('D') - 1];
    index = index?.id;
    dayFlatlistRef?.current?.scrollToIndex({
      animated: true,
      index: index - 1,
    });
  };

  const resetState = () => {
    settransactionAmount('');
    setSelectedMonth(months[moment().month()]);
    setRemark('');
    setDoc({});
    dispatch(balanceRequestClear());
  };

  useEffect(() => {
    setTimeout(() => {
      monthScroll();
    }, 500);
    setTimeout(() => {
      dayScroll();
    }, 700);
  }, []);

  useEffect(() => {
    if (userDetails?.data) {
      setUserData(userDetails?.data);
    }
    if (userDetails?.error) {
      Alert.alert(strings.faforlife, userDetails?.error);
      dispatch(getUserDetailsClear());
    }
  }, [userDetails]);

  useEffect(() => {
    if (balanceRequestRes?.data) {
      Alert.alert(strings.faforlife, balanceRequestRes?.data?.msg);

      const data = {self_id: global.userData?.self_id};
      dispatch(getUserDetails(data));
      resetState();
    }
    if (balanceRequestRes?.error) {
      Alert.alert(strings.faforlife, balanceRequestRes?.error);
      resetState();
    }
  }, [balanceRequestRes]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Header
          title={strings.screenTitles.balanceRequest}
          rightBgColor={colors.darkPink}
        />
        <View style={styles.container}>
          <ImageBackground
            source={images.balanceBg}
            resizeMode="contain"
            style={styles.balanceContainer}>
            <AppText
              label={`N ${userData.balance}`}
              size={'enormous'}
              fontFamily={Montserrat.Bold}
              color={colors.white}
            />
            <AppText
              label={strings.availableBalance}
              size={'regular'}
              fontFamily={Montserrat.Regular}
              color={colors.white}
            />
          </ImageBackground>
          <View style={styles.innerContainer}>
            <AppText
              label={moment().year()}
              size={'regular'}
              fontFamily={Montserrat.SemiBold}
              color={colors.black}
              centered
              textStyles={styles.yearText}
            />
            <HorizontalSelector
              ref={monthFlatlistRef}
              data={months}
              selected={selectedMonth}
              onSelect={setSelectedMonth}
              selectionColor={colors.darkPink}
            />
            <HorizontalSelector
              ref={dayFlatlistRef}
              data={days}
              selected={selectedDay}
              onSelect={setSelectedDay}
              selectionColor={colors.darkPink}
              containerStyle={{marginTop: moderateScale(10)}}
            />

            <CustomInput
              title={strings.transactionAmount}
              placeholder={strings.enterTransactionAmount}
              value={transactionAmount}
              onChangeText={settransactionAmount}
              containerStyle={styles.amountContainer}
              keyboardType={'numeric'}
            />
            <CustomInput
              title={strings.remark}
              placeholder={strings.enterRemark}
              value={remark}
              onChangeText={setRemark}
              containerStyle={styles.remarksContainer}
            />

            <View style={styles.fileContainer}>
              <AppText
                label={strings.uploadReceipt}
                fontFamily={Montserrat.Bold}
                color={colors.black}
                size={'extraSmall'}
              />
              <TouchableOpacity
                onPress={chooseReceipt}
                style={styles.chooseFile}>
                <AppText
                  label={strings.chooseFile}
                  fontFamily={Montserrat.Bold}
                  color={colors.white}
                  size={'extraSmall'}
                />
              </TouchableOpacity>
              <AppText
                label={doc?.name ? doc?.name : strings.noFileChosen}
                fontFamily={Montserrat.Bold}
                color={colors.black}
                size={'extraSmall'}
              />
            </View>

            <CustomButton
              title={strings.submit}
              bgColor={colors.darkPink}
              btnRadius={moderateScale(5)}
              containerStyle={styles.btnContainer}
              onPress={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
      {(balanceRequestRes?.isLoading || userDetails?.isLoading) && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: globalStyles.statusBarMargin,
    paddingHorizontal: moderateWidth(4),
  },
  scrollContainer: {paddingBottom: moderateScale(50)},
  balanceContainer: {
    width: '100%',
    height: moderateHeight(30),
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(65),
    marginTop: moderateScale(-7),
  },
  container: {
    marginTop: moderateScale(20),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
  },
  innerContainer: {
    paddingHorizontal: moderateWidth(5),
  },
  yearText: {
    marginTop: moderateScale(-20),
    marginBottom: moderateScale(5),
  },
  remarksContainer: {marginTop: moderateScale(10)},
  amountContainer: {marginTop: moderateScale(20)},
  fileContainer: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    gap: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseFile: {
    backgroundColor: colors.darkPink,
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(7),
    borderRadius: moderateScale(2),
  },
  btnContainer: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(40),
  },
});

export default BalancerequestScreen;
