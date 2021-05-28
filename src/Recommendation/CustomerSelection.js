import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {primaryColor} from '../styles/variables';

import http from '../http';
import {createStackNavigator} from 'react-navigation';
import StackHeader from '../components/Header/StackHeader';

export default CustomerSelection = props => {
  let cust = '';
  let Collection = {};
  const [textChangeId, setTextChangeId] = useState('');
  const [CollectionData, setCollectionData] = useState('');
  const [customerData, setCustomerData] = useState('');
  const [CustomerId, setCustomerId] = useState('');
  const [SelectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedITems] = useState([]);

  const prodid = props.navigation.getParam('id');
  const type = props.navigation.getParam('type');
  const Idd = props.navigation.getParam('sendId');
  const Typee = props.navigation.getParam('sendType');

  useEffect(() => {
    console.log('cust', cust);
  }, [cust]);
  useEffect(() => {
    fetchCustomer();
  }, [textChangeId]);

  const makingData = () => {
    // setSelectedCustomer(nme);
    // setCustomerId(Id);
    // console.log(Id);
    // Collection = [];
    console.log('SELECTED ITEMS', selectedItems);
    Collection = {
      products: [Idd],
      customers: [selectedItems],
      pushtype: Typee,
    };
    setCollectionData(Collection);
    // console.log('COLLECTION DATA', CollectionData);
  };

  const fetchCustomer = () => {
    http
      .get(`customer/getCustomersList&filter_name=${textChangeId}`) //${textId}
      .then(res => {
        // console.log('CUSTOMER List', res);
        setCustomerData(res);
      })
      .catch(error => {
        console.log('ERROR CUSTOMER', error);
      });
  };

  const postingRecommendation = () => {
    makingData();
    console.log('Colect', CollectionData);
    http
      .post('product/pushToCustomer', CollectionData)
      .then(res => {
        console.log('RESOLVE', res);
        ToastAndroid.show('Data sent.', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log('Error of posting', error);
      });
    props.navigation.navigate('Recommend');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StackHeader
        title={'Customer Selection'}
        navigation={props.navigation}
        justifyContent={'flex-start'}
        thankyou={false}
        mycart={false}
        wishList={false}
      />
      {/* <Text>{prodid}</Text> */}
      <View
        style={{
          width: '100%',
          height: '5%',
          backgroundColor: primaryColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Push to Customer </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text>Select Customer</Text>
        <Fragment>
          <SearchableDropdown
            multi={true}
            selectedItems={selectedItems}
            items={customerData}
            onItemSelect={item => {
              const items = selectedItems;
              items.push(item);
              setSelectedITems(items);
              setSelectedCustomer(item.name);
              // console.log(item.customer_id);
              cust = item.customer_id;
              setCustomerId(item.customer_id);
              makingData();
              // postingRecommendation();
            }}
            placeholderTextColor="black"
            containerStyle={{
              padding: 5,
              width: '55%',
              marginRight: 10,
              backgroundColor: 'white',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderRadius: 5,
              color: 'black',
            }}
            // itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{
              maxHeight: 140,
            }}
            textInputProps={{
              placeholder: SelectedCustomer,
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
              onTextChange: text => {
                setTextChangeId(text);
                //console.log('Target value', text);
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </Fragment>
      </View>
      <View style={styles.rowButton}>
        <Text>Product ID</Text>
        <Text>{prodid}</Text>
      </View>
      <View style={styles.rowButton}>
        <Text>Customer Id</Text>
        <Text>{CustomerId}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <TouchableOpacity
          style={styles.SaveButton}
          onPress={() => postingRecommendation()}>
          <Text style={{color: 'white', fontSize: 18}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  SaveButton: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: primaryColor,
  },
});
