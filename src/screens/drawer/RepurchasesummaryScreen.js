import React, {createRef, useEffect, useState, useCallback} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../../components/AppText';
import CustomeInputField from '../../Custome/CustomeInputField';
import CustomeButton from '../../Custome/CustomeButton';
import {Loader} from '../../components/Loader';
import strings from '../../constants/strings';
import {userLogin, userLoginClear} from '../../redux/slices/login';
import colors from '../../themes/colors';
import {Montserrat} from '../../themes/fonts';
import images from '../../themes/images';
import {moderateHeight, moderateScale, scale, verticalScale} from '../../utils/responsive';
import screens from '../../constants/screens';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
const RepurchasesummaryScreen = ({navigation}) => {
    const [listData, setListData] = useState('');
    const [refreshData, setrefreshData] = useState(true);
    useEffect(() => {
        getCountry();
    },[refreshData]);

    const getCountry = () => {
        axios.post('https://robinjoseph.org/fafor3.0/app/api/getCountry').then(async res => {
            if(res.data.response == 200){
                setrefreshData(false);
                setListData(res.data.info);
            }else{
                //console.log(res.data.info);
            }
            
        });
    };

    //console.log(listData);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
        style={styles.cardTextView}
        onPress={() => navigation.navigate(screens.login,{country_alias:item.country_alias})}
        >
            <View>
                <Image style={{marginTop:3,height:120,width:175,resizeMode:'cover'}} source={{uri:item.country_flag}}/>
            </View>
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return(
        <View style={styles.container}>
            <View style={styles.dashContainer}>
                <View>
                    <Text style={styles.pageHeading}>faforlife International Business</Text>
                </View>
                <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => item.sr_no}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f1f1f1',
        padding:10,
    },
    
    dashContainer:{
        paddingTop:15,
    },
    pageHeading:{
        textAlign:'center',
        fontSize:32,
        color:'#000',
        fontWeight:'bold',
        marginTop:20,
        marginBottom:15,
    },
    cardView:{
        marginBottom:20, 
        backgroundColor:'#fff',
        padding:15,
        borderRadius:10,
    },
    cardTextView:{
        width:'50%',
        marginLeft:7,
    },
    cardText:{
        width:'100%',
        fontSize:13,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
        marginTop:10,
        marginBottom:10,
    },
})

export default RepurchasesummaryScreen;