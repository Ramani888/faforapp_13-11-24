import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {scale, verticalScale} from '../../../../utils/responsive';
import colors from '../../../../themes/colors';
import {Montserrat} from '../../../../themes/fonts';
import UpgradeRegionSelection from '../../../../components/UpgradeSelection/UpgradeRegionSelection';
import UpgradePackageSelection from '../../../../components/UpgradeSelection/UpgradePackageSelection';
import UpgradeProductSelection from '../../../../components/UpgradeSelection/UpgradeProductSelection';
import UpgradeInvoice from '../../../../components/UpgradeSelection/UpgradeInvoice';
import StepIndicator from 'react-native-step-indicator';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';
import {Loader} from '../../../../components/Loader';

const labels = ['Shipping', 'Membership Package', 'Package Product', 'Payment'];

const customStyles = {
  stepIndicatorSize: scale(45),
  currentStepIndicatorSize: scale(45),
  separatorStrokeWidth: scale(1.2),
  currentStepStrokeWidth: scale(2.1),
  stepStrokeCurrentColor: '#0fa6be',
  stepStrokeWidth: scale(2.1),
  stepStrokeFinishedColor: '#0fa6be',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0fa6be',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0fa6be',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: scale(13),
  currentStepIndicatorLabelFontSize: scale(13),
  stepIndicatorLabelCurrentColor: '#0fa6be',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: colors.black,
  labelSize: scale(12),
  currentStepLabelColor: '#0fa6be',
};

const UpgradeSelection = () => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rigionSelectionData, setRegionSelectionData] = useState({});
  const [selectedPackage, setSelectedPackage] = useState();

  const nextStep = (data, screen) => {
    screen == 'upgradeRegionSelection' && setRegionSelectionData(data);
    screen == 'packageSelection' && setSelectedPackage(data);
    setCurrentPosition(prevPosition =>
      prevPosition < labels.length - 1 ? prevPosition + 1 : prevPosition,
    );
  };

  const previousStep = () => {
    setCurrentPosition(prevPosition =>
      prevPosition > 0 ? prevPosition - 1 : prevPosition,
    );
  };

  const PaymentSuccess = () => {
    navigation.navigate(screens.upgradePaymentSuccess);
  };

  const renderStepIndicator = ({position, stepStatus}) => {
    let icon;

    // Define the image for each step
    switch (position) {
      case 0:
        icon = 'https://cdn-icons-png.flaticon.com/512/1606/1606957.png';
        break;
      case 1:
        icon =
          'https://www.shareicon.net/data/512x512/2015/10/27/662485_people_512x512.png';
        break;
      case 2:
        icon = 'https://cdn-icons-png.flaticon.com/512/157/157285.png';
        break;
      case 3:
        icon = 'https://static.thenounproject.com/png/1060425-200.png';
        break;
      default:
        icon = null;
    }

    return (
      <View style={styles.stepIndicator}>
        <Image
          source={{uri: icon}}
          style={styles.stepIcon}
          tintColor={stepStatus === 'finished' ? colors.white : colors.black}
        />
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return (
          <View style={{flex: 1, height: '100%'}}>
            <UpgradeRegionSelection
              previousStep={previousStep}
              nextStep={nextStep}
              currentPosition={currentPosition}
              labels={labels}
              setVisible={setVisible}
              previousData={rigionSelectionData}
            />
          </View>
        );
      case 1:
        return (
          <View style={{flex: 1, height: '100%'}}>
            <UpgradePackageSelection
              previousStep={previousStep}
              nextStep={nextStep}
              currentPosition={currentPosition}
              labels={labels}
              setVisible={setVisible}
              previousData={selectedPackage}
            />
          </View>
        );
      case 2:
        return (
          <UpgradeProductSelection
            previousStep={previousStep}
            nextStep={nextStep}
            currentPosition={currentPosition}
            labels={labels}
            setVisible={setVisible}
          />
        );
      case 3:
        return (
          <UpgradeInvoice
            previousStep={previousStep}
            nextStep={PaymentSuccess}
            currentPosition={currentPosition}
            labels={labels}
            setVisible={setVisible}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      {visible && <Loader />}
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Feather
              name="menu"
              size={scale(25)}
              color={colors.black}
              style={styles.menuIcon}
            />
          </Pressable>

          <View style={styles.indicatorView}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={4}
              renderStepIndicator={renderStepIndicator}
            />
          </View>

          {renderStepContent()}
        </View>
      </ScrollView>
    </View>
  );
};

export default UpgradeSelection;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenColor,
  },
  container: {flex: 1},
  indicatorView: {
    flex: 1,
    marginTop: verticalScale(70),
    marginBottom: verticalScale(15),
  },
  menuIcon: {
    position: 'absolute',
    left: scale(15),
    top: verticalScale(25),
  },
  flatListContent: {
    paddingHorizontal: scale(10),
    marginTop: verticalScale(40),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  packageContainer: {
    height: scale(82),
    width: scale(82),
    borderWidth: scale(2),
    borderRadius: scale(41),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(15),
    marginVertical: scale(10),
  },
  image: {
    width: scale(55),
    height: scale(55),
  },
  title: {
    fontSize: scale(13),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    width: scale(105),
    textAlign: 'center',
  },
  centerAlign: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  stepIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
});
