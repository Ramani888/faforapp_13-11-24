import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../themes/globalStyles';
import { moderateHeight, scale } from '../../utils/responsive';

const BalancetransferScreen = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [refreshData, setrefreshData] = useState(true);
  useEffect(() => {
    getUserDetail();
  }, [refreshData]);

  const [errortext, setErrortext] = useState('');
  const [userId, setuserId] = useState('');
  const [transferAmount, settransferAmount] = useState('');
  const [txnPassword, settxnPassword] = useState('');

  const userIdRef = createRef();
  const transferAmountRef = createRef();
  const txnPasswordRef = createRef();

  const [userIdError, setuserIdError] = useState(false);
  const [transferAmountError, settransferAmountError] = useState(false);
  const [txnPasswordError, settxnPasswordError] = useState(false);

  const getUserDetail = async () => {
    //const self_id = await AsyncStorage.getItem('user_id');
    const self_id = global.userData?.self_id;
    if (self_id != '') {
      const data = {
        self_id: self_id,
      };
      axios
        .post('https://robinjoseph.org/fafor3.0/app/api/getUserDetailBySelfId', data)
        .then(async res => {
          if (res.data.response == 200) {
            setrefreshData(false);
            setUserData(res.data.info);
          } else {
            //console.log(res.data.info);
          }
        });
    }
  };

  const handleSubmitPress = async () => {
    var self_id = await AsyncStorage.getItem('user_id');
    //const baseUrl = 'https://robinjoseph.org/fafor3.0/app/api/cashoutRequest';
    return new Promise(function (resolve) {
      setErrortext('');
      if (!userId) {
        setuserIdError(true);
      }
      if (!transferAmount) {
        settransferAmountError(true);
      }
      if (!txnPassword) {
        settxnPassword(true);
      }
      if (userId != '' && transferAmount != '' && txnPassword != '') {
        const data = {
          id: userData.id,
          user_id: userId,
          amount: transferAmount,
          txn_pass: txnPassword,
        };
        axios
          .post('https://robinjoseph.org/fafor3.0/app/api/balanceTransferRequest', data)
          .then(res => {
            if (res.data.response == '200') {
              alert(res.data.msg);
              setrefreshData(true);
              setuserId('')
              settransferAmount('')
              settxnPassword('')
              navigation.navigate('BalancetransferScreen');
            } else {
              alert(res.data.msg);
            }
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.dashContainer}>
          <View style={styles.balanceView}>
            <View style={styles.balanceContView}>
              <View style={styles.balanceSecondCol}>
                <Text style={styles.walletText}>N {userData.balance}</Text>
                <Text style={styles.walletAmt}>Available Balance</Text>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.formGroup}>
              <Text style={styles.label}>User ID to transfer</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={userId => {
                  setuserId(userId);
                  setuserIdError(false);
                }}
                placeholder="Transfer User ID"
                placeholderTextColor="#000"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() =>
                  userIdRef.current && userIdRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.errorcontainer}>
              {userIdError == true ? (
                <Text style={styles.errortext}>* User ID Is Required.</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Transfer Amount</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={transferAmount => {
                  settransferAmount(transferAmount);
                  settransferAmountError(false);
                }}
                placeholder="Transfer Amount"
                keyboardType="numeric"
                placeholderTextColor="#000"
                returnKeyType="next"
                onSubmitEditing={() =>
                  transferAmountRef.current && transferAmountRef.current.focus()
                }
                ref={userIdRef}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.errorcontainer}>
              {transferAmountError == true ? (
                <Text style={styles.errortext}>
                  * Transfer Amount Is Required.
                </Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Transaction Password</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={txnPassword => {
                  settxnPassword(txnPassword);
                  settxnPasswordError(false);
                }}
                placeholder="Transaction Password"
                keyboardType="default"
                placeholderTextColor="#000"
                returnKeyType="next"
                ref={transferAmountRef}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.errorcontainer}>
              {transferAmountError == true ? (
                <Text style={styles.errortext}>
                  * Transaction Password Is Required.
                </Text>
              ) : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: globalStyles.statusBarMargin,
  },

  dashContainer: {
    paddingLeft: 23,
    paddingRight: 30,
  },
  balanceView: {
    backgroundColor: '#25bfb7',
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 20,
    height:moderateHeight(23),
    width:scale(310),
    alignItems:'center',justifyContent:'center'
  },
  balanceContView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 3,
  },

  walletText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  walletAmt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    margin: 'auto',
  },
  walletAmt2: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    width: '80%',
    margin: 'auto',
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  textInput: {
    color: '#333',
    backgroundColor: '#dbdfeb',
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30,
    marginVertical: 10,
    borderRadius: 15,
    width:scale(310)
  },
  formGroup: {
    marginTop: 10,
  },
  errorcontainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  errortext: {
    color: 'red',
  },
  button: {
    backgroundColor: '#25bfb7',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BalancetransferScreen;
