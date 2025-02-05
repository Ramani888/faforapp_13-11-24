// import React, { createRef, useEffect, useState, useCallback } from "react";
// import {
//   Alert,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
//   FlatList,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import AppText from "../../components/AppText";
// import CustomeInputField from "../../Custome/CustomeInputField";
// import CustomeButton from "../../Custome/CustomeButton";
// import { Loader } from "../../components/Loader";
// import strings from "../../constants/strings";
// import { userLogin, userLoginClear } from "../../redux/slices/login";
// import colors from "../../themes/colors";
// import { Montserrat } from "../../themes/fonts";
// import images from "../../themes/images";
// import {
//   moderateHeight,
//   moderateScale,
//   scale,
//   verticalScale,
// } from "../../utils/responsive";
// import screens from "../../constants/screens";
// import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
// import axios from "axios";
// import FastImage from "react-native-fast-image";
// const CountryScreen = ({ navigation }) => {
//   const [listData, setListData] = useState("");
//   const [refreshData, setrefreshData] = useState(true);
//   useEffect(() => {
//     getCountry();
//   }, [refreshData]);

//   const getCountry = () => {
//     axios
//       .post("https://robinjoseph.org/fafor3.0/app/api/getCountry")
//       .then(async (res) => {
//         if (res.data.response == 200) {
//           setrefreshData(false);
//           setListData(res.data.info);
//         } else {
//           //console.log(res.data.info);
//         }
//       });
//   };

//   //console.log(listData);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.cardTextView}
//       onPress={() =>
//         navigation.navigate(screens.login, {
//           country_alias: item.country_alias,
//         })
//       }
//     >
//       <View>
//         <FastImage
//           style={{ marginTop: 3, height: 120, width: 175, resizeMode: "cover" }}
//           source={{ uri: item.country_flag}}
//         />
//       </View>
//       <Text style={styles.cardText}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.dashContainer}>
//         <View>
//           <Text style={styles.pageHeading}>
//             faforlife International Business
//           </Text>
//         </View>
//         <FlatList
//           data={listData}
//           numColumns={2}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.sr_no}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f1f1f1",
//     padding: 10,
//   },

//   dashContainer: {
//     paddingTop: 15,
//   },
//   pageHeading: {
//     textAlign: "center",
//     fontSize: 32,
//     color: "#000",
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 15,
//   },
//   cardView: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//   },
//   cardTextView: {
//     width: "50%",
//     marginLeft: 7,
//   },
//   cardText: {
//     width: "100%",
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
// });

// export default CountryScreen;



import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";
import screens from "../../constants/screens";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const CountryScreen = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      const res = await axios.post(
        "https://robinjoseph.org/fafor3.0/app/api/getCountry"
      );
      if (res.data.response == 200) {
        const countries = res.data.info;
        setListData(countries);

        // Prefetch images
        const imageUrls = countries.map((item) => ({
          uri: item.country_flag,
          priority: FastImage.priority.normal,
        }));
        FastImage.preload(imageUrls);
      } else {
        // Handle error
        console.error("Failed to fetch countries:", res.data.info);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.cardTextView}
        onPress={() =>
          navigation.navigate(screens.login, {
            country_alias: item.country_alias,
          })
        }
      >
        <FastImage
          style={styles.imageStyle}
          source={{
            uri: item.country_flag,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.sr_no.toString(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>faforlife International Business</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={listData}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={4}
          maxToRenderPerBatch={2}
          windowSize={5}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: 180,
            offset: 180 * index,
            index,
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: scale(10),
    paddingTop: verticalScale(35),
  },
  pageHeading: {
    textAlign: "center",
    fontSize: moderateScale(30),
    color: "#000",
    fontWeight: "bold",
    marginBottom: verticalScale(15),
  },
  loadingText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    color: "#000",
  },
  cardTextView: {
    flex: 1,
    margin: scale(7),
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: verticalScale(110),
    borderRadius: scale(10),
  },
  cardText: {
    fontSize: moderateScale(13),
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: verticalScale(7),
    marginBottom: verticalScale(5),
  },
});

export default CountryScreen;


