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
import { unilevelPayMethods } from "../../constants/localData";
import strings from "../../constants/strings";
import {
  unilevelWithdrawRequest,
  unilevelWithdrawRequestClear,
} from "../../redux/slices/unilevelWithdrawRequest";
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
const UnilevelWithdrawScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [amount, setAmount] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    unilevelPayMethods[0]
  );

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const unilevelWithdrawRequestRes = useSelector(
    (state) => state.unilevelWithdrawRequest
  );

  const onWithdraw = () => {
    if (!amount) {
      Alert.alert(strings.faforlife, strings.pleaseEnterAmount);
    } else {
      const data =
        selectedPaymentMethod?.title === "Registration Wallet" ||
        selectedPaymentMethod?.title === "Product voucher"
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

      dispatch(unilevelWithdrawRequest(data));
    }
  };

  const resetState = () => {
    setAmount("");
    setSelectedPaymentMethod(unilevelPayMethods[0]);
    dispatch(unilevelWithdrawRequestClear());
  };

  useEffect(() => {
    if (unilevelWithdrawRequestRes?.data) {
      Alert.alert(strings.faforlife, unilevelWithdrawRequestRes?.data?.msg);
      resetState();
      const data = { self_id: global.userData?.self_id };
      dispatch(getUserDetails(data));
    }
    if (unilevelWithdrawRequestRes?.error) {
      Alert.alert(strings.faforlife, unilevelWithdrawRequestRes?.error);
      resetState();
    }
  }, [unilevelWithdrawRequestRes]);

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
        <Header title={strings.screenTitles.unilevelWithdrawRequest} />
        <View style={styles.container}>
          <ImageBackground
            source={images.cashoutBg}
            resizeMode="contain"
            style={styles.balanceContainer}
          >
            <AppText
              label={`N ${userData?.unilevel_bouns}`}
              size={"enormous"}
              fontFamily={Montserrat.Bold}
              color={colors.white}
            />
            <AppText
              label={strings.uniLevelBonus}
              size={"regular"}
              fontFamily={Montserrat.Regular}
              color={colors.green}
            />
          </ImageBackground>
          <View style={styles.innerContainer}>
            {/* <AppText
              label={strings.note}
              size={'large'}
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
            /> */}
            <CustomInput
              title={strings.enterAmount}
              value={amount}
              onChangeText={setAmount}
              placeholder={strings.enterWithdrawAmount}
              keyboardType="numeric"
            />
            <AppText
              label={strings.paymentMethod}
              fontFamily={Montserrat.Bold}
              color={colors.black}
              textStyles={styles.paymentTitle}
            />
            <HorizontalSelector
              data={unilevelPayMethods}
              selected={selectedPaymentMethod}
              onSelect={setSelectedPaymentMethod}
            />
            {(selectedPaymentMethod?.title === "Registration Wallet" ||
              selectedPaymentMethod?.title === "Product voucher") && (
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
      {(unilevelWithdrawRequestRes?.isLoading || userDetails?.isLoading) && (
        <Loader />
      )}
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

export default UnilevelWithdrawScreen;
