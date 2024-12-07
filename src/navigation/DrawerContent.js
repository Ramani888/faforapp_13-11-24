import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { useDrawerStatus } from "@react-navigation/drawer";

import images from "../themes/images";
import colors from "../themes/colors";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
  verticalScale,
} from "../utils/responsive";
import AppText from "../components/AppText";
import { Montserrat } from "../themes/fonts";
import screens from "../constants/screens";
import { logout } from "../redux/slices/logout";
import strings from "../constants/strings";
import AntDesign from "react-native-vector-icons/AntDesign";

export function DrawerContent(props) {
  const drawerStatus = useDrawerStatus();
  const [visibleSubmenus, setVisibleSubmenus] = useState({});
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userDetails);

  const toggleSubmenu = (key) => {
    setVisibleSubmenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "dashboard",
      screen: screens.dashboard,
    },
    {
      label: "Business",
      icon: "business",
      submenu: [
        { label: "Registration", screen: screens.sponserDetail },
        { label: "Repurchase", screen: screens.welcomeRepurchase },
        { label: "Upgrade", screen: screens.businessUpgrade },
      ],
    },
    {
      label: "Balance Request",
      icon: "money",
      submenu: [
        { label: "Balance Request", screen: "BalancerequestScreen" },
        {
          label: "Balance Request Report",
          screen: screens.report,
          params: {
            type: strings.screenTitles.balanceRequestReport,
            reportType: "balancerequest",
          },
        },
        {
          label: "Product Voucher Request",
          screen: screens.productVoucherRequest,
        },
        {
          label: "Product Voucher Report",
          screen: screens.report,
          params: {
            type: strings.screenTitles.productVoucherReport,
            reportType: "productvoucherrequest",
          },
        },
      ],
    },
    {
      label: "Unilevel Withdraw",
      icon: "business",
      submenu: [
        { label: "Withdraw Request", screen: screens.unilevelWithdraw },
        {
          label: "Withdraw History",
          screen: screens.report,
          params: {
            type: strings.screenTitles.unilevelWithdrawHistory,
            reportType: "unilevelwithdraw",
          },
        },
      ],
    },
    {
      label: "Income",
      icon: "money",
      submenu: [
        {
          label: strings.pairingBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.pairBonusHistory,
            reportType: "pairbonus",
          },
        },
        {
          label: strings.sponserBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.sponserBonusHistory,
            reportType: "sponserbonus",
          },
        },
        {
          label: strings.upgradeBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.upgradeBonusHistory,
            reportType: "upgradebonus",
          },
        },
        {
          label: strings.uniLevelBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.unilevelBonusHistory,
            reportType: "unilevelbonus",
          },
        },
        {
          label: strings.indirectBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.indirectBonusHistory,
            reportType: "indirectbonus",
          },
        },
        {
          label: strings.selfUniLevelBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.selfUniLevelBonusHistory,
            reportType: "selfunilevelbonus",
          },
        },
        {
          label: strings.leadershipBonus,
          screen: screens.report,
          params: {
            type: strings.screenTitles.leadershipBonusHistory,
            reportType: "leadershipbonus",
          },
        },
        {
          label: strings.screenTitles.unilevalMonthlySalery,
          screen: screens.unilevalMonthlySalery,
          params: { type: strings.screenTitles.unilevalMonthlySalery },
        },
        {
          label: strings.screenTitles.stockistRetailHistory,
          screen: screens.stockistRetailHistory,
          params: { type: strings.screenTitles.sponserBonusHistory },
        },
      ],
    },
    { label: strings.myTeam, icon: "money", screen: "DirectteamScreen" },
    {
      label: "Wallet Conversion",
      icon: "wallet",
      screen: screens.walletConversation,
    },
  ];

  const array = "data?.name data?.name data?.name";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.mainContainer,
        drawerStatus === "open" && { width: moderateWidth(85) },
        drawerStatus !== "open" && { backgroundColor: colors.nevyBlue },
      ]}
    >
      <StatusBar hidden={true} />
      <DrawerContentScrollView style={styles.container} {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground
            source={require("../assets/images/cashoutBg.png")}
            style={{ height: verticalScale(165) }}
            imageStyle={{
              borderTopRightRadius: scale(45),
              marginTop: verticalScale(-5),
            }}
          >
            <Pressable onPress={() => props.navigation.closeDrawer()}>
              <AntDesign
                name="close"
                size={scale(20)}
                color={colors.white}
                style={{
                  position: "absolute",
                  left: scale(20),
                  top: verticalScale(15),
                }}
              />
            </Pressable>
            <View style={styles.userProfileView}>
              <Image source={images.userPlaceholder} style={styles.userImg} />
              <AppText
                label={data?.name}
                size={"large"}
                fontFamily={Montserrat.Bold}
                color={colors.white}
                textStyles={styles.name}
              />
              <AppText
                label={data?.self_id}
                size={"regular"}
                fontFamily={Montserrat.Bold}
                color={colors.greenAccent}
              />
            </View>
          </ImageBackground>

          <Drawer.Section
            style={{
              marginTop:
                data?.name > 22 ? verticalScale(30) : verticalScale(15),
            }}
          >
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <DrawerItem
                  style={styles.drawerItems}
                  icon={({ color, size }) => (
                    <Icon
                      name={item.icon}
                      color="#00cbaa"
                      size={25}
                      style={styles.iconStyle}
                    />
                  )}
                  label={item.label}
                  onPress={() => {
                    item.submenu
                      ? toggleSubmenu(index)
                      : props.navigation.navigate(item.screen);
                  }}
                  labelStyle={styles.drawerItemLabel}
                />
                {item.submenu && visibleSubmenus[index] && (
                  <View style={styles.submenuContainer}>
                    {item.submenu.map((subItem, subIndex) => (
                      <DrawerItem
                        key={subIndex}
                        style={styles.drawerItemsSub}
                        icon={({ color, size }) => (
                          <Icon
                            name="chevron-right"
                            color="#00cbaa"
                            size={25}
                            style={styles.iconStyle}
                          />
                        )}
                        label={subItem.label}
                        onPress={() =>
                          props.navigation.navigate(
                            subItem.screen,
                            subItem.params
                          )
                        }
                        labelStyle={styles.submenuLabel}
                      />
                    ))}
                  </View>
                )}
              </React.Fragment>
            ))}
            <DrawerItem
              style={styles.drawerItems}
              icon={({ color, size }) => (
                <Icon
                  name="wallet"
                  color="#00cbaa"
                  size={25}
                  style={styles.iconStyle}
                />
              )}
              label="Cashout History"
              onPress={() => {
                props.navigation.navigate(screens.report, {
                  type: strings.screenTitles.cashWalletHistory,
                  reportType: "cashwallet",
                });
              }}
              labelStyle={{ color: "#ffffff", fontSize: 18 }}
            />

            <DrawerItem
              style={styles.drawerItems}
              icon={({ color, size }) => (
                <Icon
                  name="wallet"
                  color="#00cbaa"
                  size={25}
                  style={styles.iconStyle}
                />
              )}
              label="Spending History"
              onPress={() => {
                props.navigation.navigate(screens.report, {
                  type: strings.screenTitles.spendingWalletHistory,
                  reportType: "spendingwallet",
                });
              }}
              labelStyle={{ color: "#ffffff", fontSize: 18 }}
            />
            <DrawerItem
              style={styles.drawerItems}
              icon={({ color, size }) => (
                <Icon
                  name="wallet"
                  color="#00cbaa"
                  size={25}
                  style={styles.iconStyle}
                />
              )}
              label="My Orders"
              onPress={() => {
                props.navigation.navigate(screens.myOrders);
              }}
              labelStyle={{ color: "#ffffff", fontSize: 18 }}
            />
             <DrawerItem
              style={[styles.drawerItems, { marginBottom: 10 }]}
              icon={({ color, size }) => (
                <Icon
                  name="wallet"
                  color="#00cbaa"
                  size={25}
                  style={styles.iconStyle}
                />
              )}
              label="Privacy & Policy"
              onPress={() => {
                props.navigation.navigate(screens.privacyPolicy);
              }}
              labelStyle={{ color: "#ffffff", fontSize: 18 }}
            />
            
            <DrawerItem
              style={[styles.drawerItems, styles.logoutView]}
              label="Logout"
              onPress={() => {
                dispatch(logout());
              }}
              labelStyle={styles.logoutLable}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.nevyBlue,
    borderTopRightRadius: moderateScale(50),
    borderBottomRightRadius: moderateScale(50),
  },
  userProfileView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(50),
    backgroundColor: colors.white,
    width: scale(260),
    paddingVertical: verticalScale(10),
    marginLeft: scale(1.5),
    alignSelf: "center",
    borderRadius: scale(20),
    marginBottom: verticalScale(-15),
  },
  name: {
    marginBottom: moderateHeight(0.3),
    color: colors.greenAccent,
    marginTop: verticalScale(50),
    marginBottom: verticalScale(2),
    textAlign: "center",
  },
  userImg: {
    width: moderateScale(95),
    height: moderateScale(95),
    borderRadius: moderateScale(70),
    borderColor: colors.greenAccent,
    borderWidth: moderateScale(2),
    position: "absolute",
    top: verticalScale(-35),
  },
  drawerItems: {
    marginBottom: -10,
  },
  drawerItemsSub: {
    marginLeft: 20,
    marginBottom: -10,
  },
  iconStyle: {
    marginRight: -20,
  },
  drawerSection: {
    marginTop: verticalScale(18),
    // borderBottomWidth:scale(1),
    // borderColor:colors.red
  },
  drawerItemLabel: {
    color: colors.white,
    fontSize: 18,
  },
  submenuLabel: {
    color: colors.white,
    fontSize: scale(14),
  },
  submenuContainer: {
    paddingLeft: moderateScale(10),
  },
  logoutView: {
    marginBottom: verticalScale(10),
    backgroundColor: "#ff3066",
    height: scale(64),
    width: scale(64),
    borderRadius: scale(32),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: verticalScale(20),
    elevation: scale(10),
    shadowColor: "#ff3066",
    marginBottom: verticalScale(70),
  },
  logoutLable: {
    color: colors.white,
    fontSize: scale(13),
    width: scale(50),
    textAlign: "center",
  },
});
