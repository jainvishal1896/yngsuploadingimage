/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import http from './http/index';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const window = Dimensions.get('window');
let material = [];
let ColorData = [];
let productData = '';
let filename = '';
let authenticate;
let url = '';
let salesgroup = 'abc';
let colorCode;
let shade;
const App = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(' ');
  const [textChangeId, setTextChangeId] = useState(' ');
  const [selectedMaterialName, setSelectedMaterialname] = useState(' ');
  const [materialId, setMaterialId] = useState(' ');
  const [selectedColor, setSelectedColor] = useState(' ');
  const [selectedColorName, setSelectedColorName] = useState(' ');
  const [loading, setLoading] = useState(true);

  const options = {
    mediaType: 'photo',
    cameraType: 'back',
  };

  const openPicker = () => {
    launchCamera(options, response => {
      url = response.uri;
      //console.log('filename', filename);
    });
  };

  const saved = async () => {
    let fd = new FormData();
    //fd.append('file', $("#form-upload input[name='file']")[0].files[0]);
    fd.append('file', url);
    fd.append('fileName', filename);
    fd.append('folder', salesgroup);
    fd.append('useUniqueFileName', false);
    fd.append('publicKey', 'public_072ycdcza+xi8inRrbnQ5gny01o=');
    fd.append('signature', authenticate.signature);
    fd.append('expire', authenticate.expire);
    fd.append('token', authenticate.token);
    console.log('fd data', fd);
    let res = await fetch('https://upload.imagekit.io/api/v1/files/upload/', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data; ',
      },
      body: fd,
    });
    let responseJson = await res.json();
    console.log(responseJson);
    if (responseJson.status == 1) {
      Alert.alert('Upload Successful', null, [
        {text: 'okay', style: 'destructive'},
      ]);
    } else {
      Alert.alert('Please select a file', null, [
        {text: 'okay', style: 'destructive'},
      ]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [textChangeId]);

  useEffect(() => {
    getCredData();
  }, []);

  const getCredData = async () => {
    let response = await fetch(
      'https://yngs.co.in/index.php?route=api/product/getAuthenticateCreden',
    );
    let resData = await response.json();
    authenticate = resData.authenticationParameters;
  };

  const fetchData = async () => {
    let response = await fetch(
      `https://yngs.co.in/index.php?route=api/product/productListing&material_code=${textChangeId}`,
    );
    if (!response.ok) {
      let resError = await response.json();
      console.log(resError);
    }
    let resData = await response.json();
    productData = resData;
    material = [];
    //setSelectedMaterial(material);
    resData.forEach(item => {
      material.push({
        id: item.product_id,
        name: item.product_id.concat(',', item.name),
      });
      setSelectedMaterial(material);
      setLoading(false);

      //setSelectedMaterial([...selectedMaterial, material]);
      // setSelectedMaterial([...selectedMaterial, {
      //   id: parseInt(item.product_id),
      //   name: item.product_id.concat(',', item.name),
      // }]);
      // setSelectedMaterial(material);
    });
    //setSelectedMaterial(resolve);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
        Upload Image
      </Text>
      <View
        style={{
          width: window.width,
          paddingHorizontal: 15,
          marginHorizontal: 5,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: window.width,
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              width: window.width / 4,
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Text style={{fontSize: 18}}>Material</Text>
          </View>
          <SearchableDropdown
            // defaultIndex={2}
            items={selectedMaterial}
            onItemSelect={item => {
              setSelectedMaterialname(item.name);
              setMaterialId(item.id);
              // if(productData)
              productData.forEach(prod => {
                if (item.id === prod.product_id) {
                  salesgroup = item.salesgroup;
                  prod.option[0].product_option_value.forEach(i => {
                    ColorData = [];
                    ColorData.push({
                      id: prod.product_id,
                      name: i.name,
                    });
                    setSelectedColor(ColorData);
                  });
                }
              });
            }}
            placeholderTextColor="black"
            containerStyle={{
              padding: 5,
              width: window.width * 0.7,
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
              placeholder: selectedMaterialName,
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
              onTextChange: text => {
                console.log('typedText', text);
                setTextChangeId(text);

                // http
                //   .get(`product/productListing&material_code=${text}`)
                //   .then(resolve => {
                //     globalId= text;
                //     material = [];
                //     resolve.forEach(item => {
                //       material.push({
                //         id: parseInt(item.product_id),
                //         name: item.product_id.concat(',', item.name),
                //       });
                //     });
                //     setSelectedMaterial(material);
                //     console.log(
                //       'material after onTextChange',
                //       selectedMaterial,
                //     );
                //   })
                //   .catch(error => {
                //     console.log(error);
                //   });
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        {/* Second Searchable Dropbox */}
        <View
          style={{
            flexDirection: 'row',
            width: window.width,
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              width: window.width / 4,
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Text style={{fontSize: 18}}>Color</Text>
          </View>
          <SearchableDropdown
            items={
              selectedColor.length === 0 ? selectedMaterial : selectedColor
            }
            onItemSelect={item => {
              setSelectedColorName(item.name);
              productData.forEach(prod => {
                if (item.id === prod.product_id) {
                  prod.option[0].product_option_value.forEach(i => {
                    if (i.name === item.name) {
                      colorCode = i.color_code === null ? '00' : i.color_code;
                      shade = i.shade;
                    }
                    console.log('materialId', materialId);
                    console.log('Color code', colorCode);
                    console.log('shade', shade);
                  });
                  filename =
                    materialId + '_' + colorCode + '_' + shade + '.jpg';
                }
              });
            }}
            placeholderTextColor="black"
            containerStyle={{
              padding: 5,
              width: window.width * 0.7,
              marginRight: 10,
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{
              maxHeight: 140,
            }}
            textInputProps={{
              placeholder: selectedColorName,
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                color: 'black',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <View>
          <Button title="Pick an image" onPress={openPicker} />
        </View>
        <View style={{marginVertical: 20}}>
          <Button title="Save" onPress={saved} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: window.width,
    alignItems: 'center',
  },
});

export default App;