import React, {createRef, useEffect, useState} from 'react';
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
import AuthInput from '../../components/AuthInput';
import CustomButton from '../../components/CustomButton';
import {Loader} from '../../components/Loader';
import strings from '../../constants/strings';
import {userLogin, userLoginClear} from '../../redux/slices/login';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import images from '../../themes/images';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';
import globalStyles from '../../themes/globalStyles';

const ForgetPassword = ({navigation}) => {
  const [userId, setuserId] = useState('');
  const [email, setEmail] = useState('');
  const [userIdError, setuserIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const userIdInputRef = createRef();

  const dispatch = useDispatch();
  const loginResponse = useSelector(state => state.userLogin);

  const handleSubmitPress = () => {
    if (!userId) {
      setuserIdError(strings.userIdRequired);
    }
    if (!email) {
      setEmailError(strings.emailRequired);
    }

    if (userId != '' && email != '') {
      const data = {
        user_id: userId,
        password: email,
      };
      dispatch(userLogin(data));
    }
  };

  useEffect(() => {
    if (loginResponse?.error) {
      Alert.alert(strings.faforlife, loginResponse?.error);
      dispatch(userLoginClear());
    }
  }, [loginResponse]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView enabled>
          <View style={styles.logoView}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={moderateScale(27)}
                color={colors.white}
              />
            </TouchableOpacity>
            <Image style={styles.logo} source={images.logo} />
          </View>
          <View style={styles.formView}>
            <AppText
              label={strings.forgetPassword}
              size={'modest'}
              fontFamily={Montserrat.Bold}
              color={colors.blue}
            />
            <AppText
              label={strings.forgetPasswordSubText}
              fontFamily={Montserrat.Regular}
              color={colors.black}
              textStyles={{marginBottom: moderateHeight(3)}}
            />
            <AuthInput
              icon={
                <Icon
                  name="person-outline"
                  size={moderateScale(25)}
                  color={colors.darkGrey}
                />
              }
              placeholder={strings.userId}
              onChangeText={userId => {
                setuserId(userId);
                setuserIdError(false);
              }}
              onSubmitEditing={() =>
                userIdInputRef.current && userIdInputRef.current.focus()
              }
              error={userIdError}
            />

            <AuthInput
              icon={
                <Icon
                  name="mail-outline"
                  size={moderateScale(25)}
                  color={colors.darkGrey}
                />
              }
              placeholder={strings.email}
              onChangeText={email => {
                setEmail(email);
                setEmailError(false);
              }}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
              ref={userIdInputRef}
              error={emailError}
            />

            <CustomButton
              title={strings.continue}
              onPress={handleSubmitPress}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Image style={styles.background} source={images.bgBottom} />
      {loginResponse?.isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  backContainer: {
    position: 'absolute',
    top: globalStyles.statusBarMargin,
    left: moderateWidth(5),
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -5,
  },
  formView: {
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 30,
  },

  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    borderBottomLeftRadius: moderateScale(50),
    borderBottomRightRadius: moderateScale(50),
    paddingVertical: moderateHeight(5),
  },
  logo: {
    height: moderateScale(200),
    width: moderateScale(200),
    resizeMode: 'contain',
  },
});

export default ForgetPassword;
