import { View , StyleSheet, Image, ScrollView, Text, TouchableOpacity,KeyboardAvoidingView, TextInput, FlatList } from 'react-native';
import React,{ useEffect, useState, createRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StockistbonusScreen = () => {
    const [userData, setUserData] = useState('');
    const [listData, setListData] = useState('');
    const [refreshData, setrefreshData] = useState(true);
    useEffect(() => {
        getUserDetail();
        getStockistBonusHistory();
    },[refreshData]);

    const getUserDetail = async () => {
        const self_id = await AsyncStorage.getItem('user_id');
        if(self_id != ''){
            const data = {
                self_id:self_id,
            };
            axios.post('https://robinjoseph.org/app/api/getUserDetailBySelfId',data).then(async res => {
                if(res.data.response == 200){
                    setrefreshData(false);
                    setUserData(res.data.info);
                }else{
                    //console.log(res.data.info);
                }
                
            });
        }    
    };

    const getStockistBonusHistory = async () => {
        const self_id = await AsyncStorage.getItem('user_id');
        if(self_id != ''){
            const data = {
                selfid:self_id,
            };
            axios.post('https://robinjoseph.org/app/api/getStockistRetailHistory',data).then(async res => {
                if(res.data.response == 200){
                    setrefreshData(false);
                    setListData(res.data.info);
                }else{
                    //console.log(res.data.info);
                }
                
            });
        } 
    }

    const renderItem = ({ item }) => (
        <View style={styles.cardView}>
            <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Order Type :</Text>
                <Text style={styles.cardText}>{item.order_type}</Text>
            </View>
            <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Amount :</Text>
                <Text style={styles.cardText}>{item.bonus_amount}</Text>
            </View>
            <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Date :</Text>
                <Text style={styles.cardText}>{item.ad_date}</Text>
            </View>
        </View>
    );


    return(
        <View style={styles.container}>
            <View style={styles.dashContainer}>
                <View>
                    <Text style={styles.pageHeading}>Stockist Retail History</Text>
                </View>
                <View style={styles.listView}>
                    <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={item => item.sr_no}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f1f1f1',
    },
    listView:{
        marginBottom:30,
        paddingBottom:30,
    },
    dashContainer:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:15,
    },
    pageHeading:{
        textAlign:'center',
        fontSize:27,
        color:'#000',
        fontWeight:'bold',
        marginBottom:15,
    },
    cardView:{
        marginBottom:20, 
        backgroundColor:'#fff',
        padding:15,
        borderRadius:10,
    },
    cardTextView:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardText:{
        width:'50%',
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
    },
})

export default StockistbonusScreen;