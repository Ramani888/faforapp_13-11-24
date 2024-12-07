import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomeButton from '../../../../Custome/CustomeButton';
import Feather from 'react-native-vector-icons/Feather';
import showMessageonTheScreen from '../../../../components/showMessageonTheScreen';
import CustomDropDown from '../../../../components/CustomDropDown';
import CustomeButtonView from '../../../../Custome/CustomeButtonView';
import screens from '../../../../constants/screens';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axiosInstanceForBussiness from '../../../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../../../constants/apiRoutes';

const RegionSelection = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [countryData, setCountryData] = useState([]);
  const [countryFlag, setCountryFlag] = useState('');
  const [country, setCountry] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [region, setRegion] = useState('');
  const [agencyData, setAgencyData] = useState('');
  const [agency, setAgency] = useState('');

  useEffect(() => {
    getContryData();
  }, [isFocused]);

  useEffect(() => {
    if (country) {
      getContryFlag();
      getRegionData();
      setRegion('');
    }
  }, [country]);

  useEffect(() => {
    if (region) {
      getAgencyData();
      setAgency('');
    }
  }, [region]);

  // ==================================== Api ================================== //

  const getContryData = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.getCountry}`,
        {},
      );
      setCountryData(response?.data?.country);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const getContryFlag = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.getContryFlag}`,
        {country_id: country?.id},
      );
      setCountryFlag(response?.data?.flag);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const getRegionData = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.repurchaseRegions}`,
        {stockist_country: `${country?.id}`},
      );
      setRegionData(response?.data?.region);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const getAgencyData = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.agency}`,
        {region_id: region?.region_id},
      );
      setAgencyData(response?.data?.agency);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  // ==================================== End ================================== //

  const previousStep = () => {
    navigation.goBack();
  };

  const nextStep = () => {
    if (country && region && agency) {
      global.repurchaseAgencyCode = agency?.agency_code;
      navigation.navigate(screens.repurchaseProductSelection);
    } else {
      if (!country) {
        showMessageonTheScreen('Please select the country');
      }
      if (!region) {
        showMessageonTheScreen('Please select the region');
      }
      if (!agency) {
        showMessageonTheScreen('Please select the agency');
      }
    }
  };

  const handleCountrySelect = text => {
    setCountry(text);
    global.RepurchaseCountryId = text?.id;
  };

  const memoizedDropdown = useMemo(
    () => (
      <CustomDropDown
        placeholder="Select Country"
        data={countryData}
        onSelect={handleCountrySelect}
        selected={country.name}
        labelKey={'name'}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownButtonText}
        arrowStyle={styles.dropdownArrow}
        menuStyle={styles.dropdownMenu}
        itemStyle={styles.dropdownItem}
        selectedItemStyle={styles.selectedItem}
        placeholderStyle={styles.placeholder}
        leftImageUrl={countryFlag}
        leftImageStyle={styles.dropdownLeftImage}
        textAlign={'center'}
      />
    ),
    [countryData, country, countryFlag],
  );

  const renderBody = () => (
    <View style={styles.bodyContainer}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={scale(25)} color={colors.black} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>To Proceed</Text>
          <Text style={styles.subtitle}>Kindly Fill the Imformation Below</Text>
        </View>
        <Text style={[styles.title, styles.heading, {paddingLeft: scale(20)}]}>
          Choose your country
        </Text>
        <View style={styles.dropdownContainer}>{memoizedDropdown}</View>

        <View
          style={[
            styles.dropdownContainer,
            {marginTop: verticalScale(15), marginBottom: verticalScale(10)},
          ]}>
          <Text style={[styles.title, styles.heading]}>Select Region</Text>
          <CustomDropDown
            placeholder="Select Region"
            data={regionData}
            onSelect={setRegion}
            selected={region?.regions_name}
            labelKey={'regions_name'}
            buttonStyle={styles.dropdownButtonStyle}
            buttonTextStyle={styles.dropdownButtonText}
            arrowStyle={styles.dropdownArrow}
            menuStyle={styles.dropdownMenu}
            itemStyle={styles.dropdownItem}
            selectedItemStyle={styles.selectedItem}
            placeholderStyle={[styles.placeholder, styles.placeholderOffset]}
            textAlign={'center'}
            Icon={Entypo}
            leftIcon={'location'}
            leftIconStyle={styles.dropdownLeftIcon}
            validationMessage={
              country
                ? 'Region data not available for this country'
                : 'please select the country'
            }
          />

          <View style={{marginTop: verticalScale(15)}}>
            <Text style={[styles.title, styles.heading]}>
              Collection Center
            </Text>
            <CustomDropDown
              placeholder="Select Agency"
              data={agencyData}
              onSelect={setAgency}
              selected={agency.agency_name}
              labelKey={'agency_name'}
              buttonStyle={styles.dropdownButtonStyle}
              buttonTextStyle={styles.dropdownButtonText}
              arrowStyle={styles.dropdownArrow}
              menuStyle={styles.dropdownMenu}
              itemStyle={styles.dropdownItem}
              selectedItemStyle={styles.selectedItem}
              placeholderStyle={[styles.placeholder, styles.placeholderOffset]}
              textAlign={'center'}
              Icon={Entypo}
              leftIcon={'location-pin'}
              leftIconStyle={styles.dropdownLeftIcon}
              validationMessage={
                region
                  ? 'Agency data not available for this region'
                  : 'please select the region'
              }
            />

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                - Present the "self Collection" To our center for product
                redemption
              </Text>
              <Text style={[styles.infoText, styles.infoTextPadding]}>
                - This code will be sent to your assigned Email or Login
                Backoffice to Retrieve
              </Text>
            </View>

            <View style={styles.buttonView}>
              <CustomeButtonView
                previousStep={previousStep}
                nextStep={nextStep}
                currentPosition={''}
                labels={''}
                previous={true}
                next={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return <View style={styles.container}>{renderBody()}</View>;
};

export default RegionSelection;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.screenColor},
  bodyContainer: {
    flex: 1,
    margin: scale(15),
    marginTop: verticalScale(30),
  },
  title: {
    fontSize: scale(12),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingTop: verticalScale(10),
    paddingLeft: scale(20),
  },
  heading: {
    paddingLeft: 0,
    fontSize: scale(15),
    paddingBottom: verticalScale(10),
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    padding: scale(12),
    elevation: scale(5),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(8),
    borderRadius: scale(10),
    marginHorizontal: scale(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  infoText: {
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    textAlign: 'center',
    width: scale(200),
  },
  infoTextPadding: {
    paddingTop: verticalScale(15),
    width: scale(220),
  },
  dropdownButtonStyle: {
    borderWidth: scale(1),
    borderColor: colors.theme1,
    borderRadius: scale(10),
  },
  dropdownButtonText: {
    color: colors.black,
    fontSize: scale(10),
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
  dropdownLeftImage: {
    width: scale(40),
    height: scale(30),
    marginRight: scale(-20),
  },
  placeholder: {
    color: colors.grey,
  },
  placeholderOffset: {
    marginLeft: scale(-20),
  },
  dropdownLeftIcon: {
    color: colors.theme1,
  },
  headerContainer: {
    marginTop: verticalScale(15),
  },
  title: {
    fontSize: scale(18),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    marginBottom: verticalScale(-5),
    lineHeight: verticalScale(30),
  },
  subtitle: {
    fontSize: scale(15),
    color: colors.grey,
    fontFamily: Montserrat.Medium,
    marginBottom: verticalScale(30),
    marginTop: verticalScale(5),
  },
  buttonView: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(15),
  },
});
