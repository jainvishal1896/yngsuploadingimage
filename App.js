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
  FlatList,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const window = Dimensions.get('window');
let material = [];
let ColorData = [];
let productData = '';
let filename = '';
let authenticate;
let url = '';
let salesgroup = '';
let colorCode;
let shade;
const App = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(' ');
  const [textChangeId, setTextChangeId] = useState(' ');
  const [selectedMaterialName, setSelectedMaterialname] = useState(' ');
  const [materialId, setMaterialId] = useState(' ');
  const [selectedColor, setSelectedColor] = useState(' ');
  const [selectedColorName, setSelectedColorName] = useState(' ');
  const [loading, setLoading] = useState(false);

  const options = {
    mediaType: 'photo',
    cameraType: 'back',
  };

  const PickGallery = () => {
    launchImageLibrary(options, response => {
      let data = {
        size: response.fileSize,
        name: response.fileName,
        type: response.type,
        fileCopyUri: response.uri,
        uri: response.uri,
      };
      url = data;
    });
  };

  const openPicker = () => {
    launchCamera(options, response => {
      //url = response.uri;
      let data = {
        size: response.fileSize,
        name: response.fileName,
        type: response.type,
        fileCopyUri: response.uri,
        uri: response.uri,
      };
      url = data;
      console.log('PickerData', response);
    });
  };

  const saved = async () => {
    setLoading(true);
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
    let res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: fd,
    });
    let responseJson = await res.json();
    console.log('DATAAA', responseJson);

    if (responseJson) {
      setLoading(false);
      Alert.alert('Upload Successful', null, [
        {text: 'okay', style: 'destructive'},
      ]);
    }
  };

  useEffect(() => {
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
          marginTop: 100,
          fontSize: 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
          fontWeight: 'bold',
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
            <Text style={{fontSize: 18, color: '#A9A9A9'}}>Material</Text>
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
                  salesgroup = prod.sales_group;
                  ColorData = [];
                  prod.option[0].product_option_value.forEach(i => {
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
            <Text style={{fontSize: 18, color: '#A9A9A9'}}>Color</Text>
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
                    if (item.name === 'MASTER_000') {
                      filename =
                        prod.sales_group +
                        '-' +
                        materialId +
                        '-' +
                        colorCode +
                        '-' +
                        shade +
                        '.jpg';
                    } else {
                      filename =
                        materialId + '-' + colorCode + '-' + shade + '.jpg';
                    }
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
        <View
          style={{
            width: window.width,
            height: window.height / 8,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: window.width / 3,
              marginHorizontal: 5,
              height: window.height / 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#d69c3a',
              elevation: 10,
              borderRadius: 10,
            }}
            onPress={openPicker}>
            <Text style={{color: 'white'}}>Click Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: window.width / 3,
              marginHorizontal: 5,
              height: window.height / 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#d69c3a',
              elevation: 10,
            }}
            onPress={PickGallery}>
            <Text style={{color: 'white'}}>Pick an Image</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            onPress={saved}
            style={{
              borderWidth: 2,
              width: window.width / 3,
              marginHorizontal: 5,
              height: window.height / 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#d69c3a',
              elevation: 10,
            }}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={{color: 'white'}}>SAVE</Text>
            )}
          </TouchableOpacity>
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
