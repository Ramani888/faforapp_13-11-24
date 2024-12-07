import {Dimensions, PixelRatio} from 'react-native';

// Getting currunt screen width and height
const {width, height} = Dimensions.get('window');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Scalling function according to screen width and guide line width
const scale = size => (width / guidelineBaseWidth) * size;
// Scalling function according to screen height and guide line height
const verticalScale = size => (height / guidelineBaseHeight) * size;
// Scalling function according to factor and scale function
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
// Scalling function according to width and pixel ratio
const moderateWidth = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};
// Scalling function according to height and pixel ratio
const moderateHeight = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

export {scale, verticalScale, moderateScale, moderateWidth, moderateHeight};
