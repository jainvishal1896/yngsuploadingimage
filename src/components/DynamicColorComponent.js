import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import {Toast} from 'native-base';

let colorCode = '';
let shade = '';
let option_description = '';
let option_id = '';
let filename = '';
let url = '';
const window = Dimensions.get('window');
const DynamicColorComponent = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [URI, setURI] = useState('');
  const [URL, setURL] = useState('');
  const [FileName, setFileName] = useState('');
  const [SalesGroupp, setSalesGroupp] = useState('');
  const [sig, setSig] = useState('');
  const [exp, setExp] = useState('');
  const [token, setToken] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [optionColorName, setOptionColorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [Imageloading, setImageLoading] = useState(false);

  let {id, salesgroup, colorname, prodData} = props;
  useEffect(() => {
    setLoading(true);
    setURI('');
    setURL('');
    setOptionColorName('');
    getCredData();
    FuncfileName();
    checkImg();
  }, []);

  const funcforhandlingToggle = () => {
    prodData.forEach(prod => {
      if (id === prod.product_id) {
        prod.option[0].product_option_value.forEach(i => {
          if (i.name === colorname) {
            colorCode = i.color_code === null ? '00' : i.color_code;
            shade = i.shade;
            option_description = i.option_description;
          }
          console.log('Color code', colorCode);
          console.log('shade', shade);
          if (colorname !== 'MASTER_000' && toggleCheckBox === false) {
            filename =
              salesgroup + '-' + id + '-' + colorCode + '-' + shade + '.jpg';
            setFileName(filename);
          }

          if (colorname === 'MASTER_000' || toggleCheckBox === true) {
            filename =
              salesgroup + '-' + id + '-' + colorCode + '-' + shade + '-M.jpg';
            setFileName(filename);
          }
        });
      }
    });
  };

  const saved = async () => {
    if (URL === '') {
      ToastAndroid.show('Please fill the details', ToastAndroid.SHORT);
      return;
    }
    //funcforhandlingToggle();
    setLoading(true);
    let fd = new FormData();

    // // console.log('Image name pickimageFromLib=', response.fileName);
    // if (selectedMaterialName === '' || selectedColorName === '' || Url === '') {
    //   ToastAndroid.show('Please fill the details', ToastAndroid.SHORT);
    //   return;
    // }
    // setLoading(true);
    // let fd = new FormData();
    // if (selectedColorName !== 'MASTER_000' && toggleCheckBox === false) {
    //   filename =
    //     salesgroup + '-' + materialId + '-' + colorCode + '-' + shade + '.jpg';
    // }
    // if (selectedColorName === 'MASTER_000' || toggleCheckBox === true) {
    //   filename =
    //     salesgroup +
    //     '-' +
    //     materialId +
    //     '-' +
    //     colorCode +
    //     '-' +
    //     shade +
    //     '-M.jpg';
    // }

    // let fd = new FormData();
    fd.append('file', URL);
    fd.append('fileName', FileName);
    fd.append('folder', SalesGroupp);
    fd.append('useUniqueFileName', false);
    fd.append('publicKey', 'public_072ycdcza+xi8inRrbnQ5gny01o=');
    fd.append('signature', sig);
    fd.append('expire', exp);
    fd.append('token', token);
    console.log('fd data', fd);
    try {
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
        getCredData();
        if (colorname === 'MASTER_000') {
          let res = await fetch(`product/updateProductFlag&product_id=${id}`);
          let resD = await res.json();
          console.log('YES', resD);
        } else {
          let res = await fetch(
            `product/updateProductFlag&product_option_value_id=${option_id}`,
          );
          let resD = await res.json();
          console.log('NO', resD);
        }
        setLoading(false);
        setImageLoading(false);
        // setToggleCheckBox(false);
        // setURL('');
        // // setURI('');
        // setFileName('');
        // setSalesGroupp('');
        // // setSig('');
        // // setExp('');
        // // setToken('');
        // colorCode = '';
        // shade = '';
        // option_description = '';
        // filename = '';
        // url = '';
        ToastAndroid.show('Uploaded Successfully.', ToastAndroid.SHORT);
      }
    } catch (error) {
      // console.log('ERROR IN UPLOADING', error);
      Toast.show('Error Occured at' + FileName, ToastAndroid.SHORT);
    }
  };

  const FuncfileName = () => {
    // setOptionColorName('');
    setSalesGroupp(salesgroup);
    prodData.forEach(prod => {
      if (id === prod.product_id) {
        prod.option[0].product_option_value.forEach(i => {
          if (i.name === colorname) {
            colorCode = i.color_code === null ? '00' : i.color_code;
            shade = i.shade;
            option_description = i.option_description;
            option_id: i.product_option_value_id;
          }
          console.log('Color code', colorCode);
          console.log('shade', shade);
          if (colorname !== 'MASTER_000') {
            filename =
              salesgroup + '-' + id + '-' + colorCode + '-' + shade + '.jpg';
            setFileName(filename);
          }

          if (colorname === 'MASTER_000') {
            filename =
              salesgroup + '-' + id + '-' + colorCode + '-' + shade + '-M.jpg';
            setFileName(filename);
          }
        });
        setOptionColorName(option_description);
      }
    });
  };

  const checkImg = async () => {
    ToastAndroid.show('please wait', ToastAndroid.SHORT);
    console.log('SalesGroup', salesgroup);
    console.log('FileName', filename);
    url = '';
    let response = await fetch(
      `https://ik.imagekit.io/iufd8xdmqhz/${salesgroup}/${filename}`,
      // `https://ik.imagekit.io/iufd8xdmqhz/Y02/Y02-46902136-00-000.jpg`,
    );
    setImageLoading(true);

    let resData = await response;
    if (response.ok == true) {
      ToastAndroid.show(
        'Downloading Image ' + optionColorName,
        ToastAndroid.SHORT,
      );
      //props.navigation.dispatch(CommonActions.setParams({url: resData.url}));
      let uri = resData.url;
      setURI(uri);
      setImageLoading(false);
    } else {
      setImageLoading(false);
      ToastAndroid.show(
        'No image in the directory ' + optionColorName,
        ToastAndroid.SHORT,
      );
    }
  };

  const toggleModal = visible => {
    setModalVisible(visible);
  };

  const renderFileUri = () => {
    if (URI) {
      return <Image source={{uri: URI}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../assets/iconImage.jpg')}
          style={styles.images}
        />
      );
    }
  };
  const options = {
    mediaType: 'photo',
    cameraType: 'back',
  };

  const getCredData = async () => {
    let response = await fetch(
      'https://yngs.co.in/index.php?route=api/product/getAuthenticateCreden',
    );
    let resData = await response.json();
    let authenticate = resData.authenticationParameters;
    setSig(authenticate.signature);
    setExp(authenticate.expire);
    setToken(authenticate.token);
  };

  const PickGallery = () => {
    setURL('');
    launchImageLibrary(options, response => {
      let data = {
        size: response.fileSize,
        name: response.fileName,
        type: response.type,
        fileCopyUri: response.uri,
        uri: response.uri,
      };
      let link = response.uri;
      setURI(link);
      setURL(data);
    });
    renderFileUri();
  };

  const openPicker = () => {
    setURL('');
    launchCamera(options, response => {
      //url = response.uri;
      let data = {
        size: response.fileSize,
        name: response.fileName,
        type: response.type,
        fileCopyUri: response.uri,
        uri: response.uri,
      };
      //filename2 = response.fileName;
      let link = response.uri;
      setURI(link);
      setURL(data);
      console.log('PickerData', response);
    });
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
              source={{uri: URI}}
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

  if (Imageloading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const checkboxfunc = value => {
    setToggleCheckBox(value);
    //funcforhandlingToggle();
  };

  return (
    <View style={styles.container}>
      <View style={{width: 100, height: 100}}>
        {Imageloading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <TouchableOpacity
            style={{width: 100, height: 100}}
            onPress={() => {
              toggleModal(!modalVisible);
            }}>
            {modalVisible === true ? (
              <View>{HandleModal()}</View>
            ) : (
              <View>{renderFileUri()}</View>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginLeft: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text>Color {'- '}</Text>
          <Text>{optionColorName}</Text>
        </View>
        {/* <View>
          <Text>{URI}</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                marginTop: 5,
              }}
              onPress={openPicker}>
              <Icon name="md-camera" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                marginTop: 5,
              }}
              onPress={PickGallery}>
              <Icon name="md-image" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 40,
            }}>
            {/* <View>
              <View
                style={{
                  borderWidth: 1,
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CheckBox
                  tintColor="black"
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newvalue => checkboxfunc(newvalue)}
                />
              </View>
            </View> */}
            <TouchableOpacity style={{marginLeft: 20}} on onPress={saved}>
              <Icon name="md-save" size={27} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    borderWidth: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
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
  images: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'grey',
  },
});
export default DynamicColorComponent;
