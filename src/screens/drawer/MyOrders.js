import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import { Loader } from "../../components/Loader";
import Row from "../../components/Row";
import strings from "../../constants/strings";
import {
  getDirectTeamList,
  getDirectTeamListClear,
} from "../../redux/slices/getDirectTeamList";
import colors from "../../themes/colors";
import globalStyles from "../../themes/globalStyles";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from "../../utils/responsive";
import { getMyOrders } from "../../redux/slices/getMyOrders";
import CustomButton from "../../components/CustomButton";
import axiosInstance from "../../utils/axiosInstance";
import apiRoutes from "../../constants/apiRoutes";
import { useNavigation } from "@react-navigation/native";
import screens from "../../constants/screens";

const MyOrders = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [ordersDetailData, setOrderDetailsData] = useState([]);

  const dispatch = useDispatch();
  const myOrdersResponse = useSelector((state) => state.getMyOrders);
  // console.log('myOrdersResponse',myOrdersResponse)

  useEffect(() => {
    const data = { id: global.userData?.id };
    dispatch(getMyOrders(data));
  }, []);

  useEffect(() => {
    if (myOrdersResponse?.data) {
      setOrdersData(myOrdersResponse?.data);
    }
    if (myOrdersResponse?.error) {
      Alert.alert(strings.faforlife, myOrdersResponse?.error);
      dispatch(getDirectTeamListClear());
    }
  }, [myOrdersResponse]);

  // ======================================= Api ======================================== //

  const getRegUpgOrderDetail = async (orderId) => {
    try {
      setVisible(true);
      const response = await axiosInstance.post(apiRoutes.regUpgOrderDetail, {
        order_id: orderId,
      });
      navigation.navigate(screens.orderDetail,{data: response?.data?.info})
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setVisible(false);
    }
  };

  const getRepurchaseOrderdetail = async (orderId) => {
    try {
      setVisible(true);
      const response = await axiosInstance.post(
        apiRoutes.repurchaseOrderdetail,
        {
          order_id: orderId,
        }
      );
      navigation.navigate(screens.orderDetail,{data: response?.data?.info})
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    // console.log('item',item)
    return (
      <View>
        <Row
          title={strings.orderId}
          value={item?.order_id}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.orderType}
          value={item?.order_type}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.orderDate}
          value={item?.ad_date}
          valueStyle={styles.valueStyle}
        />
        <CustomButton
          title={strings.viewDetails}
          textStyle={styles.btnText}
          containerStyle={styles.btnContainer}
          onPress={() => {
            if (item?.order_from == 1) {
              getRegUpgOrderDetail(item?.id);
            } else {
              getRepurchaseOrderdetail(item?.id);
            }
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {visible && <Loader />}
      <StatusBar barStyle={"dark-content"} />
      <Header title={strings.screenTitles.myOrders} hideAction />
      <View style={styles.container}>
        <FlatList
          data={ordersData}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          contentContainerStyle={styles.innerContainer}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <HorizontalLine />}
        />
      </View>
      {myOrdersResponse?.isLoading && <Loader />}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: globalStyles.statusBarMargin,
    paddingHorizontal: moderateWidth(4),
  },
  container: {
    marginTop: moderateScale(20),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
    height: moderateHeight(80),
  },
  flatList: { marginTop: moderateScale(20) },
  innerContainer: {
    paddingHorizontal: moderateWidth(5),
    paddingBottom: moderateScale(20),
  },
  valueStyle: { flex: 1 },
  btnContainer: {
    marginBottom: moderateScale(10),
    paddingVertical: moderateHeight(1.2),
    borderRadius: moderateScale(10),
  },
  btnText: { fontSize: moderateWidth(3.7) },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
