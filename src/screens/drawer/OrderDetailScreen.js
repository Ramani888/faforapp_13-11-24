import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../themes/colors";
import { scale, verticalScale } from "../../utils/responsive";
import { Montserrat } from "../../themes/fonts";
import { useRoute } from "@react-navigation/native";
import OrderDetailTable from "../../components/OrderDetailTable";

const OrderDetailScreen = () => {
  const route = useRoute();
  const { data, order_from } = route.params;

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>User Details</Text>
      </View>
      <View style={styles.detailsContainer}>
        {data?.name && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>Name</Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.name}
            </Text>
          </View>
        )}
        {data?.mobile && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>
              Mobile Number
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.mobile}
            </Text>
          </View>
        )}
        {data?.country_name && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>
              Country Name
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.country_name}
            </Text>
          </View>
        )}
        {data?.order_date && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>
              Order Date
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.order_date}
            </Text>
          </View>
        )}
        {data?.shipping_charge && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>
              Shipping Charge
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.shipping_charge}
            </Text>
          </View>
        )}
        {data?.discount && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, styles.labelText]}>
              Discount
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.discount}
            </Text>
          </View>
        )}
        {data?.total_amount && (
          <View style={order_from == 1 ? styles.detailRow : styles.detailRowMobile}>
            <Text style={[styles.detailText, styles.labelText]}>
              Total Amount
            </Text>
            <Text style={[styles.detailText, { width: scale(145) }]}>
              {data?.total_amount}
            </Text>
          </View>
        )}
        {data?.package_img && (
          <Image
            source={{
              uri: data?.package_img,
            }}
            style={styles.image}
          />
        )}
        {!data?.name && !data?.mobile && !data?.mobile && (
          <View>
            <Text style={styles.noData}>No data found</Text>
          </View>
        )}
      </View>
      <View style={styles.tableView}>
        <OrderDetailTable data={data?.package_products} order_from={order_from} />
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(50),
    borderWidth: scale(0.5),
    borderTopRightRadius: scale(35),
    borderTopLeftRadius: scale(35),
    borderTopColor: "green",
    borderRightColor: "green",
    borderLeftColor: "green",
    borderBottomColor: "#0000CD",
  },
  headerText: {
    fontSize: scale(15),
    color: colors.black,
    textAlign: "center",
    paddingVertical: verticalScale(10),
    fontFamily: Montserrat.Medium,
  },
  detailsContainer: {
    marginHorizontal: scale(20),
    borderRightWidth: scale(0.5),
    borderLeftWidth: scale(0.5),
    borderBottomWidth: scale(0.5),
    borderColor: "green",
    borderBottomRightRadius: scale(35),
    borderBottomLeftRadius: scale(35),
  },
  detailRow: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginTop: verticalScale(15),
    marginHorizontal: scale(15),
  },
  detailRowMobile: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginTop: verticalScale(15),
    marginHorizontal: scale(15),
    marginVertical: verticalScale(20),
  },
  detailText: {
    fontSize: scale(13),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    textAlign: "left",
  },
  labelText: {
    width: scale(140),
  },
  image: {
    width: scale(120),
    height: scale(120),
    alignSelf: "center",
    marginVertical: verticalScale(25),
  },
  tableView: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(15),
  },
  noData: {
    fontSize: scale(15),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    textAlign: "center",
    paddingVertical: verticalScale(10),
  },
});
