import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from '../utils/responsive';
import colors from '../themes/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for the eye icon

const CustomeInputField = ({
  placeholder,
  value,
  maxLength,
  onChangeText,
  secureTextEntry,
  editable,
  keyboardType,
  touched,
  errors,
  borderWidth,
  borderRadius,
  borderColor,
  borderBottomWidth,
  borderBottomColor,
  MainWidth,
  backgroundColor,
  width,
  height,
  placeholderTextColor,
  marginTop,
  marginBottom,
  marginLeft,
  marginHorizontal,
  color,
  inputWidth,
  textInputStyle,
  iconLeft,
  IconComponentName,
  iconName,
  iconSize,
  iconColor,
  iconRight,
  differentconRight,
  IconRightComponentName,
  iconRightName,
  iconRightSize,
  iconRightColor,
  textArea,
  textAlignVertical,
  textAlign,
  multiline,
  numberOfLines,
  fontFamily,
  onBlur,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        width: MainWidth,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}>
      <View
        style={{
          borderColor: errors && touched ? colors.red : borderColor,
          borderWidth: borderWidth,
          marginHorizontal: marginHorizontal,
          height: height,
          width: width,
          borderRadius: borderRadius,
          marginLeft: marginLeft,
          backgroundColor: backgroundColor,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: borderBottomWidth,
          borderBottomColor: borderBottomColor,
        }}>
        {iconLeft && (
          <IconComponentName
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{marginLeft: scale(10)}}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeText}
          style={
            textArea
              ? styles.textArea
              : [
                  styles.textInput,
                  textInputStyle,
                  {color: color, width: inputWidth, fontFamily: fontFamily},
                ]
          }
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          editable={editable}
          textAlignVertical={textAlignVertical}
          // textAlign={textAlign}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={onBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{marginRight: scale(10)}}>
            <FontAwesome
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={iconSize || 20}
              color={iconColor || colors.grey}
            />
          </TouchableOpacity>
        )}
        {iconRight && !secureTextEntry && (
          <IconComponentName
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{marginRight: scale(10)}}
          />
        )}
        {differentconRight && (
          <IconRightComponentName
            name={iconRightName}
            size={iconRightSize}
            color={iconRightColor}
            style={{marginRight: scale(10)}}
          />
        )}
      </View>
      {errors && touched && (
        <View style={styles.viewError}>
          <Text style={styles.textError}>{errors}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomeInputField;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: scale(12),
    paddingLeft: scale(5),
    paddingBottom: verticalScale(2),
    fontFamily: 'Montserrat-Regular',
    // textAlign: 'center',
  },
  viewError: {
    marginVertical: verticalScale(2),
    marginLeft: scale(-5),
  },
  textError: {
    fontSize: moderateScale(10),
    color: colors.red,
    paddingLeft: scale(5),
    fontFamily: 'Montserrat-Regular',
  },
  textArea: {
    color: colors.black,
    borderColor: 'gray',
    borderRadius: scale(8),
    fontSize: scale(14),
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(10),
    paddingBottom: scale(10),
  },
});
