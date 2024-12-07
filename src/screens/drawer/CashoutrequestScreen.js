import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppText from "../../components/AppText";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Header from "../../components/Header";
import HorizontalSelector from "../../components/HorizontalSelector";
import { Loader } from "../../components/Loader";
import { paymentMethods } from "../../constants/localData";
import strings from "../../constants/strings";
import {
  cashoutRequest,
  cashoutRequestClear,
} from "../../redux/slices/cashoutRequest";
import {
  getUserDetails,
  getUserDetailsClear,
} from "../../redux/slices/getUserDetails";
import colors from "../../themes/colors";
import { Montserrat } from "../../themes/fonts";
import globalStyles from "../../themes/globalStyles";
import images from "../../themes/images";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  verticalScale,
} from "../../utils/responsive";
const CashoutrequestScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [amount, setAmount] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const cashoutRequestRes = useSelector((state) => state.cashoutRequest);

  const onWithdraw = () => {
    if (!amount) {
      Alert.alert(strings.faforlife, strings.pleaseEnterAmount);
    } else {
      const data =
        selectedPaymentMethod?.title === "Registration Wallet" ||
        selectedPaymentMethod?.title === "Product wallet"
          ? {
              self_id: global?.userData?.self_id,
              amount: amount,
              request_type: selectedPaymentMethod?.id,
              txn_password: txnPassword,
            }
          : {
              self_id: global?.userData?.self_id,
              amount: amount,
              request_type: selectedPaymentMethod?.id,
            };
      dispatch(cashoutRequest(data));
    }
  };

  const resetState = () => {
    setAmount("");
    setTxnPassword('')
    setSelectedPaymentMethod(paymentMethods[0]);
    dispatch(cashoutRequestClear());
  };

  useEffect(() => {
    if (cashoutRequestRes?.data) {
      Alert.alert(strings.faforlife, cashoutRequestRes?.data?.msg);
      resetState();
      const data = { self_id: global.userData?.self_id };
      dispatch(getUserDetails(data));
    }
    if (cashoutRequestRes?.error) {
      Alert.alert(strings.faforlife, cashoutRequestRes?.error);
      resetState();
    }
  }, [cashoutRequestRes]);

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
      <StatusBar barStyle={"dark-content"} />
      <ScrollView>
        <Header title={strings.screenTitles.cashoutRequest} />
        <View style={styles.container}>
          <ImageBackground
            source={images.cashoutBg}
            resizeMode="contain"
            style={styles.balanceContainer}
          >
            <AppText
              label={`N ${userData?.spending_wallet}`}
              size={"enormous"}
              fontFamily={Montserrat.Bold}
              color={colors.white}
            />
            <AppText
              label={strings.spendingWalletBalance}
              size={"regular"}
              fontFamily={Montserrat.Regular}
              color={colors.green}
            />
          </ImageBackground>
          <View style={styles.innerContainer}>
            <AppText
              label={strings.note}
              size={"large"}
              fontFamily={Montserrat.SemiBold}
              color={colors.black}
              centered
              textStyles={styles.noteTitle}
            />
            <AppText
              label={strings.cashoutNote}
              fontFamily={Montserrat.Regular}
              color={colors.black}
              centered
              textStyles={styles.noteDesc}
            />
            <CustomInput
              title={strings.account}
              value={amount}
              onChangeText={setAmount}
              placeholder={strings.enterAmount}
              keyboardType="numeric"
            />
            <AppText
              label={strings.paymentMethod}
              fontFamily={Montserrat.Bold}
              color={colors.black}
              textStyles={styles.paymentTitle}
            />
            <HorizontalSelector
              data={paymentMethods}
              selected={selectedPaymentMethod}
              onSelect={setSelectedPaymentMethod}
            />
            {(selectedPaymentMethod?.title === "Product wallet" ||
              selectedPaymentMethod?.title === "Registration wallet") && (
              <View style={{ marginTop: verticalScale(15) }}>
                <CustomInput
                  title={strings.txnPassword}
                  value={txnPassword}
                  onChangeText={setTxnPassword}
                  placeholder={strings.enterTxnPassword}
                  keyboardType="numeric"
                />
              </View>
            )}
            <CustomButton
              onPress={onWithdraw}
              title={strings.withdraw}
              bgColor={colors.darkBlue}
              btnRadius={moderateScale(5)}
              containerStyle={styles.btnContainer}
            />
          </View>
        </View>
      </ScrollView>
      {(cashoutRequestRes?.isLoading || userDetails?.isLoading) && <Loader />}
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
    width: "100%",
    height: moderateHeight(30),
    alignSelf: "center",
    alignItems: "center",
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
  noteTitle: {
    marginTop: moderateScale(-20),
    marginBottom: moderateScale(5),
  },
  noteDesc: { marginBottom: moderateScale(20) },
  paymentTitle: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(7),
  },
  btnContainer: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(40),
  },
});

export default CashoutrequestScreen;
