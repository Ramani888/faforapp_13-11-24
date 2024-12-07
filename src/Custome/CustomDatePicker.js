import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {scale} from 'react-native-size-matters';
import colors from '../themes/colors';
import AppText from '../components/AppText'; // Custom text component
import {moderateScale, verticalScale} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import CustomeButton from './CustomeButton';

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  placeholder,
  buttonStyle,
  buttonTextStyle,
  errors,
  touched,
}) => {
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(selectedDate || new Date());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    setSelectedDate(date);
    toggleModal();
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleModal}>
        <AppText
          label={selectedDate ? selectedDate.toDateString() : placeholder}
          style={[styles.buttonText, buttonTextStyle]}
          fontFamily={Montserrat.SemiBold}
          size={'small'}
          textStyles={{marginLeft:scale(-5)}}
        />
      </TouchableOpacity>
      {errors && touched && (
        <View style={styles.viewError}>
          <Text style={styles.textError}>{errors}</Text>
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor:
                colorScheme === 'dark' ? colors.grey : colors.white,
            },
          ]}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            locale="en"
            textColor={colorScheme === 'dark' ? colors.white : colors.black}
            backgroundColor={
              colorScheme === 'dark' ? colors.grey : colors.white
            }
            dividerColor={colorScheme === 'dark' ? colors.white : colors.black}
            style={{borderRadius: scale(10)}}
          />
          <CustomeButton
            buttoncolor={colors.black}
            buttonwidth={'100%'}
            buttonheight={verticalScale(35)}
            borderRadius={scale(10)}
            title={'Confirm'}
            fontcolor={colors.white}
            fontSize={scale(14)}
            fontFamily={Montserrat.SemiBold}
            elevation={scale(10)}
            alignSelf={'center'}
            marginTop={verticalScale(5)}
            onPress={handleConfirm}
          />
        </View>
      </Modal>
    </>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  button: {
    height: scale(45),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingHorizontal: scale(15),
  },
  buttonText: {
    color: colors.black,
    fontSize: scale(16),
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    alignSelf: 'center',
  },
  modalContent: {
    borderRadius: scale(10),
    padding: scale(10),
    // width: scale(220),
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: scale(20),
    backgroundColor: colors.primary,
    borderRadius: scale(5),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: scale(16),
  },
  viewError: {
    marginVertical: verticalScale(2),
    marginLeft: scale(-5),
  },
  textError: {
    fontSize: moderateScale(10),
    color: colors.red,
    paddingLeft: scale(5),
    fontFamily: Montserrat.Regular,
  },
});
