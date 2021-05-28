import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {_getUser} from '../api/auth';
import DynamicColorComponent from '../components/DynamicColorComponent';
import StackHeader from '../components/Header/StackHeader';
import MaterialSearchDropDown from '../components/MaterialSearchDropDown';
import http from '../http/index';

const window = Dimensions.get('window');
let token;
let productData = '';
let material = [];
export default Home = props => {
  const [textChangeId, setTextChangeId] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [SalesGroup, setSalesGroup] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    fetchData();
  }, [textChangeId]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  // const tokenHandler = ()=>{
  //   _getUser().then((res)=>{
  //     token = res;
  //   }).catch((res)=>{})
  // }

  const fetchData = () => {
    http
      .get(`product/productListing&material_code=${textChangeId}`)
      .then(response => {
        let resData = response;
        productData = resData;
        material = [];
        resData.map(item => {
          material.push({
            id: item.product_id,
            name: item.product_id.concat(',', item.name),
          });
          setSelectedMaterial(material);
        });
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  // const fetchData = async () => {
  //   let response = await fetch(
  //     `https://yngs.co.in/index.php?route=api/product/productListing&material_code=${textChangeId}`,
  //   );
  //   if (!response.ok) {
  //     let resError = await response.json();
  //     console.log(resError);
  //   }
  //   let resData = await response.json();
  //   productData = resData;
  //   material = [];
  //   resData.map(item => {
  //     material.push({
  //       id: item.product_id,
  //       name: item.product_id.concat(',', item.name),
  //     });
  //     setSelectedMaterial(material); //either this or below code line.
  //     //props.navigation.dispatch(CommonActions.setParams({material: material}));
  //   });
  // };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Application needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchChangedId = id => {
    setTextChangeId(id);
    console.log('id', textChangeId);
  };
  //   const gettingSalesGroup = value => {
  //     setSalesGroup(value);
  //     console.log('SG', SalesGroup);
  //   };
  //   const gettingColorData = data => {
  //     setSelectedColor(data);
  //     console.log('Color', selectedColor);
  //   };

  return (
    <View>
      <StackHeader
        title={'Uploading Image'}
        navigation={props.navigation}
        justifyContent={'flex-start'}
      />
      <View style={styles.card}>
        <MaterialSearchDropDown
          productData={productData}
          selectedMaterial={selectedMaterial}
          funcfromChild={fetchChangedId}
          //funcforSalesGroup={gettingSalesGroup}
          //   funcforColorData={gettingColorData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    elevation: 10,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
