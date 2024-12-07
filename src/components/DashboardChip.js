import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../themes/colors";
import { Montserrat } from "../themes/fonts";
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from "../utils/responsive";

const DashboardChip = ({ title, value, bgColor, textColor, chipWidth }) => {
  return (
    <View
      style={[
        styles.container,
        chipWidth && { width: chipWidth },
        bgColor && { backgroundColor: bgColor },
      ]}
    >
      <AppText
        label={title}
        fontFamily={Montserrat.Regular}
        size={"tiny"}
        color={textColor ? textColor : colors.black}
      />
      <AppText
        label={value}
        size={"small"}
        fontFamily={Montserrat.Bold}
        color={textColor ? textColor : colors.black}
      />
    </View>
  );
};

export default DashboardChip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateHeight(1),
    paddingLeft: moderateWidth(3),
    width: moderateWidth(29),
    borderRadius: moderateScale(5),
    elevation: 3,
    marginBottom: moderateHeight(1.2),
  },
});
