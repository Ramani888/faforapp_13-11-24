import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "../../components/DashboardCard";
import DashboardChip from "../../components/DashboardChip";
import DashboardProfile from "../../components/DashboardProfile";
import { Loader } from "../../components/Loader";
import VerticleLine from "../../components/VerticleLine";
import strings from "../../constants/strings";
import {
  getUserDetails,
  getUserDetailsClear,
} from "../../redux/slices/getUserDetails";
import colors from "../../themes/colors";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
  verticalScale,
} from "../../utils/responsive";
import images from "../../themes/images";
import {
  getLeadership,
  getLeadershipClear,
} from "../../redux/slices/getLeadership";
import AppText from "../../components/AppText";
import { Montserrat } from "../../themes/fonts";
import { useIsFocused } from "@react-navigation/native";
import axiosInstance from "../../utils/axiosInstance";
import apiRoutes from "../../constants/apiRoutes";

const rankList = [
  { id: 0, image: images.sliver, key: "sliver" },
  { id: 1, image: images.gold, key: "gold" },
  { id: 2, image: images.ruby, key: "ruby" },
  { id: 3, image: images.diamond, key: "diamond" },
  { id: 4, image: images.ambassador, key: "ambassador" },
  {
    id: 5,
    image: images.crown,
    key: "crown",
    imgStyle: { height: moderateScale(80) },
  },
  { id: 6, image: images.director, key: "director" },
];

const DashboardScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [userData, setUserData] = useState({});
  const [leadershipRank, setLeadershipRank] = useState({});
  const [visible, setVisible] = useState(false);
  const [achivementData, setAchivementData] = useState([]);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const getLeadershipRes = useSelector((state) => state.getLeadership);

  const getAchivementData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstance.post(
        apiRoutes.getAchivementData,
        {
          id: global.userData.id,
        }
      );

      setAchivementData(response?.data?.info);
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (global.userData?.self_id) {
      const data = { self_id: global.userData?.self_id };
      dispatch(getUserDetails(data));
    }
  }, [isFocused]);

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
    const data = {
      id: global?.userData?.id,
      self_id: global?.userData?.self_id,
    };
    dispatch(getLeadership(data));
    getAchivementData();
  }, []);

  useEffect(() => {
    if (getLeadershipRes?.data) {
      setLeadershipRank(getLeadershipRes?.data?.rank);
    }
    if (getLeadershipRes?.error) {
      Alert.alert(strings.faforlife, getLeadershipRes?.error);
      dispatch(getLeadershipClear());
    }
  }, [getLeadershipRes]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.rankContainer}>
          <Image
            source={{ uri: item?.image }}
            style={[styles.rankImage, item?.imgStyle && item?.imgStyle]}
          />
        </View>
        <AppText
          label={item?.status}
          size={"extraSmall"}
          fontFamily={Montserrat.SemiBold}
          color={colors.white}
          textStyles={[
            styles.status,
            {
              backgroundColor:
                item?.status !== 'IN PROGRSS' ? colors.green : colors.pink,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation?.toggleDrawer()}
      >
        <SimpleIcon name={"menu"} size={25} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.headercontainer}>
        <ImageBackground
          source={require("../../assets/images/background2.jpg")}
          resizeMode="cover"
          style={styles.headercontainer}
        ></ImageBackground>
      </View>
      <View style={styles.dashboardProfileContainer}>
        <DashboardProfile data={userData} />
      </View>
      {!userDetails?.isLoading ? (
        <SafeAreaView style={styles.innerWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.innerContainer}
            // contentContainerStyle={styles.contentContainerStyle}
          >
            <View style={styles.mainSection}>
              <View style={styles.row}>
                <DashboardCard
                  title={strings.rankingLeftPV}
                  value={userData?.total_left_pv}
                />
                <VerticleLine />
                <DashboardCard
                  title={strings.rankingRightPV}
                  value={userData?.total_right_pv}
                />
              </View>
              {userData?.rank >= 7 && (
                <View style={styles.row}>
                  <DashboardChip
                    title={strings.leftEp}
                    value={userData?.left_ep}
                    chipWidth={'46%'}
                  />

                  <DashboardChip
                    title={strings.rightEp}
                    value={userData?.right_ep}
                    chipWidth={'46%'}
                  />
                </View>
              )}
              <View style={styles.row}>
                <DashboardCard
                  title={strings.pairingLeftPV}
                  value={userData?.left_pv}
                  bgColor={colors.pink}
                />
                <VerticleLine />
                <DashboardCard
                  title={strings.pairingRightPV}
                  value={userData?.right_pv}
                  bgColor={colors.pink}
                />
              </View>
              <View style={styles.row}>
                <DashboardChip
                  title={strings.travelAwardPvGrop}
                  value={userData?.travel_group_pv}
                />

                <DashboardChip
                  title={strings.travelAwardPvPersonal}
                  value={userData?.travel_personal_pv}
                />
                {userData?.rank >= 7 && (
                  <DashboardChip
                    title={strings.personalEp}
                    value={userData?.personal_ep}
                  />
                )}
              </View>
              <View style={styles.row}>
                {/* <DashboardChip
                  title={strings.totalUpgradePV}
                  value={userData?.upgrade_pv}
                />
                <DashboardChip
                  title={strings.totalUpgradePV}
                  value={userData?.upgrade_pv}
                /> */}
                <DashboardChip
                  title={strings.packageAmount}
                  value={userData?.package_amount}
                />
                <DashboardChip
                  title={strings.cashWalletPoint}
                  value={userData?.cash_wallet}
                />
                <DashboardChip
                  title={strings.pairBonusPoint}
                  value={userData?.pair_bouns}
                />
              </View>
              <View style={styles.row}>
                <DashboardChip
                  title={strings.productVoucherWallet}
                  value={userData?.product_wallet}
                />
                <DashboardChip
                  title={strings.placementBonusPoint}
                  value={userData?.placement_bouns}
                />
                <DashboardChip
                  textColor={colors.white}
                  bgColor={colors.greenHue}
                  title={strings.unilevelWallet}
                  value={userData?.unilevel_bouns}
                />
              </View>
              <View style={styles.row}>
                <DashboardChip
                  title={strings.stockistRetailBonus}
                  value={userData?.stockist_retail_wallet}
                />
                <DashboardChip
                  title={strings.totalIndirectBonus}
                  value={userData?.indirect_bouns}
                />
                <DashboardChip
                  title={strings.leadershipPoolBonus}
                  value={userData?.leadership_pool_bouns}
                />
              </View>
              <View style={styles.row}>
                <DashboardChip
                  title={strings.totalEarnings}
                  value={userData?.total_earning}
                />

                {/* <DashboardChip
                  title={strings.travelAwardPvGrop}
                  value={userData?.travel_group_pv}
                />

                <DashboardChip
                  title={strings.travelAwardPvPersonal}
                  value={userData?.travel_personal_pv}
                /> */}
              </View>

              {/* {userData?.rank >= 7 && (
                <View style={styles.row}>
                  <DashboardChip
                    title={strings.leftEp}
                    value={userData?.left_ep}
                  />

                  <DashboardChip
                    title={strings.rightEp}
                    value={userData?.right_ep}
                  />

                  <DashboardChip
                    title={strings.personalEp}
                    value={userData?.personal_ep}
                  />
                </View>
              )} */}
            </View>

            <TouchableOpacity
              style={styles.menuContainer}
              onPress={() => navigation?.toggleDrawer()}
            >
              {/* <SimpleIcon name={"menu"} size={25} color={colors.black} /> */}
            </TouchableOpacity>
            <ScrollView style={styles.leadershipScrollView}>
              <Image source={images.leaderHead} style={styles.leaderHead} />
              <Image source={images.star} style={styles.starsIcon} />
              <AppText
                label={strings.leadershipRankAndAchivements}
                size={"meduim"}
                fontFamily={Montserrat.SemiBold}
                color={colors.black}
                centered
              />
              <FlatList
                scrollEnabled={false}
                numColumns={3}
                key={"_"}
                data={achivementData}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
              />
            </ScrollView>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  headercontainer: {
    backgroundColor: "red",
    height: verticalScale(240),
    borderBottomLeftRadius: scale(50),
    borderBottomRightRadius: scale(50),
    overflow: "hidden",
  },
  menuContainer: {
    position: "absolute",
    top: verticalScale(30),
    left: scale(20),
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: { marginTop: moderateScale(17) },
  contentContainerStyle: {
    paddingBottom: moderateScale(150),
  },
  mainSection: {
    marginTop: moderateHeight(2),
    paddingHorizontal: moderateWidth(5),
  },
  dashboardProfileContainer: {
    position: "absolute",
    top: scale(100),
  },
  innerWrapper: {
    flex: 1,
    marginTop: scale(80),
  },
  leadershipScrollView: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(-45),
  },
  leaderHead: {
    height: moderateScale(80),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  starsIcon: {
    height: moderateScale(30),
    resizeMode: "contain",
    alignSelf: "center",
  },
  rankContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: colors.white,
    marginBottom: moderateScale(7),
    marginHorizontal: moderateScale(7),
    borderRadius: moderateScale(7),
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  rankImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: "contain",
  },
  listContainer: {
    alignSelf: "center",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(70),
  },
  status: {
    alignSelf: "center",
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(3),
  },
});

export default DashboardScreen;
