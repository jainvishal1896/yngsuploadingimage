import {CommonActions} from '@react-navigation/routers';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import CheckBox from '@react-native-community/checkbox';
import DynamicColorComponent from './DynamicColorComponent';
import ColorSeachableDropdown from './ColorSeachableDropdown';
import Icon from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('window');
let ColorData = [];
let salesgroup = '';
let price = '';
let material = [];
let PropsForColorComponent = [];
export default MaterialSearchDropDown = props => {
  //const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedMaterialName, setSelectedMaterialname] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [textChangeId, setTextChangeId] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [MainData, setMainData] = useState([]);
  const [SalesGroup, setSalesGroup] = useState('');
  const [Price, setPrice] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  let {
    productData,
    selectedMaterial,
    funcfromChild,
    // funcforSalesGroup,
    // funcforColorData,
  } = props;
  //let material = props.route.params ? props.route.params.material : null;
  //setSelectedMaterial(material);

  const sendData = value => {
    funcfromChild(value);
  };

  // const SendSalesGroup = value => {
  //   funcforSalesGroup(value);
  // };

  // const SendColorData = value => {
  //   funcforColorData(value);
  // };

  const clearFunc = () => {
    setSelectedMaterialname('');
    setSalesGroup('');
    setPrice('');
  };

  return (
    <View style={{height: '99%', marginLeft: 6}}>
      <View
        style={{
          flexDirection: 'row',
          width: window.width,
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 5,
          // alignItems: 'center',
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
          items={selectedMaterial}
          onItemSelect={item => {
            sendData(item.id);
            setSelectedMaterialname(item.name);
            setMaterialId(item.id);
            console.log('SELECTED ID', item.id);
            console.log('ProductData', productData);
            productData.forEach(prod => {
              if (item.id === prod.product_id) {
                salesgroup = prod.sales_group;
                price = prod.price;
                setSalesGroup(salesgroup);
                setPrice(price);
                // SendSalesGroup(salesgroup);
                ColorData = [];
                prod.option[0].product_option_value.forEach(i => {
                  ColorData.push({
                    id: prod.product_id,
                    name: i.name,
                    value_id: i.product_option_value_id,
                  });
                  setSelectedColor(ColorData);
                  // props.navigation.dispatch(
                  //   CommonActions.setParams({ColorData: ColorData}),
                  // );
                });
              }
              PropsForColorComponent = [];
              console.log('DATA', PropsForColorComponent);
              ColorData.forEach(item => {
                PropsForColorComponent.push({
                  mainId: item.id.concat(item.value_id),
                  id: prod.product_id,
                  colorname: item.name,
                });
              });
              setMainData(PropsForColorComponent);
              console.log('DATA AFTER', PropsForColorComponent);
            });
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
              sendData(text);
              //console.log('Target value', text);
            },
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        {/* </View> */}
        <View style={{width: window.width / 2.1}}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
              top: 20,
            }}
            onPress={clearFunc}>
            <Icon
              style={{
                textAlign: 'center',
                borderRadius: 1,
              }}
              name="md-close-outline"
              size={20}
              color="black"
            />
            {/* <CheckBox
              tintColor="black"
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: window.width / 2,
          height: 50,
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <View style={{width: window.width / 3.8}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: '#bbb'}}>
            Sales Group
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            alignItems: 'center',
            width: window.width / 4,
            height: '100%',
            justifyContent: 'center',
            borderColor: '#bbb',
            borderRadius: 5,
            marginLeft: 5,
          }}>
          <Text style={{textAlign: 'center', fontSize: 18}}>{SalesGroup}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: window.width / 2,
          height: 50,
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <View style={{width: window.width / 3.8}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: '#bbb'}}>
            Price
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            alignItems: 'center',
            width: window.width / 4,
            height: '100%',
            justifyContent: 'center',
            borderColor: '#bbb',
            borderRadius: 5,
            marginLeft: 5,
          }}>
          <Text style={{textAlign: 'center', fontSize: 18}}>{Price}</Text>
        </View>
      </View>
      <ScrollView>
        {MainData.map((item, i) => {
          console.log('item---', item);
          return (
            <View key={item.mainId}>
              {/* <Text>Helo</Text> */}
              <DynamicColorComponent
                id={item.id}
                prodData={productData}
                salesgroup={SalesGroup}
                colorname={item.colorname}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
