import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import CustomeInputField from '../../../../Custome/CustomeInputField';
import CustomeButton from '../../../../Custome/CustomeButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomDropDown from '../../../../components/CustomDropDown';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import axiosInstanceForBussiness from '../../../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../../../constants/apiRoutes';
import showMessageonTheScreen from '../../../../components/showMessageonTheScreen';
import {Loader} from '../../../../components/Loader';

const placementsetting = [
  {key: 'Left', value: 'l'},
  {key: 'Right', value: 'r'},
];

const SponserDetail = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [sponsorId, setSponsorId] = useState(global.userData.self_id);
  const [sponsorName, setSponsorName] = useState('');
  const [placementId, setPlacementId] = useState('');
  const [placementName, setPlacementName] = useState('');
  const [selectPosition, setSelectPosition] = useState('');

  useEffect(() => {
    if (selectPosition) {
      global.position = selectPosition?.value;
    }
  }, [selectPosition]);

  // ==================================== Api ================================== //

  const getSponserData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.checkSponser}`,
        {
          user_id: global.userData.id,
          sponser_id: sponsorId,
        },
      );
      if (response.data?.status == 400) {
        showMessageonTheScreen(response.data?.msg);
      }
      setSponsorName(response?.data?.name);
      global.sponsorId = sponsorId;
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  const getPlacementData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.checkPlacement}`,
        {
          placement_id: placementId,
          sponser_id: sponsorId,
        },
      );
      if (response.data?.status == 400) {
        showMessageonTheScreen(response.data?.msg);
      }
      setPlacementName(response?.data?.name);
      global.placementId = placementId;
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  const checkPosition = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.checkPosition}`,
        {
          placement_id: placementId,
          sponser_id: sponsorId,
          position: selectPosition.value,
        },
      );
      if (response?.data?.status == 200) {
        navigation.navigate(screens.businessRegistration, {
          countryData: response?.data?.country,
        });
      }
      if (response?.data?.status == 400) {
        showMessageonTheScreen(response?.data?.msg);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    } finally {
      setVisible(false);
    }
  };

  // ==================================== End ================================== //

  const handleBlur = () => {
    getSponserData();
  };

  useEffect(() => {
    getSponserData();
  }, [])

  const renderBody = () => {
    return (
      <View>
        <ImageBackground
          style={styles.headerContainer}
          source={require('../../../../assets/images/header.png')}>
          {/* <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => navigation?.toggleDrawer()}>
            <SimpleIcon name={'menu'} size={25} color={colors.white} />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle} numberOfLines={2}>
            Faforlife Online Member Application
          </Text>
          <Text style={styles.headerSubtitle}>
            Registration Date | 05 June 2024
          </Text>
        </ImageBackground>

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Sponsor Member ID</Text>
          <View style={styles.dropdownContainer}>
            <CustomeInputField
              placeholder={'Sponsor ID'}
              onChangeText={setSponsorId}
              value={sponsorId}
              onBlur={handleBlur}
              borderColor={colors.black}
              borderWidth={scale(1)}
              borderRadius={scale(10)}
              width={'100%'}
              MainWidth={'100%'}
              height={verticalScale(45)}
              placeholderTextColor={colors.darkGrey}
              color={colors.black}
              inputWidth={'100%'}
              aliginCenter={true}
              textAlign={'center'}
              textInputStyle={styles.textInputStyle}
              fontFamily={Montserrat.SemiBold}
            />
            <CustomeInputField
              placeholder={'Sponsor Name'}
              onChangeText={setSponsorName}
              value={sponsorName}
              borderColor={colors.black}
              borderWidth={scale(1)}
              borderRadius={scale(10)}
              width={'100%'}
              MainWidth={'100%'}
              height={verticalScale(45)}
              placeholderTextColor={colors.darkGrey}
              color={colors.black}
              inputWidth={'100%'}
              aliginCenter={true}
              textAlign={'center'}
              marginTop={verticalScale(5)}
              textInputStyle={styles.textInputStyle}
              fontFamily={Montserrat.SemiBold}
            />
          </View>
        </View>

        <View style={[styles.bodyContainer, styles.negativeMargin]}>
          <Text style={styles.title}>Placement Member ID</Text>
          <View style={styles.dropdownContainer}>
            <CustomeInputField
              placeholder={'Placement ID'}
              onChangeText={setPlacementId}
              value={placementId}
              borderColor={colors.black}
              borderWidth={scale(1)}
              borderRadius={scale(10)}
              width={'100%'}
              MainWidth={'100%'}
              height={verticalScale(45)}
              placeholderTextColor={colors.darkGrey}
              color={colors.black}
              inputWidth={'100%'}
              aliginCenter={true}
              textInputStyle={styles.textInputStyle}
              fontFamily={Montserrat.SemiBold}
            />
            <CustomeButton
              buttoncolor={colors.theme1}
              buttonwidth={'100%'}
              buttonheight={verticalScale(30)}
              borderRadius={scale(10)}
              title={'Verify'}
              fontcolor={colors.white}
              fontSize={scale(16)}
              fontWeight={'500'}
              fontFamily={Montserrat.SemiBold}
              elevation={scale(10)}
              alignSelf={'center'}
              marginVertical={verticalScale(10)}
              onPress={() =>
                placementId
                  ? getPlacementData()
                  : showMessageonTheScreen('Please enter placement ID')
              }
            />
            <CustomeInputField
              placeholder={'Placement Name'}
              // onChangeText={setPlacementName}
              value={placementName}
              borderColor={colors.black}
              borderWidth={scale(1)}
              borderRadius={scale(10)}
              width={'100%'}
              MainWidth={'100%'}
              height={verticalScale(45)}
              placeholderTextColor={colors.darkGrey}
              color={colors.black}
              inputWidth={'100%'}
              aliginCenter={true}
              textAlign={'center'}
              textInputStyle={styles.textInputStyle}
              fontFamily={Montserrat.SemiBold}
              editable={false}
            />
          </View>
        </View>

        <View style={[styles.bodyContainer, styles.negativeMargin]}>
          <Text style={styles.title}>Binary Position</Text>
          <View style={styles.dropdownContainer}>
            <CustomDropDown
              placeholder="Please Select Placement Setting"
              data={placementsetting}
              onSelect={setSelectPosition}
              selected={selectPosition?.key}
              labelKey={'key'}
              // leftSpace={true}
              buttonStyle={{backgroundColor: colors.screenColor}}
              buttonTextStyle={{color: colors.black}}
              arrowStyle={{color: colors.black}}
              // menuStyle={{backgroundColor: colors.lightBlue}}
              itemStyle={{paddingVertical: verticalScale(10)}}
              selectedItemStyle={{backgroundColor: colors.screenColor}}
              placeholderStyle={{color: colors.grey}}
              textAlign="center"
            />
          </View>
        </View>

        <CustomeButton
          buttoncolor={colors.theme1}
          buttonwidth="43%"
          buttonheight={verticalScale(30)}
          borderRadius={scale(5)}
          title="Proceed"
          fontcolor={colors.white}
          fontSize={scale(12)}
          fontFamily={Montserrat.SemiBold}
          elevation={scale(10)}
          alignSelf="flex-end"
          marginRight={scale(15)}
          marginTop={verticalScale(5)}
          marginBottom={verticalScale(10)}
          iconRight={true}
          IconComponentName={FontAwesome6}
          iconname={'arrow-right-long'}
          iconsize={scale(17)}
          iconcolor={colors.pink}
          iconViewLeft={scale(25)}
          onPress={() => {
            if ((sponsorId, placementId, selectPosition)) {
              checkPosition();
            } else {
              !sponsorId && showMessageonTheScreen('sponsorId is required');
              !placementId && showMessageonTheScreen('placementId is required');
              !selectPosition && showMessageonTheScreen('position is required');
            }
          }}
        />
        <Text style={styles.noteContainer}>
          <Text style={styles.noteText}>Note: </Text>
          <Text style={styles.secondText}>
            Please Do Only 1 Registration At a Time, Don't Login To 2 Accounts
            At Once On The Same Device
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>{renderBody()}</ScrollView>
      {visible && <Loader />}
    </View>
  );
};

export default SponserDetail;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.screenColor,
  },
  headerContainer: {
    // backgroundColor: colors.lightBlue,
    height: scale(200),
    marginTop: verticalScale(-10),
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(20),
    alignItems: 'center',
  },
  menu: {position: 'absolute', left: scale(10), top: verticalScale(50)},
  menuContainer: {
    position: 'absolute',
    left: scale(20),
    top: verticalScale(50),
  },
  headerTitle: {
    width: scale(270),
    fontSize: scale(25),
    color: colors.white,
    fontFamily: Montserrat.Bold,
    textAlign: 'center',
    marginTop: verticalScale(55),
  },
  headerSubtitle: {
    fontSize: scale(12),
    color: colors.green,
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
  bodyContainer: {
    margin: scale(15),
    marginTop: verticalScale(10),
  },
  title: {
    fontSize: scale(12),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    paddingTop: verticalScale(15),
    paddingLeft: scale(20),
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    padding: scale(12),
    elevation: scale(5),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
    borderRadius: scale(10),
  },
  negativeMargin: {
    marginTop: scale(-15),
  },
  noteContainer: {
    marginHorizontal: scale(15),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  noteText: {
    color: colors.pink,
    fontFamily: Montserrat.SemiBold,
  },
  secondText: {
    color: colors.black,
    fontFamily: Montserrat.Medium,
    fontSize: scale(10.5),
  },
  textInputStyle:{paddingLeft:scale(10)}
});
