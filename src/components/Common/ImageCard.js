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

  const sendProdId = value => {
    funcFromChildSendId(value);
  };

  const gettingCutomerData = () => {
    let details = [];
    custDetails.forEach(item => {
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
  }, []);

  const toggleModal = visible => {
    setModalVisible(visible);
  };
  const HandleModal = () => {
    return (
      <View style={styles.Modalcontainer}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => { console.log("Modal has been closed.") }}
        >
          <View style={styles.modal}>
            <Image
              style={{width: '100%', height: 500, resizeMode: 'contain'}}
              source={{uri: `${Images_URL}/tr:w-170,h-200,q_200/${image}`}}
            />

            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => {
                toggleModal(!modalVisible);
              }}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  console.log(image);
  return (
    <View style={styles.card}>
      <CheckBox
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 5,
          left: 3,
          backgroundColor: 'white',
        }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => {
          console.log('ProductId', prodId);
          sendProdId(prodId);
          setToggleCheckBox(newValue);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          toggleModal(!modalVisible);
        }}
        style={styles.top}>
        {modalVisible === true ? <View>{HandleModal()}</View> : <View></View>}

        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={{
            uri: `${Images_URL}/tr:w-170,h-200,q_200/${image}`,
          }}
        />
      </TouchableOpacity>
      <View style={{height: '20%', width: widths}}>
        <Text
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
  top: {width: '100%', height: '100%'},
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
