import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import {scale, verticalScale} from '../../utils/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomeButton from '../../Custome/CustomeButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import showMessageonTheScreen from '../showMessageonTheScreen';
import CustomDropDown from '../CustomDropDown';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import {Loader} from '../Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountrySelection = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  previousData,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState();
  const [countryFlag, setCountryFlag] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [region, setRegion] = useState();
  const [agencyData, setAgencyData] = useState([]);
  const [agency, setAgency] = useState();
  const [initialData, setInitialData] = useState({});
  const {countryData} = route.params;

  useEffect(() => {
    if (country) {
      getCountryFlag();
      getRegionData();
      country !== previousData?.country && setRegion('');
    }
  }, [country]);

  useEffect(() => {
    if (region) {
      getAgencyData();
      region !== previousData?.region && setAgency('');
    }
  }, [region]);

  useEffect(() => {
    if (previousData) {
      setCountry(previousData?.country);
      setRegion(previousData?.region);
      setAgency(previousData?.agency);
    }
  }, [previousData]);

  // ==================================== Api ================================== //

  const getCountryFlag = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.getRegisCountryFlag}`,
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
        `${apiRoutes.businessRegistration}/${apiRoutes.regisRegions}`,
        {country_id: country?.id},
      );
      setRegionData(response?.data?.regions);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const getAgencyData = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.regisAgency}`,
        {region_id: region?.region_id},
      );
      setAgencyData(response?.data?.agency);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  // ==================================== End ================================== //

  const previous = () => {
    navigation.goBack();
  };

  const next = () => {
    if ((country, region, agency)) {
      setVisible(true);
      global.countryId = country?.id;
      global.regionId = region?.region_id;
      global.agency = agency.agency_id;
      const data = {
        country: country,
        region: region,
        agency: agency,
      };
      nextStep(data, 'CounrySelection');
      setVisible(false);
    } else {
      !country && showMessageonTheScreen('Country is required field');
      !region && showMessageonTheScreen('Region is required field');
      !agency && showMessageonTheScreen('Agency is required field');
    }
  };

  const memoizedDropdown = useMemo(
    () => (
      <CustomDropDown
        placeholder="Select Country"
        data={countryData}
        onSelect={setCountry}
        selected={country?.name}
        labelKey={'name'}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownButtonText}
        arrowStyle={styles.dropdownArrow}
        // menuStyle={styles.dropdownMenu}
        itemStyle={styles.dropdownItem}
        selectedItemStyle={styles.selectedItem}
        placeholderStyle={styles.placeholder}
        leftImageUrl={countryFlag}
        leftImageStyle={styles.dropdownLeftImage}
        textAlign={'center'}
      />
    ),
    [country, countryData, countryFlag],
  );

  const renderBody = () => (
    <ScrollView style={styles.bodyContainer}>
      <Text style={styles.title}>Choose your country</Text>
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
          // menuStyle={styles.dropdownMenu}
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

        <View>
          <Text style={[styles.title, styles.heading]}>Collection Center</Text>
          <CustomDropDown
            placeholder="Select Agency"
            data={agencyData}
            onSelect={setAgency}
            selected={agency?.agency_name}
            labelKey={'agency_name'}
            buttonStyle={styles.dropdownButtonStyle}
            buttonTextStyle={styles.dropdownButtonText}
            arrowStyle={styles.dropdownArrow}
            menuStyle={{...styles.dropdownMenu, height: agencyData?.length > 3 ? verticalScale(180) : 'auto'}}
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
            <CustomeButton
              buttonheight={verticalScale(30)}
              buttoncolor={colors.pink}
              buttonwidth="47%"
              title="Previous"
              borderRadius={scale(5)}
              fontcolor={colors.white}
              fontSize={scale(12)}
              iconname={'arrow-left-long'}
              iconcolor={colors.pink}
              onPress={previous}
              fontFamily={Montserrat.SemiBold}
              elevation={scale(10)}
              marginHorizontal={scale(-15)}
              iconLeft={true}
              IconComponentName={FontAwesome6}
              iconsize={scale(17)}
              alignSelf={'center'}
              iconLeftMarginLeft={scale(10)}
              position={'absolute'}
              left={0}
              top={verticalScale(-15)}
            />
            <CustomeButtonView
              previousStep={previous}
              nextStep={next}
              currentPosition={currentPosition}
              labels={labels}
              next={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {renderBody()}
      {visible && <Loader />}
    </View>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.screenColor},
  bodyContainer: {
    flex: 1,
    margin: scale(15),
    marginBottom: verticalScale(1),
    // backgroundColor:"red",
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
    paddingVertical: scale(5),
  },
  dropdownButtonText: {
    color: colors.black,
  },
  dropdownArrow: {
    color: colors.black,
  },
  dropdownMenu: {
    // backgroundColor: colors.lightBlue,
    // height: verticalScale(180),
  },
  dropdownItem: {
    paddingVertical: verticalScale(10),
  },
  selectedItem: {
    backgroundColor: colors.screenColor,
  },
  dropdownLeftImage: {
    width: scale(50),
    height: scale(30),
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
  buttonView: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(15),
    marginLeft: scale(15),
  },
});
