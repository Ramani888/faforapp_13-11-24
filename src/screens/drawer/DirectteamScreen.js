import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import {Loader} from '../../components/Loader';
import Row from '../../components/Row';
import strings from '../../constants/strings';
import {
  getDirectTeamList,
  getDirectTeamListClear,
} from '../../redux/slices/getDirectTeamList';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../../utils/responsive';

const DirectteamScreen = () => {
  const [teamData, setTeamData] = useState([]);

  const dispatch = useDispatch();
  const directTeamListResponse = useSelector(state => state.getDirectTeamList);

  useEffect(() => {
    const data = {selfid: global.userData?.self_id};
    dispatch(getDirectTeamList(data));
  }, []);

  useEffect(() => {
    if (directTeamListResponse?.data) {
      setTeamData(directTeamListResponse?.data);
    }
    if (directTeamListResponse?.error) {
      Alert.alert(strings.faforlife, directTeamListResponse?.error);
      dispatch(getDirectTeamListClear());
    }
  }, [directTeamListResponse]);

  const renderItem = ({item}) => {
    return (
      <View>
        <Row
          title={strings.userId}
          value={item?.self_id}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.name}
          value={item?.name}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.mobileNo}
          value={item?.mobile}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.status}
          value={item?.pay_status}
          valueStyle={styles.valueStyle}
        />
        <Row
          title={strings.joiningDatePlain}
          value={item?.ad_date}
          valueStyle={styles.valueStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <Header title={strings.myTeam} hideAction />
      <View style={styles.container}>
        <FlatList
          data={teamData}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          contentContainerStyle={styles.innerContainer}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <HorizontalLine />}
        />
      </View>
      {directTeamListResponse?.isLoading && <Loader />}
    </View>
  );
};

export default DirectteamScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: globalStyles.statusBarMargin,
    paddingHorizontal: moderateWidth(4),
  },
  container: {
    marginTop: moderateScale(20),
    backgroundColor: colors.white,
    borderRadius: moderateScale(25),
    height: moderateHeight(80),
  },
  flatList: {marginTop: moderateScale(20)},
  innerContainer: {
    paddingHorizontal: moderateWidth(5),
    paddingBottom: moderateScale(20),
  },
  valueStyle: {flex: 1},
});
