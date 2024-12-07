// import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {forwardRef} from 'react';
// import AppText from './AppText';
// import {Montserrat} from '../themes/fonts';
// import colors from '../themes/colors';
// import {moderateScale, moderateWidth} from '../utils/responsive';

// const HorizontalSelector = forwardRef(
//   ({selected, data, onSelect, selectionColor, containerStyle}, ref) => {
//     return (
//       <FlatList
//         ref={ref}
//         style={[styles.container, containerStyle && containerStyle]}
//         contentContainerStyle={styles.contentContainer}
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         data={data}
//         ItemSeparatorComponent={() => <View style={styles.divider} />}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() => onSelect(item)}
//             style={[
//               styles.item,
//               selected?.id == item?.id && styles.selectedItem,
//               selected?.id == item?.id &&
//                 selectionColor && {backgroundColor: selectionColor},
//             ]}>
//             <AppText
//               label={item?.title}
//               fontFamily={Montserrat.Bold}
//               color={selected?.id == item?.id ? colors.white : colors.black}
//               size={'extraSmall'}
//             />
//           </TouchableOpacity>
//         )}
//       />
//     );
//   },
// );

// export default HorizontalSelector;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.lighterGrey,
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(4),
//   },
//   contentContainer: {paddingHorizontal: moderateWidth(3)},
//   divider: {width: moderateWidth(3)},
//   item: {
//     paddingVertical: moderateScale(10),
//     borderRadius: moderateScale(4),
//   },
//   selectedItem: {
//     backgroundColor: colors.darkBlue,
//     paddingHorizontal: moderateScale(4),
//     elevation: 5,
//   },
// });




import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {forwardRef} from 'react';
import AppText from './AppText';
import {Montserrat} from '../themes/fonts';
import colors from '../themes/colors';
import {moderateScale, moderateWidth} from '../utils/responsive';

const ITEM_WIDTH = 100; // Replace this with the actual width of your items.

const HorizontalSelector = forwardRef(
  ({selected, data, onSelect, selectionColor, containerStyle}, ref) => {
    return (
      <FlatList
        ref={ref}
        style={[styles.container, containerStyle && containerStyle]}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[
              styles.item,
              selected?.id == item?.id && styles.selectedItem,
              selected?.id == item?.id &&
                selectionColor && {backgroundColor: selectionColor},
            ]}>
            <AppText
              label={item?.title}
              fontFamily={Montserrat.Bold}
              color={selected?.id == item?.id ? colors.white : colors.black}
              size={'extraSmall'}
            />
          </TouchableOpacity>
        )}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        onScrollToIndexFailed={({index}) => {
          setTimeout(() => {
            ref?.current?.scrollToIndex({index, animated: true});
          }, 500);
        }}
      />
    );
  },
);

export default HorizontalSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighterGrey,
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  contentContainer: {paddingHorizontal: moderateWidth(3)},
  divider: {width: moderateWidth(3)},
  item: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(4),
  },
  selectedItem: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: moderateScale(4),
    elevation: 5,
  },
});

