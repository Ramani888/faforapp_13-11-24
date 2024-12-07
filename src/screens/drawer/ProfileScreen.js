import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import DashboardProfile from '../../components/DashboardProfile';
import {Loader} from '../../components/Loader';
import {
  getUserDetails,
  getUserDetailsClear,
} from '../../redux/slices/getUserDetails';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';
import images from '../../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  verticalScale,
} from '../../utils/responsive';
import Row from '../../components/Row';
import strings from '../../constants/strings';
import moment from 'moment';
import {Montserrat} from '../../themes/fonts';

const DashboardScreen = ({navigation}) => {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);

  useEffect(() => {
    if (userDetails?.data) {
      setUserData(userDetails?.data);
    }
    if (userDetails?.error) {
      Alert.alert(strings.faforlife, userDetails?.error);
      dispatch(getUserDetailsClear());
    }
  }, [userDetails]);

  // console.log('userData:>>>>', userData);

  return (
    <ImageBackground source={images.dashboardBg} style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation?.toggleDrawer()}>
        <SimpleIcon name={'menu'} size={25} color={colors.white} />
      </TouchableOpacity>

      {!userDetails?.isLoading ? (
        <View>
          <DashboardProfile data={userData} hideStatus hideAction />
          <View style={styles.innerContainer}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <Row title={strings.sponserId} value={userData?.sponser_id} />
              <Row title={strings.placementId} value={userData?.place_id} />
              <Row title={strings.mobile} value={userData?.mobile} />
              <Row
                title={strings.transactionPassword}
                value={userData?.txn_pass}
              />
              <Row
                title={strings.joiningDate}
                value={moment(userData?.reg_date).format('YYYY-MM-DD')}
              />
              <Row
                title={strings.status}
                value={userData?.active == 1 ? strings.active : null}
                valueStyle={styles.active}
              />
              <Row
                title={strings.activateDate}
                value={moment(userData?.reg_date).format('YYYY-MM-DD')}
              />
              <Row
                title={strings.myCurrentPackage}
                value={userData?.package_name}
              />
              <Row title={strings.country} value={userData?.county} />
              <Row title={strings.myReason} value={userData?.my_reason} />
            </ScrollView>
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  menuContainer: {
    marginTop: globalStyles.statusBarMargin,
    marginLeft: moderateWidth(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {marginTop: moderateHeight(12), alignItems: 'center'},
  mainSection: {
    marginTop: moderateHeight(2),
    paddingHorizontal: moderateWidth(5),
  },
  active: {
    backgroundColor: colors.greenAccent,
    paddingHorizontal: moderateWidth(2),
    color: colors.white,
    fontFamily: Montserrat.SemiBold,
  },
  contentContainerStyle: {paddingBottom: moderateScale(150)},
});

export default DashboardScreen;
