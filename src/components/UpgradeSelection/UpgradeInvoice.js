import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RepurchaseTable from '../RepurchaseTable';
import colors from '../../themes/colors';
import {scale, verticalScale} from '../../utils/responsive';
import {Montserrat} from '../../themes/fonts';
import CustomDropDown from '../CustomDropDown';
import CustomeButton from '../../Custome/CustomeButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import showMessageonTheScreen from '../showMessageonTheScreen';
import CustomeInputField from '../../Custome/CustomeInputField';

const walletData = [{title: 'wallet'}];

const TransactionIDData = [
  {title: 'TransactionID1'},
  {title: 'TransactionID2'},
  {title: 'TransactionID3'},
  {title: 'TransactionID4'},
];

const UpgradeInvoice = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  setVisible,
}) => {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [wallet, setWallet] = useState('');
  const [transactionID, setTransactionID] = useState('');
  const [transaction, setTransaction] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState('');
  const cartData = global.upgradeCartData;
  const totalAmount = cartData.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalAmount);
  }, 0);

  const PaymentOption = [
    {key: 'Total Purchase', value: totalAmount},
    {key: 'Current Package PV', value: global.current_package_pv},
    {key: 'You Get After Purchase', value: global.after_purchase},
    {key: 'Total Pay', value: totalAmount},
    {key: 'Upgrade Package PV', value: global.upgrade_package_pv},
  ];

  // ================================== Api =================================== //

  const upgradePayment = async () => {
    console.log('global.userData?.id', global.userData?.id);
    console.log('global.upgradeRegion', global.upgradeRegion);
    console.log('global.upgradeAgencyCode', global.upgradeAgencyCode);
    console.log('totalAmount', totalAmount);
    console.log(
      'global.userData?.stockist_country',
      global.userData?.stockist_country,
    );
  

    const sendCartData = cartData.map(item => {
      return {
        id: item.id,
        price: item.price,
        qty: item.qty,
      };
    })
    console.log('sendCartData', sendCartData);

    try {
      setVisible(true);
      const dataObject = {
        user_id: global.userData?.id,
        self_id: global?.userData?.self_id,
        region_id: global.upgradeRegion,
        agency_code: global.upgradeAgencyCode,
        package_id: global.upgradePackageId,
        total_payment: String(totalAmount),
        upgrade_pv: PaymentOption?.find((item) => item?.key === 'Upgrade Package PV')?.value,
        stockist_country: global.userData?.stockist_country,
        upgrade_product_cart: sendCartData,
        txn_pass: transaction
      }
      console.log('dataObject', dataObject);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessUpgrade}/${apiRoutes.upgradePayment}`,
        {
          user_id: global.userData?.id,
          self_id: global?.userData?.self_id,
          region_id: global.upgradeRegion,
          agency_code: global.upgradeAgencyCode,
          package_id: global.upgradePackageId,
          total_payment: String(totalAmount),
          upgrade_pv: PaymentOption?.find((item) => item?.key === 'Upgrade Package PV')?.value,
          stockist_country: global.userData?.stockist_country,
          upgrade_product_cart: sendCartData,
          txn_pass: transaction
        },
      );
      console.log('response', response?.data);

      if (response?.data?.status == 200) {
        showMessageonTheScreen(response?.data?.msg);
        nextStep();
      } else {
        showMessageonTheScreen(response?.data?.msg);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  const checkTransaction = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.checkTransactionPass}`,
        {self_id: global?.userData.self_id, txn_pass: transaction},
      );
      console.log('response?.data', response?.data);
      if (Number(response?.data?.status) == 400) {
        setErrors(response?.data?.msg)
        setTransaction('');
      } else {
        setErrors('');
        setIsValid(true);
      }
      showMessageonTheScreen(response?.data?.msg);
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  // ================================== Api =================================== //

  const handleWalletSelect = option => {
    setSelectedWallet(option);
  };

  const baseButtonProps = {
    buttonheight: verticalScale(30),
    borderRadius: scale(5),
    fontcolor: colors.white,
    fontSize: scale(12),
    fontFamily: Montserrat.SemiBold,
    elevation: scale(10),
    alignSelf: 'flex-end',
    marginVertical: verticalScale(20),
    iconRight: true,
    IconComponentName: FontAwesome6,
    iconsize: scale(17),
  };

  const renderPaymentOption = ({item}) => {
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>{item?.key}</Text>
        <Text style={styles.amountValue}>{item?.value}</Text>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <View style={styles.bodyContainer}>
          <RepurchaseTable data={cartData} />

          <View style={styles.separator} />

          <View>
            <Text style={styles.headerText}>Payment Options</Text>
            <FlatList data={PaymentOption} renderItem={renderPaymentOption} />
          </View>

          <View style={{marginTop: verticalScale(10)}}>
            <Text style={styles.heading}>Select Payment Method</Text>
            <CustomDropDown
              placeholder="Wallet"
              data={walletData}
              onSelect={handleWalletSelect}
              selected={selectedWallet.title}
              labelKey={'title'}
              buttonStyle={styles.dropdownButtonStyle}
              buttonTextStyle={styles.dropdownButtonText}
              arrowStyle={styles.dropdownArrow}
              menuStyle={styles.dropdownMenu}
              itemStyle={styles.dropdownItem}
              selectedItemStyle={styles.selectedItem}
              placeholderStyle={[styles.placeholder, styles.placeholderOffset]}
              textAlign={'center'}
            />
          </View>

          <View style={{marginTop: verticalScale(10)}}>
            <Text style={styles.heading}>Collection Center</Text>

            <CustomeInputField
              placeholder={'Upline Trnsaction ID'}
              onChangeText={setTransaction}
              value={transaction}
              borderWidth={scale(1)}
              borderRadius={scale(10)}
              height={verticalScale(40)}
              borderColor={colors.darkerGrey}
              width={'100%'}
              placeholderTextColor={colors.grey}
              color={colors.black}
              marginTop={verticalScale(5)}
              inputWidth={'90%'}
              textInputStyle={{
                paddingBottom: verticalScale(8),
                paddingLeft: scale(10),
              }}
              errors={errors}
              touched={errors}
            />
          </View>

          <CustomeButton
            buttoncolor={colors.theme1}
            buttonwidth={'100%'}
            buttonheight={verticalScale(35)}
            borderRadius={scale(10)}
            title={'Verify'}
            fontcolor={colors.white}
            fontSize={scale(16)}
            fontWeight={'500'}
            fontFamily={Montserrat.SemiBold}
            elevation={scale(10)}
            alignSelf={'center'}
            marginTop={verticalScale(15)}
            onPress={() =>
              transaction
                ? checkTransaction()
                : showMessageonTheScreen(
                    'Please enter the Upline Transaction ID',
                  )
            }
          />

          <View style={{marginTop: verticalScale(10)}}>
            <Text style={styles.headerText}>Order Summary</Text>
            <View style={{marginTop: verticalScale(-13)}}>
              <RepurchaseTable data={cartData} />
            </View>
          </View>

          <View style={styles.buttonView}>
            <CustomeButtonView
              previousStep={previousStep}
              nextStep={isValid && upgradePayment}
              currentPosition={currentPosition}
              labels={labels}
              previous={true}
              next={true}
            />
          </View>
        </View>
      </View>
    );
  };
  return <View>{renderBody()}</View>;
};

export default UpgradeInvoice;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: colors.white,
    margin: scale(15),
    borderRadius: scale(15),
    elevation: scale(5),
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(5),
  },
  separator: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.grey,
  },
  headerText: {
    fontSize: scale(15),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingVertical: verticalScale(10),
  },
  amountContainer: {
    marginTop: verticalScale(10),
    backgroundColor: colors.screenColor,
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: colors.grey,
  },
  amountLabel: {
    fontSize: scale(11),
    color: colors.black,
    paddingLeft: scale(10),
    fontFamily: Montserrat.SemiBold,
    textAlign: 'left',
    width: scale(200),
  },
  amountValue: {
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    textAlign: 'center',
    marginHorizontal: scale(10),
    textAlign: 'left',
    width: scale(60),
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    padding: scale(13),
    elevation: scale(5),
    paddingHorizontal: scale(14),
    marginTop: verticalScale(7),
    borderRadius: scale(10),
  },
  dropdownButtonStyle: {
    borderWidth: scale(1),
    borderColor: colors.grey,
    borderRadius: scale(10),
  },
  dropdownButtonText: {
    color: colors.black,
  },
  dropdownArrow: {
    color: colors.black,
  },
  dropdownMenu: {
    // backgroundColor: colors.lightBlue,
  },
  dropdownItem: {
    paddingVertical: verticalScale(10),
  },
  selectedItem: {
    backgroundColor: colors.screenColor,
  },
  placeholder: {
    color: colors.grey,
  },
  placeholderOffset: {
    marginLeft: scale(-20),
  },
  heading: {
    fontSize: scale(12),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingVertical: scale(5),
  },
  buttonView: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
});













// import React, {useState, useEffect, useRef} from 'react';
// import {View, StyleSheet, Text, Image} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {Drawer} from 'react-native-paper';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useIsFocused} from '@react-navigation/native';
// import images from '../themes/images';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   moderateHeight,
//   moderateScale,
//   moderateWidth,
//   scale,
// } from '../utils/responsive';
// import colors from '../themes/colors';
// import {useDrawerStatus} from '@react-navigation/drawer';
// import AppText from '../components/AppText';
// import {Montserrat} from '../themes/fonts';
// import screens from '../constants/screens';
// import {logout} from '../redux/slices/logout';
// import strings from '../constants/strings';

// export function DrawerContent(props) {
//   const drawerStatus = useDrawerStatus();
//   const [balReqSubmenuVisible, setBalReqSubmenuVisible] = useState(false);
//   const [isSubmenuVisible, setisSubmenuVisible] = useState(false);
//   const [isBusinessVisible, setIsBusinessVisible] = useState(false);

//   const dispatch = useDispatch();
//   const {data} = useSelector(state => state.userDetails);

//   const businessMenuItems = [
//     {label: 'Business Overview', screen: screens.businessOverview},
//     {label: 'New Business Opportunity', screen: screens.newBusinessOpportunity},
//     {label: 'Sales Report', screen: screens.salesReport},
//     {label: 'Client Management', screen: screens.clientManagement},
//   ];

//   return (
//     <View
//       style={[
//         styles.mainContainer,
//         drawerStatus == 'open' && {width: moderateWidth(80)},
//         drawerStatus != 'open' && {backgroundColor: colors.nevyBlue},
//       ]}>
//       <DrawerContentScrollView style={styles.container} {...props}>
//         <View style={styles.drawerContent}>
//           <View style={styles.userProfileView}>
//             <Image source={images.userPlaceholder} style={styles.userImg} />
//             <AppText
//               label={data?.name}
//               size={'large'}
//               fontFamily={Montserrat.Bold}
//               color={colors.white}
//               textStyles={styles.name}
//             />
//             <AppText
//               label={data?.self_id}
//               size={'regular'}
//               fontFamily={Montserrat.Regular}
//               color={colors.greenAccent}
//             />
//           </View>

//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="dashboard"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Dashboard"
//               onPress={() => {
//                 props.navigation.navigate(screens.dashboard);
//               }}
//               // activeTintColor='#2196f3'
//               // activeBackgroundColor='rgba(0, 0, 0, .04)'
//               // inactiveTintColor='rgba(0, 0, 0, .87)'
//               // inactiveBackgroundColor='transparent'
//               // style={{backgroundColor: '#000000'}}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />

//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="money"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Balance Request"
//               onPress={() => setBalReqSubmenuVisible(prev => !prev)}
//               //onPress={() => {props.navigation.navigate('BalancerequestScreen')}}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />
//             {balReqSubmenuVisible && (
//               <View>
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label="Balance Request"
//                   onPress={() => {
//                     props.navigation.navigate('BalancerequestScreen');
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 16}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label="Balance Request Report"
//                   onPress={() => {
//                     props.navigation.navigate(screens.spendingWalletHistory);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 16}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label="Product Voucher Request"
//                   onPress={() => {
//                     props.navigation.navigate(screens.productVoucherRequest);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 16}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label="Product Voucher Report"
//                   onPress={() => {
//                     props.navigation.navigate(screens.spendingWalletHistory);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 16}}
//                 />
//               </View>
//             )}

//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="money"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Income"
//               onPress={() => setisSubmenuVisible(prev => !prev)}
//               //onPress={() => {props.navigation.navigate('BalancerequestScreen')}}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />
//             {isSubmenuVisible && (
//               <View>
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.pairingBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.sponserBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.upgradeBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.uniLevelBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.indirectBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.selfUniLevelBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.leadershipBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//                 <DrawerItem
//                   style={styles.drawerItemsSub}
//                   icon={({color, size}) => (
//                     <Icon
//                       name="chevron-right"
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={strings.leadershipBonus}
//                   onPress={() => {
//                     props.navigation.navigate(screens.indirectBonus);
//                   }}
//                   labelStyle={{color: '#ffffff', fontSize: 18}}
//                 />
//               </View>
//             )}
//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="money"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label={strings.myTeam}
//               onPress={() => {
//                 props.navigation.navigate('DirectteamScreen');
//               }}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />
//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="wallet"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Wallet Conversion"
//               onPress={() => {
//                 props.navigation.navigate(screens.walletConversation);
//               }}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />

//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="wallet"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Cashout History"
//               onPress={() => {
//                 props.navigation.navigate(screens.spendingWalletHistory);
//               }}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />

//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="wallet"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Spending History"
//               onPress={() => {
//                 props.navigation.navigate(screens.spendingWalletHistory);
//               }}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />

//             <DrawerItem
//               style={[styles.drawerItems, {marginBottom: 10}]}
//               icon={({color, size}) => (
//                 <Icon
//                   name="wallet"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="My Orders"
//               // onPress={() => {
//               //   props.navigation.navigate('BalancerequestScreen');
//               // }}
//               labelStyle={{color: '#ffffff', fontSize: 18}}
//             />

//             <DrawerItem
//               style={styles.drawerItems}
//               icon={({color, size}) => (
//                 <Icon
//                   name="business"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Business"
//               onPress={() => setIsBusinessVisible(prev => !prev)}
//               labelStyle={styles.drawerItemLabel}
//             />

//             {isBusinessVisible && (
//               <View style={styles.submenuContainer}>
//                 {businessMenuItems.map((item, index) => (
//                   <DrawerItem
//                     key={index}
//                     style={styles.drawerItemsSub}
//                     icon={({color, size}) => (
//                       <Icon
//                         name="chevron-right"
//                         color="#00cbaa"
//                         size={25}
//                         style={styles.iconStyle}
//                       />
//                     )}
//                     label={item.label}
//                     onPress={() => props.navigation.navigate(item.screen)}
//                     labelStyle={styles.submenuLabel}
//                   />
//                 ))}
//               </View>
//             )}

//           </Drawer.Section>
//           <DrawerItem
//             style={[styles.drawerItems, {marginBottom: 10}]}
//             icon={({color, size}) => (
//               <Icon
//                 name="logout"
//                 color="#00cbaa"
//                 size={25}
//                 style={styles.iconStyle}
//               />
//             )}
//             label="Logout"
//             onPress={() => {
//               dispatch(logout());
//             }}
//             labelStyle={{color: '#00cbaa', fontSize: 18}}
//           />
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   container: {
//     backgroundColor: colors.nevyBlue,
//     borderTopRightRadius: moderateScale(50),
//     borderBottomRightRadius: moderateScale(50),
//   },

//   userProfileView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 25,
//   },
//   name: {marginTop: moderateHeight(2), marginBottom: moderateHeight(0.3)},
//   userImg: {
//     width: moderateScale(95),
//     height: moderateScale(95),
//     borderRadius: moderateScale(70),
//     borderColor: colors.greenAccent,
//     borderWidth: moderateScale(2),
//   },
//   userName: {
//     color: '#userName',
//     fontSize: 24,
//     color: '#fff',
//     marginTop: 15,
//     fontWeight: 'bold',
//   },
//   userId: {
//     color: '#00cbaa',
//     fontSize: 18,
//   },
//   drawerItems: {
//     marginBottom: -10,
//   },
//   drawerItemsSub: {
//     marginLeft: 20,
//     marginBottom: -10,
//   },
//   iconStyle: {
//     marginRight: -20,
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   bottomDrawerSection: {
//     marginBottom: 15,
//     borderTopColor: '#f4f4f4',
//     borderTopWidth: 1,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   drawerItemLabel: {
//     color: colors.white,
//     fontSize: 18,
//   },
//    submenuLabel: {
//     color: colors.white,
//     fontSize: scale(14),
//   },
// });

















// import React, {useState} from 'react';
// import {View, StyleSheet, Image, ImageBackground} from 'react-native';
// import {Drawer} from 'react-native-paper';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useDispatch, useSelector} from 'react-redux';
// import {useDrawerStatus} from '@react-navigation/drawer';

// import images from '../themes/images';
// import colors from '../themes/colors';
// import {
//   moderateHeight,
//   moderateScale,
//   moderateWidth,
//   scale,
//   verticalScale,
// } from '../utils/responsive';
// import AppText from '../components/AppText';
// import {Montserrat} from '../themes/fonts';
// import screens from '../constants/screens';
// import {logout} from '../redux/slices/logout';
// import strings from '../constants/strings';

// export function DrawerContent(props) {
//   const drawerStatus = useDrawerStatus();
//   const [visibleSubmenus, setVisibleSubmenus] = useState({});
//   const dispatch = useDispatch();
//   const {data} = useSelector(state => state.userDetails);

//   const toggleSubmenu = key => {
//     setVisibleSubmenus(prevState => ({
//       ...prevState,
//       [key]: !prevState[key],
//     }));
//   };

//   const menuItems = [
//     {
//       label: 'Dashboard',
//       icon: 'dashboard',
//       screen: screens.dashboard,
//     },
//     {
//       label: 'Balance Request',
//       icon: 'money',
//       submenu: [
//         {label: 'Balance Request', screen: 'BalancerequestScreen'},
//         {
//           label: 'Balance Request Report',
//           screen: screens.spendingWalletHistory,
//         },
//         {
//           label: 'Product Voucher Request',
//           screen: screens.productVoucherRequest,
//         },
//         {
//           label: 'Product Voucher Report',
//           screen: screens.spendingWalletHistory,
//         },
//       ],
//     },
//     {
//       label: 'Income',
//       icon: 'money',
//       submenu: [
//         {label: strings.pairingBonus, screen: screens.indirectBonus},
//         {label: strings.sponserBonus, screen: screens.indirectBonus},
//         {label: strings.upgradeBonus, screen: screens.indirectBonus},
//         {label: strings.uniLevelBonus, screen: screens.indirectBonus},
//         {label: strings.indirectBonus, screen: screens.indirectBonus},
//         {label: strings.selfUniLevelBonus, screen: screens.indirectBonus},
//         {label: strings.leadershipBonus, screen: screens.indirectBonus},
//       ],
//     },
//     {label: strings.myTeam, icon: 'money', screen: 'DirectteamScreen'},
//     {
//       label: 'Wallet Conversion',
//       icon: 'wallet',
//       screen: screens.walletConversation,
//     },
//     {
//       label: 'Cashout History',
//       icon: 'wallet',
//       screen: screens.spendingWalletHistory,
//     },
//     {
//       label: 'Spending History',
//       icon: 'wallet',
//       screen: screens.spendingWalletHistory,
//     },
//     {label: 'My Orders', icon: 'wallet', screen: null},
//     {
//       label: 'Business',
//       icon: 'business',
//       submenu: [
//         {label: 'Business Registration', screen: screens.sponserDetail},
//         {label: 'Business Repurchase', screen: screens.welcomeRepurchase},
//         {label: 'Business Upgrade', screen: screens.businessUpgrade},
//       ],
//     },
//   ];

//   return (
//     <View
//       style={[
//         styles.mainContainer,
//         drawerStatus === 'open' && {width: moderateWidth(80)},
//         drawerStatus !== 'open' && {backgroundColor: colors.nevyBlue},
//       ]}>
//       <DrawerContentScrollView style={styles.container} {...props}>
//         <View style={styles.drawerContent}>
//           <ImageBackground source={require('../assets/images/cashoutBg.png')} style={{height:verticalScale(150)}}>
//             <View style={styles.userProfileView}>
//               <Image source={images.userPlaceholder} style={styles.userImg}/>
//               <AppText
//                 label={data?.name}
//                 size={'large'}
//                 fontFamily={Montserrat.Bold}
//                 color={colors.white}
//                 textStyles={styles.name}
//               />
//               <AppText
//                 label={data?.self_id}
//                 size={'regular'}
//                 fontFamily={Montserrat.Regular}
//                 color={colors.greenAccent}
//               />
//             </View>
//           </ImageBackground>

//           <Drawer.Section style={styles.drawerSection}>
//             {menuItems.map((item, index) => (
//               <React.Fragment key={index}>
//                 <DrawerItem
//                   style={styles.drawerItems}
//                   icon={({color, size}) => (
//                     <Icon
//                       name={item.icon}
//                       color="#00cbaa"
//                       size={25}
//                       style={styles.iconStyle}
//                     />
//                   )}
//                   label={item.label}
//                   onPress={() => {
//                     item.submenu
//                       ? toggleSubmenu(index)
//                       : props.navigation.navigate(item.screen);
//                   }}
//                   labelStyle={styles.drawerItemLabel}
//                 />
//                 {item.submenu && visibleSubmenus[index] && (
//                   <View style={styles.submenuContainer}>
//                     {item.submenu.map((subItem, subIndex) => (
//                       <DrawerItem
//                         key={subIndex}
//                         style={styles.drawerItemsSub}
//                         icon={({color, size}) => (
//                           <Icon
//                             name="chevron-right"
//                             color="#00cbaa"
//                             size={25}
//                             style={styles.iconStyle}
//                           />
//                         )}
//                         label={subItem.label}
//                         onPress={() =>
//                           props.navigation.navigate(subItem.screen)
//                         }
//                         labelStyle={styles.submenuLabel}
//                       />
//                     ))}
//                   </View>
//                 )}
//               </React.Fragment>
//             ))}

//             <DrawerItem
//               style={[styles.drawerItems, {marginBottom: 10}]}
//               icon={({color, size}) => (
//                 <Icon
//                   name="logout"
//                   color="#00cbaa"
//                   size={25}
//                   style={styles.iconStyle}
//                 />
//               )}
//               label="Logout"
//               onPress={() => {
//                 dispatch(logout());
//               }}
//               labelStyle={{color: '#00cbaa', fontSize: 18}}
//             />
//           </Drawer.Section>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   container: {
//     backgroundColor: colors.nevyBlue,
//     borderTopRightRadius: moderateScale(50),
//     borderBottomRightRadius: moderateScale(50),
//   },
//   userProfileView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: verticalScale(25),
//     backgroundColor:colors.white,
//     width:scale(250),
//     height:verticalScale(120),
//     alignSelf:'center',
//     borderRadius:scale(15),
//     marginBottom:verticalScale(-40)
//   },
//   name: {marginTop: moderateHeight(2), marginBottom: moderateHeight(0.3)},
//   userImg: {
//     width: moderateScale(95),
//     height: moderateScale(95),
//     borderRadius: moderateScale(70),
//     borderColor: colors.greenAccent,
//     borderWidth: moderateScale(2),
//     position:'absolute',
//     top:verticalScale(-40)
//   },
//   drawerItems: {
//     marginBottom: -10,
//   },
//   drawerItemsSub: {
//     marginLeft: 20,
//     marginBottom: -10,
//   },
//   iconStyle: {
//     marginRight: -20,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   drawerItemLabel: {
//     color: colors.white,
//     fontSize: 18,
//   },
//   submenuLabel: {
//     color: colors.white,
//     fontSize: scale(14),
//   },
//   submenuContainer: {
//     paddingLeft: moderateScale(10),
//   },
// });
