import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const window = Dimensions.get('window');
const ColorSearchableDropDown = props => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorName, setSelectedColorName] = useState('');
  const [loading, setLoading] = useState(false);

  //   let ColorData = props.route.params ? props.route.params.ColorData : null;
  //   let materialId = props.route.params
  //     ? props.route.params.selectedMaterialId
  //     : null;
  //   let SalesGroup = props.route.params ? props.route.params.SalesGroup : null;
  //   setSelectedColor(ColorData);

  const checkImg = async () => {
    console.log('SalesGroup', salesgroup);
    console.log('FileName', filename);

    setUrl('');
    let response = await fetch(
      `https://ik.imagekit.io/iufd8xdmqhz/${SalesGroup}/${filename}`,
      // `https://ik.imagekit.io/iufd8xdmqhz/Y02/Y02-46902136-00-000.jpg`,
    );
    setLoading(true);

    let resData = await response;
    if (response.ok == true) {
      ToastAndroid.show('Downloading Image', ToastAndroid.SHORT);
      props.navigation.dispatch(CommonActions.setParams({url: resData.url}));
      //setUrl(resData.url);
      setLoading(false);
    } else {
      setLoading(false);
      ToastAndroid.show('No image in the directory', ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <SearchableDropdown
        items={selectedColor.length === 0 ? ' ' : selectedColor}
        onItemSelect={item => {
          setSelectedColorName(item.name);
          props.productData.forEach(prod => {
            if (item.id === prod.product_id) {
              prod.option[0].product_option_value.forEach(i => {
                if (i.name === item.name) {
                  colorCode = i.color_code === null ? '00' : i.color_code;
                  shade = i.shade;
                }
                console.log('Color code', colorCode);
                console.log('shade', shade);
                if (item.name !== 'MASTER_000' && toggleCheckBox === false) {
                  filename =
                    salesgroup +
                    '-' +
                    materialId +
                    '-' +
                    colorCode +
                    '-' +
                    shade +
                    '.jpg';
                }
                if (item.name === 'MASTER_000' || toggleCheckBox === true) {
                  filename =
                    salesgroup +
                    '-' +
                    materialId +
                    '-' +
                    colorCode +
                    '-' +
                    shade +
                    '-M.jpg';
                }
              });
            }
          });
          ToastAndroid.show(
            'Please wait while we are checking the directory,',
            ToastAndroid.SHORT,
          );
          checkImg();
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
  );
};

export default ColorSearchableDropDown;
