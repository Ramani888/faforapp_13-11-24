import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../themes/colors';
import { scale, verticalScale } from '../../utils/responsive';
import { Montserrat } from '../../themes/fonts';
import CustomeCards from '../../Custome/CustomeCards';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import { Loader } from '../Loader';
import showMessageonTheScreen from '../showMessageonTheScreen';

const screenWidth = Dimensions.get('window').width;

const cardData = [
    {
        imageUri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXY-3gUADRTszwZ_QMcTG1k61USYWDKSzKyi6W_Hr4WnWE32pst8CxPhl-_9PL9Cpdyk&usqp=CAU',
        badgeUri:
            'https://image.similarpng.com/very-thumbnail/2021/05/Right-Correct-check-in-Green-Icon-Sign-on-transparent-background-PNG.png',
        title: 'Smart Package',
        description: 'Description',
        price: 'N 10000',
    },
    {
        imageUri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXY-3gUADRTszwZ_QMcTG1k61USYWDKSzKyi6W_Hr4WnWE32pst8CxPhl-_9PL9Cpdyk&usqp=CAU',
        badgeUri:
            'https://image.similarpng.com/very-thumbnail/2021/05/Right-Correct-check-in-Green-Icon-Sign-on-transparent-background-PNG.png',
        title: 'Smart Package',
        description: 'Description',
        price: 'N 10000',
    },
    {
        imageUri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXY-3gUADRTszwZ_QMcTG1k61USYWDKSzKyi6W_Hr4WnWE32pst8CxPhl-_9PL9Cpdyk&usqp=CAU',
        badgeUri:
            'https://image.similarpng.com/very-thumbnail/2021/05/Right-Correct-check-in-Green-Icon-Sign-on-transparent-background-PNG.png',
        title: 'Smart Package',
        description: 'Description',
        price: 'N 10000',
    },
    {
        imageUri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXY-3gUADRTszwZ_QMcTG1k61USYWDKSzKyi6W_Hr4WnWE32pst8CxPhl-_9PL9Cpdyk&usqp=CAU',
        badgeUri:
            'https://image.similarpng.com/very-thumbnail/2021/05/Right-Correct-check-in-Green-Icon-Sign-on-transparent-background-PNG.png',
        title: 'Smart Package',
        description: 'Description',
        price: 'N 10000',
    },
];

const PackageSelection = ({
    previousStep,
    nextStep,
    currentPosition,
    labels,
    data,
    previousData,
}) => {
    const [visible, setVisible] = useState(false);
    const [packageData, setPackageData] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState([])

    useEffect(() => {
        getPackageData();
        setSelectedPackage(previousData);
    }, []);

    // ==================================== Api ================================== //

    const getPackageData = async () => {
        try {
            setVisible(true);
            const response = await axiosInstanceForBussiness.post(
                `${apiRoutes.businessRegistration}/${apiRoutes.getPackage}`,
                {},
            );
            setPackageData(response?.data?.package);
        } catch (error) {
            console.error('Error making POST request:', error);
        } finally {
            setVisible(false);
        }
    };

    // ==================================== End ================================== //

    const next = () => {
        if (selectedPackage) {
            nextStep(selectedPackage, 'packageSelection');
            global.selectedPackage = selectedPackage;
        } else {
            showMessageonTheScreen('Select any package');
        }
    };

    const renderCard = ({ item, index }) => {
        const isSelected = selectedPackage == item?.id;
        return (
            <View style={styles.cardView}>
                <Pressable
                    style={styles.cardContainer}
                    onPress={() => {
                        setSelectedPackage(item?.id);
                        global.packageId = item?.id;
                    }}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.package_img }} style={styles.image} />
                        {isSelected && (
                            <Image
                                source={require('../../assets/images/selected.png')}
                                style={styles.badge}
                            />
                        )}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.package_name}</Text>
                        <Text style={styles.price}>{item.package_price}</Text>
                    </View>
                </Pressable>
            </View>
        );
    };

    const renderHorizontalCard = ({ item, index }) => {
        const isSelected = setSelectedPackage == index;

        return (
            <Pressable
                style={styles.horizontalCardContainer}
                onPress={() => setSelectedProduct(index)}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item?.imageUri }} style={styles.cardImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.description}>{item?.description}</Text>
                    <Text style={styles.price}>{item?.price}</Text>
                </View>
            </Pressable>
        );
    };

    const renderBody = () => {
        return (
            <View style={styles.bodyContainer}>
                <Text style={styles.pageTitle}>Select Package</Text>
                <View style={styles.cardListContainer}>
                    <FlatList data={packageData} renderItem={renderCard} horizontal />
                </View>
                <View>
                    <Text style={styles.comingSoonTitle}>Comming Soon</Text>
                    <View style={styles.cardListContainer}>
                        <FlatList
                            data={cardData}
                            renderItem={renderHorizontalCard}
                            horizontal
                            pagingEnabled
                        />
                    </View>
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
                        buttonContainerStyle={{ marginHorizontal: scale(30) }}
                    />
                </View>

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
        <View style={{ flex: 1 }}>
            {visible && <Loader />}
            <ScrollView style={styles.container}>{renderBody()}</ScrollView>
        </View>
    );
};

export default PackageSelection;

const styles = StyleSheet.create({
    container: { flex: 1 },
    bodyContainer: {
        margin: scale(15),
        marginBottom: scale(5),
    },
    pageTitle: {
        fontSize: scale(16),
        color: colors.black,
        fontFamily: Montserrat.Bold,
        paddingLeft: scale(20),
        marginBottom: verticalScale(15),
    },
    cardView: {
        marginRight: scale(25),
    },
    cardListContainer: {
        marginTop: verticalScale(15),
    },
    horizontalCardContainer: {
        flexDirection: 'row',
        width: screenWidth - 50,
        alignItems: 'center',
        marginLeft: scale(10),
        gap: scale(10)
    },
    imageContainer: {
        padding: scale(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(20),
    },
    cardImage: {
        width: scale(100),
        height: scale(100),
    },
    textContainer: {
        alignItems: 'flex-start',
        marginLeft: scale(15),
        marginTop: verticalScale(-10),
    },
    title: {
        fontSize: scale(13),
        color: colors.black,
        fontFamily: Montserrat.SemiBold,
        paddingTop: verticalScale(10),
    },
    description: {
        fontSize: scale(13),
        color: colors.grey,
        fontFamily: Montserrat.Medium,
        paddingTop: verticalScale(2),
    },
    price: {
        fontSize: scale(13),
        color: colors.black,
        fontFamily: Montserrat.Medium,
        paddingTop: verticalScale(10),
    },
    comingSoonTitle: {
        fontSize: scale(16),
        color: colors.black,
        fontFamily: Montserrat.Bold,
        paddingLeft: scale(20),
        marginBottom: verticalScale(15),
        marginTop: verticalScale(15),
    },
    noteContainer: {
        marginHorizontal: scale(15),
        marginTop: verticalScale(20),
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
    buttonView: {
        marginTop: verticalScale(40),
        marginBottom: verticalScale(15),
    },
    cardContainer: {
        backgroundColor: colors.white,
        width: scale(170),
        padding: scale(15),
        justifyContent: 'center',
        borderRadius: scale(20),
    },
    imageContainer: {
        backgroundColor: colors.lightGrey,
        width: scale(140),
        height: scale(170),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(10),
    },
    image: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(10),
    },
    badge: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(15),
        position: 'absolute',
        top: verticalScale(-10),
        right: scale(-10),
    },
    textContainer: {
        alignItems: 'flex-start',
    },
    title: {
        fontSize: scale(13),
        color: colors.black,
        fontFamily: Montserrat.SemiBold,
        paddingTop: verticalScale(10),
        textAlign: 'left',
    },
    price: {
        fontSize: scale(13),
        color: colors.black,
        fontFamily: Montserrat.Medium,
        paddingTop: verticalScale(2),
    },
});
