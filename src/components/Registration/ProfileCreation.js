import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../themes/colors';
import {scale, verticalScale} from '../../utils/responsive';
import {Montserrat} from '../../themes/fonts';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomeInputField from '../../Custome/CustomeInputField';
import CustomDropDown from '../CustomDropDown';
import CustomeButton from '../../Custome/CustomeButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomeButtonView from '../../Custome/CustomeButtonView';
import CustomDatePicker from '../../Custome/CustomDatePicker';
import axiosInstanceForBussiness from '../../utils/axiosInstanceForBussiness';
import apiRoutes from '../../constants/apiRoutes';
import ContactDetail from '../profileCreation/ContactDetail';
import CorrespondensAddress from '../profileCreation/CorrespondensAddress';
import ShippingAddress from '../profileCreation/ShippingAddress';
import AccountDetail from '../profileCreation/AccountDetail';
import PaymentDetail from '../profileCreation/PaymentDetail';
import showMessageonTheScreen from '../showMessageonTheScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userData = [
  {title: 'UserName1'},
  {title: 'UserName2'},
  {title: 'UserName3'},
];
const GenderData = [{title: 'Male'}, {title: 'Female'}];

const ProfileCreation = ({
  previousStep,
  nextStep,
  currentPosition,
  labels,
  previousData,
}) => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNameStatus, setUserNameStatus] = useState();
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [shippingAddressLine2, setShippingAddressLine2] = useState('');
  const [selectedShippingState, setSelectedShippingState] = useState('');
  const [bitcoinWalletCode, setBitcoinWalletCode] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    getStateByCountry();
    getInitialProfileData();
  }, []);

  useEffect(() => {
    setUserName(previousData.userName);
    setAddressLine2(previousData.addressLine2);
    setShippingAddressLine2(previousData.shippingAddressLine2);
    setBitcoinWalletCode(previousData.bitcoinWalletCode);
    setPaypalEmail(previousData.paypalEmail);
  }, [previousData]);

  const getInitialProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('profileData');
      setInitialData(JSON.parse(data));
    } catch (error) {
      console.log('error in get stored data', error);
    }
  };

  // ==================================== Api ================================== //

  const checkUserName = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.checkUsername}`,
        {
          username: userName,
        },
      );
      if (Number(response.data.status) === 400) {
        setUserName('');
      }
      setUserNameStatus(Number(response.data.status));
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  const getStateByCountry = async () => {
    try {
      setVisible(true);
      const response = await axiosInstanceForBussiness.post(
        `${apiRoutes.businessRegistration}/${apiRoutes.getStateByCountry}`,
        {
          country_id: global.countryId,
        },
      );
      setStateData(response?.data?.info);
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setVisible(false);
    }
  };

  // ==================================== End ================================== //

  const validationSchema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    gender: yup.string().required('Gender is required'),
    dateOfBirth: yup.date().required('Date of Birth is required').nullable(),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      // )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    email: yup
      .string()
      .email('Please enter valid email address to receive login password')
      .required('Email is required'),
    mobileNo: yup
      .string()
      // .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    addressLine1: yup.string().required('Address Line 1 is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    shippingAddressLine1: yup
      .string()
      .required('Shipping Address Line 1 is required'),
    shippingCity: yup.string().required('Shipping City is required'),
    shippingState: yup.string().required('Shipping State is required'),
    ifscCode: yup
      .string()
      // .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code')
      .required('IFSC Code is required'),
    bankName: yup.string().required('Bank Name is required'),
    branchName: yup.string().required('Branch Name is required'),
    accountNumber: yup
      .string()
      // .matches(/^[0-9]{9,18}$/, 'Account Number must be 9 to 18 digits')
      .required('Account Number is required'),
    accountName: yup.string().required('Account Name is required'),
  });

  // const handleUserName = useCallback(value => {
  //   setUserName(value);
  //   checkUserName();
  // }, []);

  const handleUserName = () => {
    checkUserName();
  }

  const handleGenderSelect = option => {
    setSelectedGender(option);
  };

  const handleStateSelect = option => {
    setSelectedState(option);
  };

  const handleShippingStateSelect = option => {
    setSelectedShippingState(option);
  };

  const memoizedDropdown = useMemo(
    () => (
      <CustomeInputField
        placeholder={'Enter Username'}
        onChangeText={setUserName}
        onBlur={handleUserName}
        value={userName}
        borderColor={colors.theme1}
        borderWidth={scale(1)}
        borderRadius={scale(10)}
        width={'100%'}
        textInputStyle={{paddingBottom: verticalScale(8)}}
        MainWidth={'100%'}
        height={verticalScale(40)}
        placeholderTextColor={colors.darkGrey}
        color={colors.black}
        inputWidth={'100%'}
        aliginCenter={true}
        textAlign={'center'}
        fontFamily={Montserrat.SemiBold}
        errors={userNameStatus === 400 && 'Username Already Used. Choose Another.'}
        touched={userNameStatus === 400 && 'Username Already Used. Choose Another.'}
      />
    ),
    [userName, userNameStatus],
  );

  const renderForm = useCallback(
    () => (
      <Formik
        initialValues={{
          name: previousData?.name || '',
          gender: previousData?.gender || '',
          dateOfBirth: previousData?.dateOfBirth || '',
          password: previousData?.password || '',
          confirmPassword: previousData?.confirmPassword || '',
          email: previousData?.email || '',
          mobileNo: previousData?.mobileNo || '',
          addressLine1: previousData?.addressLine1 || '',
          city: previousData?.city || '',
          state: previousData?.state || '',
          shippingAddressLine1: previousData?.shippingAddressLine1 || '',
          shippingCity: previousData?.shippingCity || '',
          shippingState: previousData?.shippingState || '',
          ifscCode: previousData?.ifscCode || '',
          bankName: previousData?.bankName || '',
          branchName: previousData?.branchName || '',
          accountNumber: previousData?.accountNumber || '',
          accountName: previousData?.accountName || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          global.name = values.name;
          global.gender = selectedGender;
          global.dateOfBirth = selectedDate;
          global.password = values.password;
          global.confirmPassword = values.confirmPassword;
          global.email = values.email;
          global.mobileNo = values.mobileNo;
          global.addressLine1 = values.addressLine1;
          global.addressLine2 = addressLine2;
          global.city = values.city;
          global.state = values.state;
          global.shippingAddressLine1 = values.shippingAddressLine1;
          global.shippingAddressLine2 = shippingAddressLine2;
          global.shippingCity = values.shippingCity;
          global.shippingState = values.shippingState;
          global.ifscCode = values.ifscCode;
          global.bankName = values.bankName;
          global.branchName = values.branchName;
          global.accountNumber = values.accountNumber;
          global.accountName = values.accountName;
          global.bitcoinWalletCode = bitcoinWalletCode;
          global.paypalEmail = paypalEmail;
          if (userName) {
            values.userName = userName;
            values.addressLine2 = addressLine2;
            values.shippingAddressLine2 = shippingAddressLine2;
            values.bitcoinWalletCode = bitcoinWalletCode;
            values.paypalEmail = paypalEmail;
            nextStep(values, 'profileScreen');
            global.userName = userName;
          } else {
            showMessageonTheScreen('UserName is required');
          }
        }}>
        {({
          errors,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.formView}>
            <View>
              <Text style={styles.label}>Full Name*</Text>
              <CustomeInputField
                placeholder={'Enter name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                touched={touched.name}
                errors={errors.name}
                borderBottomWidth={scale(0.7)}
                borderBottomColor={colors.darkerGrey}
                width={'100%'}
                placeholderTextColor={colors.darkGray}
                color={colors.black}
                inputWidth={'90%'}
              />
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <Text style={styles.label}>Gender*</Text>
              <CustomDropDown
                placeholder="Select Gender"
                data={GenderData}
                // onSelect={selectedItem =>
                //   setFieldValue('gender', selectedItem.title)
                  
                // }
                onSelect={(selectedItem) => {
                  setFieldValue('gender', selectedItem.title);
                  setSelectedGender(selectedItem.title)
                }}
                selected={values.gender}
                labelKey={'title'}
                buttonStyle={styles.dropdownButtonStyle1}
                buttonTextStyle={styles.dropdownButtonText}
                arrowStyle={styles.dropdownArrow}
                menuStyle={styles.dropdownMenu}
                itemStyle={styles.dropdownItem}
                selectedItemStyle={styles.selectedItem}
                placeholderStyle={[
                  styles.placeholder,
                  styles.placeholderOffset,
                ]}
                textAlign={'left'}
                errors={errors.gender}
                touched={touched.gender}
              />
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <Text style={styles.label}>Date of Birth*</Text>

              <CustomDatePicker
                selectedDate={values.dateOfBirth}
                // setSelectedDate={value => setFieldValue('dateOfBirth', value)}
                setSelectedDate={(value) => {
                  setFieldValue('dateOfBirth', value)
                  setSelectedDate(value)
                }}
                placeholder="Select a date"
                buttonStyle={styles.datePickerStyle}
                buttonTextStyle={styles.dropdownButtonText}
                errors={errors.dateOfBirth}
                touched={touched.dateOfBirth}
              />
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <Text style={styles.label}>Password*</Text>
              <CustomeInputField
                placeholder={'Enter Password'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                touched={touched.password}
                errors={errors.password}
                borderBottomWidth={scale(0.7)}
                borderBottomColor={colors.darkerGrey}
                width={'100%'}
                secureTextEntry={true}
                placeholderTextColor={colors.darkGray}
                color={colors.black}
                inputWidth={'90%'}
              />
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <Text style={styles.label}>Confirm Password*</Text>
              <CustomeInputField
                placeholder={'Enter Password'}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                touched={touched.confirmPassword}
                errors={errors.confirmPassword}
                borderBottomWidth={scale(0.7)}
                borderBottomColor={colors.darkerGrey}
                width={'100%'}
                secureTextEntry={true}
                placeholderTextColor={colors.darkGray}
                color={colors.black}
                inputWidth={'90%'}
              />
            </View>

            <ContactDetail
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
            />

            <CorrespondensAddress
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              setAddressLine2={setAddressLine2}
              addressLine2={addressLine2}
              stateData={stateData}
              handleStateSelect={handleStateSelect}
              selectedState={selectedState}
            />

            <ShippingAddress
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              setAddressLine2={setShippingAddressLine2}
              addressLine2={shippingAddressLine2}
              stateData={stateData}
              handleStateSelect={handleShippingStateSelect}
              selectedState={selectedShippingState}
            />

            <AccountDetail
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
            />

            <PaymentDetail
              setBitcoinWalletCode={setBitcoinWalletCode}
              bitcoinWalletCode={bitcoinWalletCode}
              setPaypalEmail={setPaypalEmail}
              paypalEmail={paypalEmail}
            />

            <View style={styles.buttonView}>
              <CustomeButtonView
                previousStep={previousStep}
                nextStep={handleSubmit}
                currentPosition={currentPosition}
                labels={labels}
                previous={true}
                next={true}
              />
            </View>

            <Text style={styles.noteContainer}>
              <Text style={styles.noteText}>Note: </Text>
              <Text style={styles.secondText}>
                Please Do Only 1 Registration At a Time, Don't Login To 2
                Accounts At Once On The Same Device
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    ),
    [validationSchema],
  );

  const renderBody = () => (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.dropdownContainer}>
        {memoizedDropdown}
        {/* {userNameStatus && userNameStatus !== 200 && userName && (
          <Text
            style={{
              fontSize: scale(12),
              color: colors.red,
              fontFamily: Montserrat.Regular,
              textAlign: 'center',
              paddingTop: verticalScale(5),
            }}>
            Don't use any special character{' '}
          </Text>
        )} */}
      </View>
      <View style={[styles.dropdownContainer, {marginTop: verticalScale(10)}]}>
        <Text style={[styles.title, styles.heading]}>Personal Detail</Text>
        {renderForm()}
      </View>
    </View>
  );

  return <ScrollView style={styles.container}>{renderBody()}</ScrollView>;
};

export default ProfileCreation;

const styles = StyleSheet.create({
  bodyContainer: {
    container: {flex: 1},
    flex: 1,
    margin: scale(15),
    marginBottom: scale(5),
  },
  title: {
    fontSize: scale(14),
    color: colors.black,
    fontFamily: Montserrat.Bold,
    paddingLeft: scale(20),
  },
  heading: {
    paddingLeft: 0,
    paddingBottom: verticalScale(10),
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    padding: scale(12),
    elevation: scale(5),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(7),
    borderRadius: scale(10),
  },
  label: {
    fontSize: scale(12),
    color: colors.darkGrey,
  },
  formView: {
    // add styles for formView if needed
  },
  dropdownButtonStyle: {
    borderWidth: scale(1),
    borderColor: colors.theme1,
    borderRadius: scale(10),
  },
  dropdownButtonStyle1: {
    backgroundColor: colors.lighterGrey,
    height: verticalScale(35),
    marginTop: verticalScale(10),
  },
  datePickerStyle: {
    backgroundColor: colors.lighterGrey,
    height: verticalScale(35),
    marginTop: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dropdownButtonText: {
    color: colors.black,
    textAlign: 'left',
  },
  dropdownArrow: {
    color: colors.black,
  },
  dropdownMenu: {
    // backgroundColor: colors.lightBlue,
  },
  dropdownItem: {
    paddingVertical: verticalScale(10),
  },
  selectedItem: {
    backgroundColor: colors.screenColor,
  },
  dropdownLeftImage: {
    width: scale(50),
    height: scale(30),
  },
  placeholder: {
    color: colors.grey,
  },
  placeholderOffset: {
    marginLeft: scale(-20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
  },
  noteContainer: {
    marginHorizontal: scale(15),
    marginTop: verticalScale(10),
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
    marginBottom: verticalScale(20),
  },
});
