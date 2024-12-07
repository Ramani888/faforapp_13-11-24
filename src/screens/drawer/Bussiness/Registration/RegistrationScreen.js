import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import {scale, verticalScale} from '../../../../utils/responsive';
import CountrySelection from '../../../../components/Registration/CountrySelection';
import ProfileCreation from '../../../../components/Registration/ProfileCreation';
import PackageSelection from '../../../../components/Registration/PackageSelection';
import ProductSelection from '../../../../components/Registration/ProductSelection';
import WalletDeduct from '../../../../components/Registration/WalletDeduct';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';
import Feather from 'react-native-vector-icons/Feather';

const labels = ['Country', 'Personal', 'Package', 'Product', 'Payment'];

const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#0fa6be',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#0fa6be',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0fa6be',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0fa6be',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#0fa6be',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: scale(11),
  currentStepLabelColor: '#0fa6be',
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [countrySelectionData, setCountrySectionData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [selectedPackage, setSelectedPackage] = useState('');

  const nextStep = (data, screen) => {
    screen == 'CounrySelection' && setCountrySectionData(data);
    screen == 'profileScreen' && setProfileData(data)
    screen == 'packageSelection' && setSelectedPackage(data)
    setCurrentPosition(prevPosition =>
      prevPosition < labels.length - 1 ? prevPosition + 1 : prevPosition,
    );
  };

  const previousStep = () => {
    setCurrentPosition(prevPosition =>
      prevPosition > 0 ? prevPosition - 1 : prevPosition,
    );
  };

  const paymentSuccess = () => {
    navigation.navigate(screens.registrationPaymentSuccess);
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return (
          <CountrySelection
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={currentPosition}
            labels={labels}
            previousData={countrySelectionData}
          />
        );
      case 1:
        return (
          <ProfileCreation
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={currentPosition}
            labels={labels}
            // data={countrySelectionData}
            previousData={profileData}
          />
        );
      case 2:
        return (
          <PackageSelection
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={currentPosition}
            labels={labels}
            // data={profileData}
            previousData={selectedPackage}
          />
        );
      case 3:
        return (
          <ProductSelection
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={currentPosition}
            labels={labels}
            data={selectedPackage}
          />
        );
      case 4:
        return (
          <WalletDeduct
            previousStep={previousStep}
            nextStep={paymentSuccess}
            currentPosition={currentPosition}
            labels={labels}
          />
        );
      default:
        return null;
    }
  };

  const renderBody = () => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => navigation.openDrawer()} style={styles.menu}>
          <Feather name="menu" size={scale(25)} color={colors.black} />
        </Pressable>
        <Text style={styles.headerText}>You are almost done!</Text>
        <Text style={styles.subHeaderText}>
          Continue below details to complete your registration
        </Text>
        <View style={{marginTop: verticalScale(20)}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
          />
        </View>
        {renderStepContent()}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.screenColor}}>
      {renderBody()}
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingBottom: verticalScale(2),
    backgroundColor: colors.screenColor,
  },
  menu: {position: 'absolute', left: scale(15), top: verticalScale(25)},
  headerText: {
    fontSize: scale(22),
    color: colors.theme1,
    fontFamily: Montserrat.SemiBold,
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  subHeaderText: {
    fontSize: scale(11),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    textAlign: 'center',
  },
  stepContainer: {
    padding: 20,
  },
});
