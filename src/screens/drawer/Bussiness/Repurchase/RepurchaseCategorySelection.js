import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../../themes/colors';
import {scale, verticalScale} from '../../../../utils/responsive';
import {Montserrat} from '../../../../themes/fonts';
import CustomeButtonView from '../../../../Custome/CustomeButtonView';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import showMessageonTheScreen from '../../../../components/showMessageonTheScreen';

const categoryData = [
  {
    image:
      'https://t4.ftcdn.net/jpg/03/22/27/39/360_F_322273968_Ju54DJQD33PeVyVTLBS79C9rYKrQhYUq.jpg',
    name: 'Products',
  },
  {
    image:
      'https://w7.pngwing.com/pngs/278/391/png-transparent-maniar-eye-physiotherapy-clinic-ophthalmology-medicine-wavefront-technologies-service-interior-design-services-medical.png',
    name: 'Physiotherapy Machines',
  },
];

const RepurchaseCategorySelection = () => {
  const navigation = useNavigation();
  const [selectCategory, setSelectCategory] = useState('');
  console.log('selectCategory',selectCategory)

  const previousStep = () => {
    navigation.goBack();
  };

  const nextStep = () => {
    if(selectCategory >= 0){
      navigation.navigate(screens.repurchaseProductSelection);
    }else{
      showMessageonTheScreen('Please select the category')
    }
  
  };

  const renderCategory = ({item, index}) => {
    const isSelected = selectCategory == index;

    return (
      <Pressable
        style={[
          styles.categoryItem,
          {
            borderWidth: isSelected ? scale(2) : scale(1),
            borderColor: isSelected ? colors.lightBlue : colors.grey,
          },
        ]}
        onPress={() => setSelectCategory(index)}>
        <Image source={{uri: item.image}} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={scale(25)} color={colors.black} />
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Repurchase Store</Text>
        <Text style={styles.subtitle}>Choose Categories Below</Text>
      </View>
      <View style={styles.categoryContainer}>
        <ImageBackground
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVDXCmIAtNGBn-zwyzaJoOewwZb_A2MNtksw&s',
          }}
          style={styles.imageBackground}
          imageStyle={styles.imageBorderRadius}>
          <Text style={styles.imageText}>Our Products</Text>
        </ImageBackground>

        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/736x/3b/82/2c/3b822c499d1ad5f7732089d00f1a6ba5.jpg',
          }}
          style={styles.imageBackground}
          imageStyle={styles.imageBorderRadius}>
          <Text style={[styles.imageText, styles.physiotherapyText]}>
            Our Physiotherapy Machine
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categoryData}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
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
    </ScrollView>
  );
};

export default RepurchaseCategorySelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
  },
  headerContainer: {
    marginTop: verticalScale(25),
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
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: scale(155),
    height: scale(250),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageBorderRadius: {
    borderRadius: scale(20),
  },
  imageText: {
    fontSize: scale(16),
    color: colors.white,
    paddingBottom: verticalScale(20),
    fontFamily: Montserrat.SemiBold,
  },
  physiotherapyText: {
    fontSize: scale(14),
    width: scale(100),
    paddingBottom: verticalScale(10),
  },
  categoriesSection: {
    marginTop: verticalScale(20),
  },
  flatListContent: {
    paddingBottom: verticalScale(10),
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    borderRadius: scale(10),
    paddingVertical: verticalScale(6),
  },
  categoryImage: {
    width: scale(40),
    height: scale(40),
  },
  categoryName: {
    fontSize: scale(16),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    marginLeft: scale(10),
  },
  buttonView: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(60),
  },
});
