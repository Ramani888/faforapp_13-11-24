import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../themes/colors';
import {scale, verticalScale} from '../../utils/responsive';
import {Montserrat} from '../../themes/fonts';
import CustomeButton from '../../Custome/CustomeButton';
import CustomeCounter from '../../Custome/CustomeCounter';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import RenderHtml from 'react-native-render-html';
import {Loader} from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showMessageonTheScreen from '../showMessageonTheScreen';

const ProductSelection = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  data
}) => {
  const [visible, setVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [priceLimit, setPriceLimit] = useState('');
  const [discount, setDiscount] = useState('');
  const [payAmount, setPayAmount] = useState('');

  useEffect(() => {
    getPackageProduct();
  }, []);

  const loadCartFromAsyncStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);

        setProductData(prevProductData =>
          prevProductData.map(product => {
            const cartItem = parsedCart.find(
              cartItem => cartItem.id === product.pid,
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

  const getPackageProduct = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.getPackageProduct}`,
        {
          package_id: global.packageId,
          product_type: 1,
          country_id: global.countryId,
        },
      );
      setPriceLimit(response?.data?.product_price);
      setPayAmount(response?.data?.pay_amount)
      setDiscount(response?.data?.discount)

      const productsWithCartStatus = response.data?.products.map(product => ({
        ...product,
        inCart: false,
        quantity: 1,
      }));
      setProductData(productsWithCartStatus);
      loadCartFromAsyncStorage();
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  // ==================================== End ================================== //

  // ============================ Cart Functionality ========================== //

  const saveCartToAsyncStorage = async cartData => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Failed to save cart data to AsyncStorage:', error);
    }
  };

  const handleAddToCart = item => {
    setVisible(true);
    try {
      setCart(prevCart => {
        const existingProduct = prevCart.find(
          product => product.id === item.pid,
        );
        const newCart = existingProduct
          ? prevCart.map(product =>
              product.id === item.pid
                ? {...product, qty: product.qty + 1}
                : product,
            )
          : [
              ...prevCart,
              {
                id: item.pid,
                qty: item.quantity,
                price: item.product_amount,
              },
            ];

        saveCartToAsyncStorage(newCart);

        return newCart;
      });
      setProductData(prevProductData =>
        prevProductData.map(product =>
          product.pid === item.pid ? {...product, inCart: true} : product,
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
        product.pid === product_id ? {...product, quantity} : product,
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
        product.pid === product_id
          ? {...product, inCart: false, quantity: 1}
          : product,
      ),
    );
  };

  // ==================================== End ================================== //

  const next = () => {
    nextStep();
    global.cartData = cart;
  };

  const cartTotalPrice = cart.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price) * item.qty;
  }, 0);

  const renderProduct = ({item, index}) => {
    return (
      <View
        style={[
          styles.cardContainer,
          index % 2 !== 0 && styles.cardContainerMarginLeft,
        ]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.pro_img}} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textInnerContainer}>
            <Text style={styles.title}>{item?.product_name}</Text>
            <Text style={styles.price}>{item?.product_amount}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {item?.inCart && (
              <CustomeCounter
                handleQuantityChange={handleQuantityChange}
                item={item}
                quantity={item.quantity}
                cartTotalPrice={cartTotalPrice}
                priceLimit={priceLimit}
                type={'register'}
              />
            )}

            <CustomeButton
              buttoncolor={colors.theme1}
              buttonwidth={item?.inCart ? '75%' : '75%'}
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
                if (!item?.inCart) {
                  if (cartTotalPrice < priceLimit) {
                    handleAddToCart(item);
                  } else {
                    showMessageonTheScreen(
                      'you have reached the price limit for this package',
                    );
                  }
                } else {
                  handleRemoveFromCart(item?.pid);
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.pageTitle}>Select Product</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={productData}
            renderItem={renderProduct}
            numColumns={2}
            key={'_'}
          />
        </View>
        <Text style={styles.limitText}>
          According to your package your amount limit is {priceLimit}
        </Text>
        <Text style={styles.limitText}>
          Discount: {discount}
        </Text>
        <Text style={styles.limitText}>
          Pay After Discount: {payAmount}
        </Text>
        <View style={styles.buttonView}>
          <CustomeButtonView
            previousStep={previousStep}
            nextStep={next}
            currentPosition={currentPosition}
            labels={labels}
            previous={true}
            next={true}
            buttonwidth={scale(130)}
            buttonContainerStyle={{marginHorizontal: scale(30)}}
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
    <View style={{flex: 1}}>
      {visible && <Loader />}
      <ScrollView style={styles.container}>{renderBody()}</ScrollView>
    </View>
  );
};

export default ProductSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    margin: scale(10),
    marginBottom: scale(5),
  },
  pageTitle: {
    fontSize: scale(16),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    paddingLeft: scale(20),
    marginBottom: verticalScale(15),
  },
  flatListContainer: {
    flex: 1,
  },
  limitText: {
    fontSize: scale(12),
    color: colors.black,
    fontFamily: Montserrat.Medium,
    width: scale(220),
    paddingTop: verticalScale(15),
    paddingLeft: scale(15),
    lineHeight: scale(15),
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
    width: scale(65),
    fontSize: scale(10),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    paddingTop: verticalScale(10),
  },
  description: {
    width: scale(80),
    fontSize: scale(10),
    color: colors.black,
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
});
