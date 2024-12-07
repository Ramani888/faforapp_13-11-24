import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import {scale, verticalScale} from '../../utils/responsive';
import CustomeCards from '../../Custome/CustomeCards';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomeButton from '../../Custome/CustomeButton';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import {Loader} from '../Loader';
import showMessageonTheScreen from '../showMessageonTheScreen';

const UpgradePackageSelection = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  setVisible,
  previousData,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    getPackageData();
    setSelectedPackage(previousData);
  }, []);

  // =================================== Api ================================== //

  const getPackageData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessUpgrade}/${apiRoutes.upgradePackage}`,
        {package_id: global?.userData?.package},
      );
      console.log('global', global?.userData)
      setPackageData(response?.data?.package);
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  // =================================== End ================================== //

  const next = () => {
    if (selectedPackage) {
      nextStep(selectedPackage, 'packageSelection');
      global.upgradePackageId = selectedPackage;
    } else {
      showMessageonTheScreen('Please select the package');
    }
  };

  const renderCard = useCallback(
    ({item, index}) => (
      <View style={styles.cardView}>
        <CustomeCards
          key={index}
          item={item}
          imageUri={item?.package_img}
          badgeUri={
            'https://image.similarpng.com/very-thumbnail/2021/05/Right-Correct-check-in-Green-Icon-Sign-on-transparent-background-PNG.png'
          }
          setSelectedProduct={setSelectedPackage}
          selectedProduct={selectedPackage}
          index={index}
        />
      </View>
    ),
    [selectedPackage],
  );

  const renderBody = () => {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.headerText}>Select Package</Text>
          <View style={styles.separator} />
          <FlatList
            data={packageData}
            renderItem={renderCard}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.buttonView}>
          <CustomeButtonView
            previousStep={previousStep}
            nextStep={next}
            currentPosition={currentPosition}
            labels={labels}
            previous={true}
            next={true}
            buttonwidth={scale(130)}
            buttonContainerStyle={{marginHorizontal:scale(30)}}
          />
        </View>
      </View>
    );
  };

  return <View>{renderBody()}</View>;
};

export default UpgradePackageSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  cardContainer: {
    flex: 1,
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
  cardView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  flatListContent: {
    paddingTop: verticalScale(10),
  },
  buttonView: {
    marginTop: verticalScale(125),
    marginBottom: verticalScale(30),
    marginHorizontal: scale(10),
  },
});
