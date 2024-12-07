import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import RenderHTML from "react-native-render-html";
import axiosInstance from "../../utils/axiosInstance";
import apiRoutes from "../../constants/apiRoutes";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";
import colors from "../../themes/colors";

const Announcement = () => {
  const screenWidth = Dimensions.get("window").width;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    getAnnounceData();
  }, []);

  const tagsStyles = {
    h3: {
      fontSize: scale(21),
      fontWeight: "bold",
      color: "#333333",
      marginBottom: verticalScale(10),
    },
    ul: {
      paddingLeft: scale(20),
      marginBottom: verticalScale(10),
    },
    li: {
      fontSize: moderateScale(16),
      color: colors.black,
      marginBottom: verticalScale(8),
    },
    strong: {
      fontWeight: "bold",
      color: "#000000",
    },
    img: {
      width: "350px", // Make the image take up the full width of its container
      height: "200px", // Maintain aspect ratio
      marginVertical: verticalScale(10), // Optional: Add some margin
      resizeMode: "contain", // Ensure the image scales correctly
    },
  };

  const classesStyles = {
    "a-list-item": {
      fontSize: moderateScale(16),
      color: "#444444",
    },
  };

  const getAnnounceData = async () => {
    try {
      setVisible(true);
      const response = await axiosInstance.post(apiRoutes.getAnnouncement, {
        stockist_country: global.userData.stockist_country,
      });
      console.log("res", response?.data?.info);
      const dataArray = Object.keys(response?.data?.info)
        .filter((key) => key !== "img_path")
        .map((key) => response?.data?.info[key]);

      console.log("dataArray", dataArray);
      setData(dataArray);
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.img_path }} style={styles.image} resizeMode='contain'/>

        <Text style={styles.title}>Detail:</Text>
        <Text style={styles.detailText}>
          {item.detail.replace(/<\/?[^>]+(>|$)/g, "") /* Remove HTML tags */}
        </Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL(item.video_link)}
        >
          <Text style={styles.linkText}>Watch Video</Text>
        </TouchableOpacity>

        <Text style={styles.dateText}>Created At: {item.created_at}</Text>
      </View>
    );
  };

  return (
    <View style={{marginTop:verticalScale(10)}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.banner_id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: verticalScale(20),
  },
  listContainer: {
    paddingHorizontal: verticalScale(10),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: scale(10),
    marginBottom: verticalScale(20),
    padding: scale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: scale(5),
  },
  image: {
    width: "100%",
    height: verticalScale(250),
    borderRadius: scale(10),
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#333",
    marginBottom: verticalScale(10),
  },
  detailText: {
    fontSize: moderateScale(14),
    color: "#666",
    marginBottom: verticalScale(15),
    lineHeight: verticalScale(20),
  },
  linkButton: {
    backgroundColor: colors.theme1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: scale(5),
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  linkText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  dateText: {
    fontSize: moderateScale(12),
    color: "#999",
    marginTop: verticalScale(5),
  },
});

export default Announcement;
