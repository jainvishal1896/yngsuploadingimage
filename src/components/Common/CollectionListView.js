import React, {useState} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Images_URL} from '../../config';
import {primaryColor} from '../../styles/variables';
let noOfCards = 4;
const CollectionListView = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const window = Dimensions.get('window');
  widths = (window.width - 20) / noOfCards;
  let {
    image1,
    image2,
    image3,
    image4,
    title,
    prodId,
    custDetails,
    prodName,
    type,
    funcFromChildSendId,
  } = props;
  const sendProdId = value => {
    funcFromChildSendId(value);
  };
  return (
    <View
      style={{
        width: widths,
        height: noOfCards == 2 ? (window.width > 600 ? 340 : 240) : 130,
        elevation: 5,
        // borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          margin: 3,
          width: '100%',
          height: '80%',
          padding: 3,
        }}>
        <View style={{width: '70%', height: '100%', padding: 3}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: `${Images_URL}/tr:w-300,h-340,q_200/${image1}`,
            }}
          />
          <CheckBox
            style={{
              position: 'absolute',
              backgroundColor: 'grey',
              // width: '25%',
              // height: '25%',
            }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => {
              console.log('ProductId', prodId);
              sendProdId(prodId);
              setToggleCheckBox(newValue);
            }}
          />
        </View>
        <View style={{width: '30%', height: '100%', padding: 3}}>
          <Image
            style={{width: '100%', height: '33%'}}
            source={{
              uri: `${Images_URL}/tr:w-150,h-50,q_200/${image2}`,
            }}
          />
          <Image
            style={{width: '100%', height: '33%'}}
            source={{
              uri: `${Images_URL}/tr:w-150,h-150,q_200/${image3}`,
            }}
          />
          <Image
            style={{width: '100%', height: '33%'}}
            source={{
              uri: `${Images_URL}/tr:w-150,h-150,q_200/${image4}`,
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '20%',
          // justifyContent: "center",
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, color: primaryColor}}>{prodName}</Text>
      </View>
    </View>
  );
};

export default CollectionListView;
