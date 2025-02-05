import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../themes/colors';
import {scale, verticalScale} from '../../../../utils/responsive';
import {Montserrat} from '../../../../themes/fonts';
import CustomeButton from '../../../../Custome/CustomeButton';
import CustomeCounter from '../../../../Custome/CustomeCounter';
import CustomeButtonView from '../../../../Custome/CustomeButtonView';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';
import apiRoutes from '../../../../constants/apiRoutes';
import axiosInstanceForBussiness from '../../../../utils/axiosInstanceForBussiness';
import {Loader} from '../../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const RepurchaseProductSelection = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState('');
  const [cart, setCart] = useState([]);
  
  console.log('productData', productData[0])

  useEffect(() => {
    getProductData();
  }, []);

  const loadCartFromAsyncStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('repurchaseCart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);

        setProductData(prevProductData =>
          prevProductData.map(product => {
            const cartItem = parsedCart.find(
              cartItem => cartItem.id === product.product_id,
            );
            return cartItem
              ? {...product, inCart: true, quantity: cartItem.qty}
              : product;
          }),
        );
      }
    } catch (error) {
      console.error('Failed to load cart data from AsyncStorage:', error);
    }
  };

  // ==================================== Api ================================== //

  const getProductData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRepurchase}/${apiRoutes.repuchaseProduct}`,
        {stockist_country: `${global.RepurchaseCountryId}`},
      );
      const productsWithCartStatus = response.data?.products.map(product => ({
        ...product,
        inCart: false,
        quantity: 1,
      }));
      setProductData(productsWithCartStatus);
      setDiscount(response?.data?.discount)
      loadCartFromAsyncStorage();
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================================== End ================================== //

  // ============================= Cart functionality ========================== //

  const saveCartToAsyncStorage = async cartData => {
    try {
      await AsyncStorage.setItem('repurchaseCart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Failed to save cart data to AsyncStorage:', error);
    }
  };

  const handleAddToCart = item => {
    setVisible(true);
    try {
      setCart(prevCart => {
        const existingProduct = prevCart.find(
          product => product.id === item.product_id,
        );
        const newCart = existingProduct
          ? prevCart.map(product =>
              product.id === item.product_id
                ? {...product, qty: product.qty + 1}
                : product,
            )
          : [
              ...prevCart,
              {
                id: item?.product_id,
                qty: item?.quantity,
                price: item?.sale_price,
                productPV: item?.product_pv,
              },
            ];

        saveCartToAsyncStorage(newCart);

        return newCart;
      });
      setProductData(prevProductData =>
        prevProductData.map(product =>
          product.product_id === item.product_id
            ? {...product, inCart: true}
            : product,
        ),
      );
    } catch (error) {
      console.log('error', error);
    } finally {
      setVisible(false);
    }
  };

  const handleQuantityChange = (product_id, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(product =>
        product.id === product_id ? {...product, qty: quantity} : product,
      );
      saveCartToAsyncStorage(updatedCart);
      return updatedCart;
    });

    setProductData(prevProductData =>
      prevProductData.map(product =>
        product.product_id === product_id ? {...product, quantity} : product,
      ),
    );
  };

  const handleRemoveFromCart = product_id => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(product => product.id !== product_id);
      saveCartToAsyncStorage(updatedCart);
      return updatedCart;
    });

    setProductData(prevProductData =>
      prevProductData.map(product =>
        product.product_id === product_id
          ? {...product, inCart: false, quantity: 1}
          : product,
      ),
    );
  };

  // ==================================== End ================================== //

  const previousStep = () => {
    navigation.goBack();
  };

  const nextStep = () => {
    global.repurchaseCartData = cart.map((item, index) => {
      const totalAmount = parseFloat(item.price) * item.qty;
      const totalPV = parseFloat(item.productPV) * item.qty;

      return {
        id: item.id,
        price: item.price,
        qty: item.qty,
        productPV: item.productPV,
        totalAmount: totalAmount.toFixed(2),
        totalPV: totalPV.toFixed(2),
      };
    });
    global.repurchaseDiscount = discount;

    navigation.navigate(screens.repurchasePurchaseBill);
  };

  const renderCard = ({item, index}) => (
    <View
      style={[
        styles.cardContainer,
        index % 2 !== 0 && styles.cardContainerMarginLeft,
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:  item?.product_img
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textInnerContainer}>
          <Text style={styles.title}>{item?.product_name}</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.price}>{item?.sale_price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {item?.inCart && (
            <CustomeCounter
              handleQuantityChange={handleQuantityChange}
              item={item}
              quantity={item.quantity}
              type={'repurchase'}
              uniqueId={'product_id'}
            />
          )}
          <CustomeButton
            buttoncolor={colors.theme1}
            buttonwidth="75%"
            buttonheight={verticalScale(30)}
            borderRadius={scale(5)}
            title={item?.inCart ? 'Remove cart' : 'Add to Cart'}
            fontcolor={colors.white}
            fontSize={scale(9)}
            fontFamily={Montserrat.SemiBold}
            elevation={scale(10)}
            alignSelf="flex-end"
            marginRight={item?.inCart ? scale(20) : scale(15)}
            marginTop={verticalScale(10)}
            paddingTop
            marginBottom={verticalScale(10)}
            onPress={() => {
              if (item?.inCart) {
                handleRemoveFromCart(item?.product_id);
              } else {
                handleAddToCart(item);
              }
            }}
          />
        </View>
      </View>
    </View>
  );

  const renderBody = () => (
    <View style={styles.bodyContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{marginLeft: scale(15)}}>
          <Feather name="menu" size={scale(25)} color={colors.black} />
        </Pressable>
        <Text style={styles.pageTitle}>Explore Product</Text>
      </View>

      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={scale(20)}
          color={colors.grey}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search Product Name"
          placeholderTextColor={colors.grey}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={productData}
        renderItem={renderCard}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.buttonView}>
        <CustomeButtonView
          previousStep={previousStep}
          nextStep={nextStep}
          currentPosition={''}
          buttonwidth={scale(130)}
          labels={''}
          previous={true}
          next={true}
          buttonContainerStyle={{marginHorizontal:scale(30)}}
        />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>{renderBody()}</ScrollView>
      {isLoading && <Loader />}
    </View>
  );
};

export default RepurchaseProductSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenColor,
    paddingTop: verticalScale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    // margin: scale(10),
    alignItems: 'center',
    marginBottom: scale(20),
  },
  pageTitle: {
    fontSize: scale(18),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    paddingLeft: scale(55),
    marginBottom: verticalScale(3),
  },
  searchContainer: {
    borderWidth: scale(0.8),
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(15),
    width: scale(310),
    alignSelf: 'center',
    borderRadius: scale(5),
  },
  searchIcon: {
    position: 'absolute',
    left: scale(10),
  },
  searchInput: {
    fontSize: scale(15),
    color: colors.black,
    textAlign: 'center',
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.white,
    width: scale(160),
    padding: scale(15),
    alignItems: 'center',
    elevation: scale(5),
    justifyContent: 'center',
    borderRadius: scale(20),
    marginBottom: verticalScale(10),
    marginLeft: scale(4),
    marginRight: scale(4),
  },
  cardContainerMarginLeft: {
    marginLeft: scale(10),
  },
  imageContainer: {
    backgroundColor: colors.lightGrey,
    width: scale(130),
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
  textContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textInnerContainer: {
    marginLeft: scale(17),
  },
  title: {
    width: scale(60),
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingTop: verticalScale(10),
  },
  description: {
    fontSize: scale(10),
    color: colors.grey,
    fontFamily: Montserrat.Medium,
    paddingTop: verticalScale(2),
  },
  price: {
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    paddingTop: verticalScale(15),
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    marginLeft: scale(10),
  },
  buttonViewContainer: {
    marginBottom: verticalScale(15),
    marginTop: verticalScale(-10),
  },
  buttonView: {
    width: '100%',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
  },
});
