import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../themes/globalStyles';
const SpendingwallethistoryScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.dashContainer}>
          <View>
            <Text style={styles.pageHeading}>Spending Wallet History</Text>
          </View>
          <View style={styles.cardView}>
            <View style={styles.cardTextView}>
              <Text style={styles.cardText}>Income :</Text>
              <Text style={styles.cardText}>FL123456</Text>
            </View>
            <View style={styles.cardTextView}>
              <Text style={styles.cardText}>Status :</Text>
              <Text style={styles.cardText}>1000</Text>
            </View>
            <View style={styles.cardTextView}>
              <Text style={styles.cardText}>Date :</Text>
              <Text style={styles.cardText}>20-Mar-2024</Text>
            </View>
          </View>
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
    paddingLeft: 30,
    paddingRight: 30,
  },
  pageHeading: {
    textAlign: 'center',
    fontSize: 27,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardView: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  cardTextView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardText: {
    width: '50%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SpendingwallethistoryScreen;
