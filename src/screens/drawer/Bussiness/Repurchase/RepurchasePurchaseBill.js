import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import Feather from 'react-native-vector-icons/Feather';
import RepurchaseTable from '../../../../components/RepurchaseTable';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';
import CustomeButtonView from '../../../../Custome/CustomeButtonView';
import apiRoutes from '../../../../constants/apiRoutes';
import axiosInstanceForBussiness from '../../../../utils/axiosInstanceForBussiness';
import showMessageonTheScreen from '../../../../components/showMessageonTheScreen';
import {Loader} from '../../../../components/Loader';

const RepurchasePurchaseBill = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const cartData = global.repurchaseCartData;
  const discount = global.repurchaseDiscount;
  const sendCartData = cartData.map(item => ({
    product_id: item.id,
    mrp: item.price,
    qty: item.qty,
  }));

  const totalAmount = cartData.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalAmount);
  }, 0);
  const totalPV = cartData.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalPV);
  }, 0);

  // ======================================== Api ========================================= //

  const payment = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.payment}`,
        {
          user_id: `${global.userData?.id}`,
          country_id: global.RepurchaseCountryId,
          agency_code: global.repurchaseAgencyCode,
          total_amount: totalAmount,
          total_pv: totalPV,
          shop_cart: sendCartData,
        },
      );
      if (response?.data?.status == 200) {
        showMessageonTheScreen(response?.data?.msg);
        navigation.navigate(screens.repurchasePaymentSuccess);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================== End ========================================= //

  const previousStep = () => {
    navigation.goBack();
  };

  const nextStep = () => {
    payment();
  };

  const renderBody = () => {
    return (
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{marginTop: verticalScale(10)}}>
          <Feather name="menu" size={scale(25)} color={colors.black} />
        </Pressable>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Repurchase Bill</Text>
          <Text style={styles.subtitle}>
            Kindly confirm your order and make payment
          </Text>
        </View>

        <View style={styles.billContainer}>
          <Text style={styles.sectionTitle}>
            Purchase Under Repurchase Bill
          </Text>
          <RepurchaseTable data={cartData} />

          <View style={styles.paymentOptionsContainer}>
            <Text style={[styles.sectionTitle, {borderBottomWidth: scale(0)}]}>
              Payment Options
            </Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>{totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.balanceContainer}>
              <Text style={styles.amountLabel}>Balance After Purchase</Text>
              <Text style={styles.amountValue}>{totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.itemsContainer}>
              <View style={styles.itemsRow}>
                <Text style={styles.itemsLabel}>items</Text>
                <Text style={styles.itemsValue}>{cartData?.length}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemsRow}>
                <Text style={styles.itemsLabel}>Shipping Charge</Text>
                <Text style={styles.itemsValue}>0</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemsRow}>
                <Text style={styles.itemsLabel}>discount</Text>
                <Text style={styles.itemsValue}>{discount}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.itemsRow}>
                <Text style={styles.itemsLabel}>Grand Total</Text>
                <Text style={styles.itemsValue}>{totalAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          <CustomeButtonView
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={''}
            labels={''}
            lastButtonTitle={'Payment'}
            previous={true}
            next={true}
            buttonwidth={scale(130)}
            buttonContainerStyle={{marginHorizontal: scale(30)}}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {renderBody()}
      {isLoading && <Loader />}
    </View>
  );
};

export default RepurchasePurchaseBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenColor,
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
  },
  bodyContainer: {
    flex: 1,
    marginBottom: scale(5),
  },
  headerContainer: {
    marginTop: verticalScale(25),
  },
  title: {
    fontSize: scale(18),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    marginBottom: verticalScale(-5),
    lineHeight: verticalScale(30),
    marginTop: verticalScale(-15),
  },
  subtitle: {
    fontSize: scale(15),
    color: colors.grey,
    fontFamily: Montserrat.Medium,
    marginBottom: verticalScale(30),
    marginTop: verticalScale(5),
  },
  billContainer: {
    flex: 1,
    backgroundColor: colors.white,
    elevation: scale(5),
    borderRadius: scale(15),
    padding: scale(10),
    marginHorizontal: scale(3),
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: scale(13),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    padding: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.black,
  },
  paymentOptionsContainer: {
    marginTop: verticalScale(15),
  },
  amountContainer: {
    marginTop: verticalScale(10),
  },
  amountLabel: {
    fontSize: scale(11),
    color: colors.black,
    paddingLeft: scale(10),
    fontFamily: Montserrat.SemiBold,
  },
  amountValue: {
    backgroundColor: colors.screenColor,
    paddingLeft: scale(10),
    paddingVertical: verticalScale(15),
    borderRadius: scale(10),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    marginTop: verticalScale(10),
    textAlign: 'center',
    marginHorizontal: scale(10),
  },
  balanceContainer: {
    marginTop: verticalScale(15),
  },
  itemsContainer: {
    borderWidth: scale(0.8),
    borderRadius: scale(5),
    borderColor: colors.black,
    margin: scale(10),
    marginTop: verticalScale(20),
  },
  itemsRow: {
    flexDirection: 'row',
  },
  itemsLabel: {
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    width: scale(170),
    paddingLeft: scale(10),
    paddingVertical: scale(5),
  },
  itemsValue: {
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    width: scale(130),
    paddingLeft: scale(10),
    paddingVertical: scale(5),
  },
  separator: {
    borderBottomWidth: scale(0.8),
    borderBottomColor: colors.black,
  },
  buttonView: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },
});
