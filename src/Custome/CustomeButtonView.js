import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomeButton from './CustomeButton';
import colors from '../themes/colors';
import {scale, verticalScale} from '../utils/responsive';
import {Montserrat} from '../themes/fonts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Adjust the import path

const CustomeButtonView = ({
  handleSubmit,
  previousStep,
  nextStep,
  currentPosition,
  labels,
  previous,
  next,
  lastButtonTitle,
  buttonwidth,
  buttonContainerStyle
}) => {
  // Common button styles
  const baseButtonProps = {
    buttonheight: verticalScale(30),
    borderRadius: scale(5),
    fontcolor: colors.white,
    fontSize: scale(12),
    fontFamily: Montserrat.SemiBold,
    elevation: scale(10),
    marginHorizontal: scale(-15),
    alignSelf: 'center',
    marginTop: verticalScale(30),
    iconRight: true,
    IconComponentName: FontAwesome6,
    iconsize: scale(17),
    // paddingHorizontal: scale(10)
  };

  return (
    <View style={[styles.buttonContainer, buttonContainerStyle]}>
      {previous && (
        <CustomeButton
          {...baseButtonProps}
          buttoncolor={colors.pink}
          buttonwidth={buttonwidth ? buttonwidth : '53%'}
          title="Previous"
          iconname={'arrow-left-long'}
          iconcolor={colors.pink}
          onPress={previousStep}
          disabled={currentPosition === 0}
          position={'absolute'}
          left={0}
        />
      )}

      {next && (
        <CustomeButton
          {...baseButtonProps}
          buttoncolor={colors.theme1}
          buttonwidth={buttonwidth ? buttonwidth : '53%'}
          title={lastButtonTitle ? lastButtonTitle : 'Proceed'}
          iconname={'arrow-right-long'}
          iconcolor={colors.pink}
          onPress={handleSubmit ? handleSubmit : nextStep}
          disabled={currentPosition === labels.length}
          position={'absolute'}
          right={0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
  },
});

export default CustomeButtonView;
