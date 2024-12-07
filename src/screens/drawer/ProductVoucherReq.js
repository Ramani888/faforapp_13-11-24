import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import globalStyles from '../../themes/globalStyles';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import colors from '../../themes/colors';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import strings from '../../constants/strings';
import AppText from '../../components/AppText';
import {Montserrat} from '../../themes/fonts';
import moment from 'moment';
import HorizontalSelector from '../../components/HorizontalSelector';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import images from '../../themes/images';
import {months} from '../../constants/localData';
import {useDispatch, useSelector} from 'react-redux';
import {
  productVoucherRequest,
  productVoucherRequestClear,
} from '../../redux/slices/productVoucherRequest';
import {Loader} from '../../components/Loader';
import {genrateDays} from '../../utils';

const ProductVoucherReq = () => {
  const days = genrateDays(1, moment().daysInMonth());

  const [selectedMonth, setSelectedMonth] = useState(months[moment().month()]);
  const [selectedDay, setSelectedDay] = useState(
    days[moment().format('D') - 1],
  );
  const [transactionAmount, setTransactionAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [doc, setDoc] = useState({});

  const dayFlatlistRef = useRef();
  const monthFlatlistRef = useRef();

  const dispatch = useDispatch();
  const productVoucherReqRes = useSelector(
    state => state.productVoucherRequest,
  );

  const chooseReceipt = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setDoc(doc);
    } catch (err) {
      Alert.alert(strings.faforlife, strings.somethingWentWrong);
    }
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
      data.append('remark', remark);
      if (doc?.uri) {
        data.append('image', doc);
      }
      dispatch(productVoucherRequest(data));
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
    setTransactionAmount('');
    setSelectedMonth(months[moment().month()]);
    setRemark('');
    setDoc({});
    dispatch(productVoucherRequestClear());
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
    if (productVoucherReqRes?.data) {
      Alert.alert(strings.faforlife, productVoucherReqRes?.data?.msg);
      resetState();
    }
    if (productVoucherReqRes?.error) {
      Alert.alert(strings.faforlife, productVoucherReqRes?.error);
      resetState();
    }
  }, [productVoucherReqRes]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={strings.screenTitles.productVoucherRequest}
          rightBgColor={colors.darkPink}
          hideAction={true}
        />
        <View style={styles.dateContainer}>
          <AppText
            label={strings.paymentDate}
            fontFamily={Montserrat.Bold}
            color={colors.black}
          />
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
        </View>

        <View style={styles.container}>
          <CustomInput
            title={strings.transactionAmount}
            placeholder={strings.enterTransactionAmount}
            value={transactionAmount}
            onChangeText={setTransactionAmount}
            keyboardType="numeric"
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
            <TouchableOpacity onPress={chooseReceipt} style={styles.chooseFile}>
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
            onPress={onSubmit}
            containerStyle={styles.btnContainer}
          />
        </View>
      </ScrollView>
      {productVoucherReqRes?.isLoading && <Loader />}
    </View>
  );
};

export default ProductVoucherReq;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: globalStyles.statusBarMargin,
    paddingHorizontal: moderateWidth(4),
    backgroundColor: colors.offWhite,
  },
  dateContainer: {
    marginTop: moderateScale(25),
    paddingHorizontal: moderateWidth(5),
  },
  container: {
    marginTop: moderateScale(25),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(40),
    paddingHorizontal: moderateWidth(5),
  },
  yearText: {
    marginTop: moderateScale(7),
    marginBottom: moderateScale(5),
  },
  remarksContainer: {marginTop: moderateScale(12)},
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
  },
});
