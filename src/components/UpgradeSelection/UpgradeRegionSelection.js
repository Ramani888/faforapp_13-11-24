import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../themes/colors';
import {scale, verticalScale} from '../../utils/responsive';
import {Montserrat} from '../../themes/fonts';
import CustomDropDown from '../CustomDropDown';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import showMessageonTheScreen from '../showMessageonTheScreen';

const UpgradeRegionSelection = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  setVisible,
  previousData,
}) => {
  const [regionData, setRegionData] = useState([]);
  const [region, setRegion] = useState('');
  const [agencyData, setAgencyData] = useState([]);
  const [agency, setAgency] = useState('');

  useEffect(() => {
    getRegionData();
  }, []);

  useEffect(() => {
    if (region) {
      getAgencyData();
      region !== previousData?.region && setAgency('')
    }
  }, [region]);

  useEffect(() => {
    if (previousData) {
      setRegion(previousData.region);
      setAgency(previousData.agency);
    }
  }, [previousData]);

  // ========================================= Api ====================================== //

  const getRegionData = async () => {
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessUpgrade}/${apiRoutes.upgradeRegions}`,
        {stockist_country: `${global?.userData?.stockist_country}`},
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

  // ========================================= Api ====================================== //

  const next = () => {
    if ((region, agency)) {
      const data = {
        region: region,
        agency: agency,
      };
      nextStep(data, 'upgradeRegionSelection');
      global.upgradeRegion = region.region_id;
      global.upgradeAgencyCode = agency.agency_code;
    } else {
      !region && showMessageonTheScreen('Region field is required');
      region && !agency && showMessageonTheScreen('Agency field is required');
    }
  };

  const renderBody = () => {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.headerText}>Shipping Method</Text>
          <View style={styles.separator} />

          <View style={{marginTop: verticalScale(15)}}>
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
            />

            <View>
              <Text style={[styles.title, styles.heading]}>
                Collection Center
              </Text>
              <CustomDropDown
                placeholder="Select Agency"
                data={agencyData}
                onSelect={setAgency}
                selected={agency?.agency_name}
                labelKey={'agency_name'}
                buttonStyle={styles.dropdownButtonStyle}
                buttonTextStyle={styles.dropdownButtonText}
                arrowStyle={styles.dropdownArrow}
                menuStyle={styles.dropdownMenu}
                itemStyle={styles.dropdownItem}
                selectedItemStyle={styles.selectedItem}
                placeholderStyle={[
                  styles.placeholder,
                  styles.placeholderOffset,
                ]}
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

              <View style={styles.buttonView}>
                <CustomeButtonView
                  previousStep={previousStep}
                  nextStep={next}
                  currentPosition={currentPosition}
                  labels={labels}
                  next={true}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return <View style={{flex: 1}}>{renderBody()}</View>;
};

export default UpgradeRegionSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(15),
    elevation: scale(5),
    margin: scale(15),
    padding: scale(15),
  },
  headerText: {
    fontSize: scale(15),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
  },
  separator: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.grey,
    paddingTop: verticalScale(5),
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
  },
});
