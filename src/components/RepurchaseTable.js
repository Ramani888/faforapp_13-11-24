import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';

const TableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.headerSNo]}>S.No</Text>
      {/* <Text style={[styles.headerText, styles.headerItemDescription]}>
        Item Description
      </Text> */}
      <Text style={[styles.headerText, styles.headerQuantity]}>Quantity</Text>
      <Text style={[styles.headerText, styles.headerSalePrice]}>
        Sale Price
      </Text>
      {/* <Text style={[styles.headerText, styles.headerProductPv]}>
        Product PV
      </Text> */}
      <Text style={[styles.headerText, styles.headerTotal]}>Total</Text>
    </View>
  );
};

const TableRow = ({item, index}) => {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.rowText, styles.rowSNo]}>{index + 1}</Text>
      {/* <Text style={[styles.rowText, styles.rowItemDescription]}>
        {item.itemDescription}
      </Text> */}
      <Text style={[styles.rowText, styles.rowQuantity]}>{item.qty}</Text>
      <Text style={[styles.rowText, styles.rowSalePrice]}>{item.price}</Text>
      {/* <Text style={[styles.rowText, styles.rowProductPv]}>
        {item.productPV}
      </Text> */}
      <Text style={[styles.rowText, styles.rowTotal]}>{item?.totalAmount}</Text>
    </View>
  );
};

const RepurchaseTable = ({data}) => {
  return (
    <ScrollView style={styles.container} horizontal>
      <View style={styles.table}>
        <TableHeader />
        <FlatList
          data={data}
          renderItem={({item, index}) => <TableRow item={item} index={index} />}
          keyExtractor={item => item.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    margin: scale(5),
    marginLeft: scale(-5),
  },
  table: {
    borderTopWidth: scale(0.8),
    borderTopColor: colors.black,
    borderLeftWidth: scale(0.8),
    borderLeftColor: colors.black,
    borderRightWidth: scale(0.8),
    borderRightColor: colors.black,
    marginRight: scale(10),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.theme1,
    paddingVertical: verticalScale(10),
    borderBottomWidth: scale(0.8),
    borderBottomColor: colors.black,
    paddingVertical: verticalScale(-10),
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: scale(0.8),
    borderBottomColor: colors.black,
  },
  headerText: {
    flex: 1,
    fontFamily: Montserrat.SemiBold,
    color: colors.white,
    textAlign: 'center',
    paddingVertical: verticalScale(6),
    borderRightWidth: scale(0.8),
    borderRightColor: colors.black,
    paddingHorizontal: scale(2),
  },
  rowText: {
    flex: 1,
    fontFamily: Montserrat.Medium,
    color: colors.black,
    textAlign: 'center',
    paddingVertical: verticalScale(6),
    borderRightWidth: scale(0.8),
    borderRightColor: colors.black,
  },
  // Header Column Styles
  headerSNo: {width: scale(50)},
  headerItemDescription: {width: scale(120)},
  headerQuantity: {width: scale(80)},
  headerSalePrice: {width: scale(100)},
  headerProductPv: {width: scale(100)},
  headerTotal: {width: scale(100), borderRightWidth: 0},
  // Row Column Styles
  rowSNo: {width: scale(50)},
  rowItemDescription: {width: scale(120)},
  rowQuantity: {width: scale(80)},
  rowSalePrice: {width: scale(100)},
  rowProductPv: {width: scale(100)},
  rowTotal: {width: scale(100), borderRightWidth: 0},
});

export default RepurchaseTable;
