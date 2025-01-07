import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { scale, verticalScale } from "../utils/responsive";
import { Montserrat } from "../themes/fonts";
import colors from "../themes/colors";

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.headerSNo]}>S.No</Text>
    <Text style={[styles.headerText, styles.headerImage]}>Image</Text>
    <Text style={[styles.headerText, styles.headerTitle]}>Title</Text>
    <Text style={[styles.headerText, styles.headerQty]}>Qty</Text>
    <Text style={[styles.headerText, styles.headerPrice]}>Price</Text>
    <Text style={[styles.headerText, styles.headerTotal]}>Total</Text>
  </View>
);

const TableRow = ({ item, order_from, index }) => (
  <View style={styles.tableRow}>
    <Text style={[styles.rowText, styles.rowSNo, styles.headerSNo]}>
      {index + 1}
    </Text>
    <Image
      source={{
        uri: item?.image,
      }}
      style={[styles.rowImage, styles.headerImage]}
    />
    <Text
      style={[
        styles.rowText,
        styles.headerTitle,
        { borderLeftWidth: scale(1), marginLeft: scale(-0.5) },
      ]}
    >
      {item?.product_name}
    </Text>
    <Text style={[styles.rowText, styles.headerQty]}>{order_from == 1 ? item?.qty : item?.product_qty}</Text>
    <Text style={[styles.rowText, styles.headerPrice]}>
      {item?.product_price}
    </Text>
    <Text style={[styles.rowText, styles.headerTotal]}>
      {item?.product_total_price}
    </Text>
  </View>
);

const OrderDetailTable = ({ data, order_from }) => {
  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.table}>
        <TableHeader />
        {data?.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View>
                <TableRow item={item} order_from={order_from} index={index} />
                {data?.length - 1 !== index && (
                  <View
                    style={styles.horizontalLine}
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <Text style={styles.noData}>No data found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: scale(10),
  },
  table: {
    borderWidth: scale(1),
    borderColor: colors.black,
    borderRadius: scale(5),
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomWidth: scale(1),
    borderBottomColor: colors.black,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: colors.black,
    backgroundColor: colors.white,
  },
  headerText: {
    fontFamily: Montserrat.SemiBold,
    color: colors.black,
    textAlign: "center",
    paddingVertical: verticalScale(8),
    borderRightWidth: scale(1),
    borderRightColor: colors.black,
  },
  rowText: {
    fontFamily: Montserrat.Medium,
    color: colors.black,
    textAlign: "center",
    paddingVertical: verticalScale(8),
    borderRightWidth: scale(1),
    borderRightColor: colors.black,
  },
  headerSNo: { width: scale(50) },
  headerImage: { width: scale(79) },
  headerTitle: { width: scale(120) },
  headerQty: { width: scale(60) },
  headerPrice: { width: scale(100) },
  headerTotal: { width: scale(100), borderRightWidth: 0 },
  rowSNo: { width: scale(50) },
  rowImage: {
    width: scale(29),
    height: scale(29),
    resizeMode: "contain",
    alignSelf: "center",
    // borderWidth: scale(1),
    // borderRightWidth:scale(1),
    // borderColor: colors.black,
    marginVertical: verticalScale(5),
  },
  rowTitle: { width: scale(120) },
  rowQty: { width: scale(60) },
  rowPrice: { width: scale(100) },
  rowTotal: { width: scale(100), borderRightWidth: 0 },
  noData: {
    fontSize: scale(15),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    textAlign: "center",
    paddingVertical: verticalScale(5),
  },
  horizontalLine:{
    borderBottomWidth: scale(1),
    borderBottomColor: colors.black,
  }
});

export default OrderDetailTable;
