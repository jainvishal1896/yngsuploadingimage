import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Images_URL} from '../../config';
import CheckBox from '@react-native-community/checkbox';
import {primaryColor} from '../../styles/variables';
import SearchableDropdown from 'react-native-searchable-dropdown';
import http from '../../http';
let widths;
let noOfCards = 2;
const window = Dimensions.get('window');

export default ImageCard = props => {
  const [CollectionData, setCollectionData] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [CustomerDetails, setCustomerDetails] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectedCustomer, setSelectedCustomer] = useState('');
  const [pdata, setpData] = useState([
    {id: '1', pname: 'a'},
    {id: '2', pname: 'b'},
    {id: '3', pname: 'c'},
  ]);

  let {funcfromChild, custDetails, prodId, image, funcFromChildSendId} = props;

  const sendData = value => {
    funcfromChild(value);
  };
  const sendProdId = value => {
    funcFromChildSendId(value);
  };

  const postingRecommendation = () => {
    http
      .post('product/pushToCustomer', CollectionData)
      .then(res => {
        console.log('RESOLVE', res);
        ToastAndroid.show('Data sent.', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log('Error of posting', error);
      });
  };

  const gettingCutomerData = () => {
    let details = [];
    custDetails.forEach(item => {
      //console.log('ITEMMM Cust Details', item.customer_id);
      details.push({
        id: item.customer_id,
        name: item.name,
      });
    });
    setCustomerDetails(details);
    console.log('Details', details);

    console.log('RESULTTTTTTTTTT', SelectedCustomer);
  };

  useEffect(() => {
    gettingCutomerData();
  }, [custDetails]);

  useEffect(() => {
    noOfCards = 4;
    // console.log('CUST DETAILS', custDetails);
    // console.log('Selected Customer', SelectedCustomer);
  }, []);
  // console.log('Productname', props.prodName);

  const HandleModal = () => {
    // console.log("Customer ",CustomerDetails );
    return (
      <View style={styles.Modalcontainer}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.Modalcard}>
              <View>
                <View
                  style={{
                    width: window.width,
                    backgroundColor: 'white',
                    height: window.height / 6,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '20%',
                      backgroundColor: primaryColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Push to Customer </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text>Select Customer</Text>
                    <SearchableDropdown
                      items={CustomerDetails}
                      onItemSelect={item => {
                        console.log('ITEM', item);
                        setSelectedCustomer(item.id);
                        // makingData();
                        let Collection = [];
                        Collection.push({
                          prodid: prodId,
                          customerId: SelectedCustomer,
                        });
                        setCollectionData(Collection);
                        console.log('COLLECTION DATA', CollectionData);
                        postingRecommendation();
                        console.log(
                          'Consoling Selected Customer',
                          SelectedCustomer,
                        );
                      }}
                      placeholderTextColor="black"
                      containerStyle={{
                        padding: 5,
                        width: '55%',
                        marginRight: 10,
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
                          sendData(text);
                          //console.log('Target value', text);
                        },
                      }}
                      listProps={{
                        nestedScrollEnabled: true,
                      }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => {
                  toggleModal(!modalVisible);
                }}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const toggleModal = visible => {
    setModalVisible(visible);
  };

  // const checker = value => {
  //   ToastAndroid.show(value, ToastAndroid.SHORT);
  // };
  console.log(image);
  return (
    <View style={styles.card}>
      <CheckBox
        style={{
          position: 'absolute',
          top: 5,
          left: 3,
          backgroundColor: 'grey',
        }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => {
          console.log('ProductId', prodId);
          sendProdId(prodId);
          setToggleCheckBox(newValue);
        }}
      />
      <View style={styles.top}>
        <Image
          style={{
            width: '100%',
            height: '60%',
            resizeMode: 'contain',
          }}
          source={{
            uri: `${Images_URL}/tr:w-150,h-50,q_50/${image}`,
          }}
        />
      </View>
      {/* <View style={}> */}
      <View style={{height: '40%', width: widths}}>
        <Text
          // numberOfLines={2}
          style={{
            height: '100%',
            width: '100%',
            fontSize: 11,
            color: 'black',
            fontWeight: 'bold',
            padding: 3,
          }}>
          {props.prodName}
        </Text>
      </View>
      {/* <View>
        {CustomerDetails.length > 0
          ? CustomerDetails.map((item, i) => {
              console.log('CUSTOMER DETAILS ', item);
              return (
                <TouchableOpacity key={i} onPress={() => checker(item.id)}>
                  <Text>{item.id}</Text>
                </TouchableOpacity>
              );
            })
          : null}
      </View> */}
      {/* <SearchableDropdown
        items={CustomerDetails}
        onItemSelect={item => {
          console.log('ITEM', item);
          setSelectedCustomer(item.name);
          console.log('Consoling Selected Customer', SelectedCustomer);
        }}
        placeholderTextColor="black"
        containerStyle={{
          padding: 5,
          width: '55%',
          marginRight: 10,
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
            sendData(text);
            //console.log('Target value', text);
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      /> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 1,
    borderWidth: 1,
    width: (window.width - 20) / 4,
    height: 130,
    // borderRadius: 10,
    overflow: 'hidden',
  },
  top: {width: '100%'},
  Modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    justifyContent: 'center',
    padding: 10,
  },
  touchableButton: {
    width: window.width / 3,
    padding: 10,
    backgroundColor: '#d69c3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  Modalcard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
