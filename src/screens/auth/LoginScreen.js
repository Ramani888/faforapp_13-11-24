// import React, {createRef, useEffect, useState} from 'react';
// import {
//   Alert,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useDispatch, useSelector} from 'react-redux';
// import AppText from '../../components/AppText';
// import AuthInput from '../../components/AuthInput';
// import CustomButton from '../../components/CustomButton';
// import {Loader} from '../../components/Loader';
// import strings from '../../constants/strings';
// import {userLogin, userLoginClear} from '../../redux/slices/login';
// import colors from '../../themes/colors';
// import {Montserrat} from '../../themes/fonts';
// import images from '../../themes/images';
// import {moderateHeight, moderateScale} from '../../utils/responsive';
// import screens from '../../constants/screens';

// const LoginScreen = ({navigation}) => {
//   const [userId, setuserId] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [userIdError, setuserIdError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const userIdInputRef = createRef();

//   const dispatch = useDispatch();
//   const loginResponse = useSelector(state => state.userLogin);

//   const handleSubmitPress = () => {
//     if (!userId) {
//       setuserIdError(strings.userIdRequired);
//     }
//     if (!userPassword) {
//       setPasswordError(strings.passwordRequired);
//     }

//     if (userId != '' && userPassword != '') {
//       const data = {
//         user_id: userId,
//         password: userPassword,
//       };
//       dispatch(userLogin(data));
//     }
//   };

//   useEffect(() => {
//     if (loginResponse?.error) {
//       Alert.alert(strings.faforlife, loginResponse?.error);
//       dispatch(userLoginClear());
//     }
//   }, [loginResponse]);

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <KeyboardAvoidingView enabled>
//           <View style={styles.logoView}>
//             <Image style={styles.logo} source={images.logo} />
//           </View>
//           <View style={styles.formView}>
//             <AppText
//               label={strings.login}
//               size={'modest'}
//               fontFamily={Montserrat.Bold}
//               color={colors.blue}
//             />
//             <AppText
//               label={strings.loginSubtext}
//               fontFamily={Montserrat.Regular}
//               color={colors.black}
//               textStyles={{marginBottom: moderateHeight(3)}}
//             />
//             <AuthInput
//               icon={
//                 <Icon
//                   name="person-outline"
//                   size={moderateScale(25)}
//                   color={colors.darkGrey}
//                 />
//               }
//               placeholder={strings.userId}
//               onChangeText={userId => {
//                 setuserId(userId);
//                 setuserIdError(false);
//               }}
//               onSubmitEditing={() =>
//                 userIdInputRef.current && userIdInputRef.current.focus()
//               }
//               error={userIdError}
//             />

//             <AuthInput
//               icon={
//                 <Icon
//                   name="key-outline"
//                   size={moderateScale(25)}
//                   color={colors.darkGrey}
//                 />
//               }
//               placeholder={strings.password}
//               onChangeText={userPassword => {
//                 setUserPassword(userPassword);
//                 setPasswordError(false);
//               }}
//               onSubmitEditing={Keyboard.dismiss}
//               secureTextEntry={true}
//               ref={userIdInputRef}
//               error={passwordError}
//             />

//             <CustomButton title={strings.signIn} onPress={handleSubmitPress} />

//             <TouchableOpacity
//               onPress={() => navigation.navigate(screens.forgetPassword)}>
//               <AppText
//                 label={strings.forgetPassword}
//                 fontFamily={Montserrat.SemiBold}
//                 color={colors.black}
//                 textStyles={{marginTop: moderateHeight(2.5)}}
//                 centered
//               />
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </ScrollView>
//       <Image style={styles.background} source={images.bgBottom} />
//       {loginResponse?.isLoading && <Loader />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   background: {
//     position: 'absolute',
//     height: '100%',
//     width: '100%',
//     zIndex: -5,
//   },
//   formView: {
//     paddingLeft: 50,
//     paddingRight: 50,
//     marginTop: 30,
//   },

//   logoView: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.darkBlue,
//     borderBottomLeftRadius: moderateScale(50),
//     borderBottomRightRadius: moderateScale(50),
//     paddingVertical: moderateHeight(5),
//   },
//   logo: {
//     height: moderateScale(200),
//     width: moderateScale(200),
//     resizeMode: 'contain',
//   },
// });

// export default LoginScreen;



import React, {createRef, useEffect, useState, useCallback} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import CustomeInputField from '../../Custome/CustomeInputField';
import CustomeButton from '../../Custome/CustomeButton';
import {Loader} from '../../components/Loader';
import strings from '../../constants/strings';
import {userLogin, userLoginClear} from '../../redux/slices/login';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import images from '../../themes/images';
import {moderateHeight, moderateScale, scale, verticalScale} from '../../utils/responsive';
import screens from '../../constants/screens';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const LoginScreen = ({navigation,route}) => {
  const [userId, setuserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [countryalias, setCountryalias] = useState(route.params.country_alias);
  const [userIdError, setuserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userIdInputRef = createRef();

  const dispatch = useDispatch();
  const loginResponse = useSelector(state => state.userLogin);
  const handleSubmitPress = useCallback(() => {
    if (!userId) {
      setuserIdError(strings.userIdRequired);
    }
    if (!userPassword) {
      setPasswordError(strings.passwordRequired);
    }
    if (userId && userPassword) {
      const data = {
        user_id: userId,
        password: userPassword,
        country_alias:countryalias
      };
      dispatch(userLogin(data));
    }
  }, [userId, userPassword, dispatch]);

  useEffect(() => {
    if (loginResponse?.error) {
      Alert.alert(strings.faforlife, loginResponse?.error);
      dispatch(userLoginClear());
    }
  }, [loginResponse, dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView enabled>
          <View style={styles.logoView}>
            <FontAwesome6
              name='arrow-left-long'
              color={colors.white}
              size={scale(17)}
              style={styles.leftArrow}
            />
            <Image style={styles.logo} source={images.logo} />
          </View>
          <View style={styles.formView}>
            <AppText
              label={strings.login}
              size={'modest'}
              fontFamily={Montserrat.Bold}
              color={colors.theme1}
            />
            <AppText
              label={strings.loginSubtext}
              fontFamily={Montserrat.Regular}
              color={colors.black}
              textStyles={styles.loginSubtext}
            />
            <View style={styles.inputContainer}>
              <CustomeInputField
                placeholder={strings.userId}
                onChangeText={userId => {
                  setuserId(userId);
                  setuserIdError(false);
                }}
                value={userId}
                borderColor={colors.grey}
                borderWidth={scale(1)}
                borderRadius={scale(10)}
                width={'100%'}
                textInputStyle={styles.textInputStyle}
                MainWidth={'100%'}
                height={verticalScale(40)}
                placeholderTextColor={colors.darkGrey}
                color={colors.black}
                inputWidth={'100%'}
                aliginCenter={true}
                textAlign={'center'}
                fontFamily={Montserrat.SemiBold}
                IconComponentName={FontAwesome6}
                iconLeft={true}
                iconColor={colors.grey}
                iconName={'user-large'}
                iconSize={scale(20)}
                errors={userIdError}
                touched={userIdError}
              />
              <CustomeInputField
                placeholder={strings.password}
                onChangeText={userPassword => {
                  setUserPassword(userPassword);
                  setPasswordError(false);
                }}
                value={userPassword}
                borderColor={colors.grey}
                borderWidth={scale(1)}
                borderRadius={scale(10)}
                width={'100%'}
                textInputStyle={styles.textInputStyle}
                MainWidth={'100%'}
                height={verticalScale(40)}
                placeholderTextColor={colors.darkGrey}
                color={colors.black}
                inputWidth={'100%'}
                aliginCenter={true}
                fontFamily={Montserrat.SemiBold}
                IconComponentName={Icon}
                iconLeft={true}
                iconColor={colors.grey}
                iconName={'key-outline'}
                iconSize={scale(20)}
                errors={passwordError}
                touched={passwordError}
                secureTextEntry={true}
              />
              <CustomeButton
                buttoncolor={colors.theme1}
                buttonwidth="65%"
                buttonheight={verticalScale(30)}
                borderRadius={scale(5)}
                title="Sign In"
                fontcolor={colors.white}
                fontSize={scale(16)}
                fontFamily={Montserrat.SemiBold}
                elevation={scale(10)}
                marginBottom={verticalScale(10)}
                iconRight={true}
                IconComponentName={FontAwesome6}
                iconname={'arrow-right-long'}
                iconsize={scale(17)}
                iconcolor={colors.theme1}
                iconViewLeft={scale(25)}
                onPress={handleSubmitPress}
                alignSelf={'center'}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.forgetPassword)}>
              <AppText
                label={strings.forgetPassword}
                fontFamily={Montserrat.SemiBold}
                color={colors.black}
                textStyles={styles.forgetPasswordText}
                centered
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {loginResponse?.isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  formView: {
    paddingHorizontal: scale(50),
    marginTop: verticalScale(50),
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    paddingVertical: moderateHeight(5),
  },
  logo: {
    marginTop: verticalScale(40),
    height: moderateScale(150),
    width: moderateScale(200),
    resizeMode: 'contain',
  },
  leftArrow: {
    position: 'absolute',
    left: scale(30),
    top: verticalScale(40),
  },
  loginSubtext: {
    marginBottom: moderateHeight(3),
    fontWeight: '600',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: scale(25),
    marginTop: verticalScale(20),
  },
  textInputStyle: {
    paddingBottom: verticalScale(8),
    fontSize: moderateScale(16),
    // marginLeft: scale(25),
    paddingLeft: scale(10),
  },
  forgetPasswordText: {
    marginTop: moderateHeight(2.5),
    borderWidth: scale(1),
    borderColor: colors.black,
    width: scale(150),
    borderRadius: scale(8),
    alignSelf: 'center',
  },
});

export default React.memo(LoginScreen);

