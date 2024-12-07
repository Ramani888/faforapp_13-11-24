import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axiosInstance from "../../utils/axiosInstance";
import apiRoutes from "../../constants/apiRoutes";
import { Loader } from "../../components/Loader";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
  verticalScale,
} from "../../utils/responsive";
import colors from "../../themes/colors";
import { Montserrat } from "../../themes/fonts";
import HorizontalLine from "../../components/HorizontalLine";
import strings from "../../constants/strings";
import Row from "../../components/Row";
import images from "../../themes/images";
import AppText from "../../components/AppText";

const UnilevalMonthlySalery = () => {
  const [visible, setVisible] = useState(false);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    getSponserData();
  }, []);

  const getSponserData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstance.post(apiRoutes.unilevelMonthlySalary, {
        user_id: global.userData.id,
      });
      setSalaryData(response?.data?.info || []);
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setVisible(false);
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View>
      {item?.ad_date && (
        <Row title={strings.date} value={item.ad_date} valueStyle={styles.valueStyle} />
      )}
      {item?.bonus_amount && (
        <Row title={strings.amount} value={item.bonus_amount} valueStyle={styles.valueStyle} />
      )}
    </View>
  ), []);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <View style={styles.screen}>
      {visible && <Loader />}
      <Text style={styles.headerText}>
        Unileval monthly salary
      </Text>
      <View style={styles.container}>
        <ImageBackground source={images.balanceBg} resizeMode="contain" style={styles.balanceContainer}>
          {salaryData[0]?.bonus_amount && (
            <AppText
              label={salaryData[0].bonus_amount}
              size={"enormous"}
              fontFamily={Montserrat.Bold}
              color={colors.white}
            />
          )}
          <AppText
            label={'Unileval Monthly Salary'}
            size={"regular"}
            fontFamily={Montserrat.Regular}
            color={colors.white}
          />
        </ImageBackground>
        <FlatList
          data={salaryData}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          contentContainerStyle={styles.innerContainer}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={HorizontalLine}
          initialNumToRender={10}
          windowSize={10}
          maxToRenderPerBatch={5}
        />
      </View>
    </View>
  );
};

export default React.memo(UnilevalMonthlySalery);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerText: {
    fontSize: scale(22),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    alignSelf: "center",
    marginTop: verticalScale(25),
  },
  container: {
    marginTop: moderateScale(20),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
    height: moderateHeight(80),
    marginHorizontal: scale(20),
  },
  balanceContainer: {
    width: "100%",
    height: moderateHeight(30),
    alignSelf: "center",
    alignItems: "center",
    paddingTop: moderateScale(65),
    marginTop: moderateScale(-10),
  },
  flatList: {
    marginTop: moderateScale(-15),
  },
  innerContainer: {
    paddingHorizontal: moderateWidth(5),
    paddingBottom: moderateScale(20),
  },
  valueStyle: {
    flex: 1,
  },
});
