import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from '../../utils/responsive';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import CustomeButton from '../../Custome/CustomeButton';
import CustomeCounter from '../../Custome/CustomeCounter';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import apiRoutes from '../../constants/apiRoutes';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import {Loader} from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showMessageonTheScreen from '../showMessageonTheScreen';
import { useRoute } from '@react-navigation/native';

const UpgradeProductSelection = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  setVisible,
}) => {
  // const route = useRoute();
  // const { from } = route.params;
  const [productData, setProductData] = useState();
  const [cart, setCart] = useState([]);
  const [priceLimit, setPriceLimit] = useState('');

  useEffect(() => {
    getProductData();
  }, []);

  console.log('priceLimit', priceLimit)

  const loadCartFromAsyncStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('upgradeCart');
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

  // =================================== Api ================================== //

  const getProductData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessUpgrade}/${apiRoutes.upgradePackageProduct}`,
        {
          package_id: global?.packageId,
          stockist_country: global.userData?.stockist_country,
          user_id: global?.userData?.id
        },
      );
      global.after_purchase = response?.data?.after_purchase;
      global.current_package_pv = response?.data?.current_package_pv;
      global.upgrade_package_pv = response?.data?.upgrade_package_pv;
      setPriceLimit(response?.data?.product_price);
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

  // =================================== End ================================== //

  // ============================= Cart functionality ========================== //

  const saveCartToAsyncStorage = async cartData => {
    try {
      await AsyncStorage.setItem('upgradeCart', JSON.stringify(cartData));
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
                id: item?.pid,
                qty: item?.quantity,
                price: item?.product_amount,
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

  const cartTotalPrice = cart.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price) * item.qty;
  }, 0);

  console.log('cartTotalPrice', cartTotalPrice)

  const next = () => {
    global.upgradeCartData = cart.map((item, index) => {
      const totalAmount = parseFloat(item.price) * item.qty;

      return {
        id: item.id,
        price: item.price,
        qty: item.qty,
        totalAmount: totalAmount.toFixed(2),
      };
    });

    nextStep();
  };

  const renderCard = ({item, index}) => {
    return (
      <View
        style={[
          styles.cardContainer,
          index % 2 !== 0 && styles.cardContainerMarginLeft,
        ]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item?.product_img,
            }}
            style={styles.image}
          />
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
                type={'upgrade'}
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
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>Select Package</Text>
        <View style={styles.separator} />

        <FlatList
          data={productData}
          renderItem={renderCard}
          numColumns={2}
          key={'_'}
          style={{marginTop: verticalScale(15)}}
        />

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
      </View>
    );
  };

  return <View style={styles.container}>{productData && renderBody()}</View>;
};

export default UpgradeProductSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(3),
    alignItems: 'center',
    marginTop: verticalScale(25),
  },
  headerText: {
    fontSize: scale(15),
    color: colors.black,
    fontFamily: Montserrat.SemiBold,
    marginHorizontal: scale(10),
  },
  separator: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.grey,
    paddingTop: verticalScale(5),
    marginHorizontal: scale(10),
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
    marginHorizontal: scale(5),
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
    width: scale(65),
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
  buttonView: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(25),
  },
});
