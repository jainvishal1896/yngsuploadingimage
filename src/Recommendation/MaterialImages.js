import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';
import ImageCard from '../components/Common/ImageCard';
import CollectionListView from '../components/Common/CollectionListView';
import http from '../http';
import {primaryColor} from '../styles/variables';
import StackHeader from '../components/Header/StackHeader';
let Material = [];
export default MaterialImages = props => {
  const [ButtonValue, setButtonValue] = useState('Material');
  const [textChangeId, setTextChangeId] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [MaterialData, setMaterialData] = useState('');
  const [CollectionData, setCollectionData] = useState('');
  const [customerData, setCustomerData] = useState('');

  const [pdata, setpData] = useState([
    {id: '1', pname: 'Material'},
    {id: '2', pname: 'Collection'},
  ]);

  useEffect(() => {
    fetchData();
    fetchCollection();
  }, []);

  useEffect(() => {
    fetchCustomer();
  }, [textChangeId]);

  const fetchCustomer = () => {
    http
      .get(`customer/getCustomersList&filter_name=${textChangeId}`) //${textId}
      .then(res => {
        //console.log('DATA', res);
        setCustomerData(res);
      })
      .catch(error => {
        console.log('ERROR CUSTOMER', error);
      });
  };

  // collection/getAllCollection&page=1&limit=10

  const fetchChangedId = id => {
    setTextChangeId(id);
    //console.log('id', textChangeId);
  };

  const funcforSendId = id => {
    let check = false;
    console.log('ID', id);
    if (Material.length > 0) {
      Material.map((item, i) => {
        if (item === id) {
          check = true;
          Material.splice(i, 1);
        }
      });
      if (check === false) {
        Material.push(id);
      }
    } else {
      Material.push(id);
      console.log('ITEM is 3', id);
    }
    console.log('Material in ', Material);
  };

  const fetchData = () => {
    http
      .get('product/salesPortalProducts&page=1&limit=45')
      .then(res => {
        setMaterialData(res.data);
        console.log('DATA', res.data);
        // console.log(MaterialData);
      })
      .catch(error => {
        console.log('ERROR PRODUCT', error);
      });
  };

  const fetchCollection = () => {
    http
      .get('product/salesPortalCollection&page=1&limit=10')
      .then(res => {
        //console.log('DATA', res);
        let data = res.data;
        setCollectionData(data);
        //console.log('DATTATATATATATATA', data);
        //console.log('Collecttttttt', CollectionData);
      })
      .catch(error => {
        console.log('ERROR COLLECTION', error);
      });
  };

  return (
    <View style={styles.maincontainer}>
      <StackHeader
        title={'Recommendation Module'}
        navigation={props.navigation}
        justifyContent={'flex-start'}
        mycart={false}
        wishList={false}
        thankyou={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '99%',
          height: '10%',
          marginVertical: 5,
        }}>
        <View
          style={{
            width: '20%',
            height: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              backgroundColor: primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 3,
            }}
            onPress={() => setButtonValue('Material')}>
            <Text style={{color: 'white'}}>Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              width: '100%',
              height: '100%',
              backgroundColor: primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setButtonValue('Collection')}>
            <Text style={{color: 'white'}}>Collection</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '20%',
            marginRight: 5,

            height: '100%',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              width: '100%',
              height: '100%',
              backgroundColor: primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 3,
            }}
            onPress={() => {
              props.navigation.navigate('CustomerSelection', {
                sendId: Material,
                sendType: ButtonValue,
              });
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {ButtonValue == 'Material' ? (
        <FlatList
          data={MaterialData}
          keyExtractor={item => item.product_id.toString()}
          numColumns={4}
          renderItem={({item}) => (
            <View key={item.product_id}>
              <ImageCard
                image={
                  item.image === '' || item.image === null
                    ? 'yngs.png'
                    : item.image
                }
                navigation={props.navigation}
                prodId={item.product_id}
                custDetails={customerData}
                funcfromChild={fetchChangedId}
                funcFromChildSendId={funcforSendId}
                prodName={item.name}
                type={'Material'}
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={CollectionData}
          keyExtractor={item => item.collection_id.toString()}
          numColumns={4}
          renderItem={({item}) => (
            <View style={{margin: 3}} key={item.collection_id}>
              <CollectionListView
                funcFromChildSendId={funcforSendId}
                image1={
                  item.products.length === 0 || item.products[0] === null
                    ? 'yngs.png'
                    : item.products[0]
                }
                image2={
                  item.products.length === 0 || item.products[1] === null
                    ? 'yngs.png'
                    : item.products[1]
                }
                image3={
                  item.products.length === 0 || item.products[2] === null
                    ? 'yngs.png'
                    : item.products[2]
                }
                image4={
                  item.products.length === 0 || item.products[3] === null
                    ? 'yngs.png'
                    : item.products[3]
                }
                navigation={props.navigation}
                prodId={item.collection_id}
                custDetails={customerData}
                prodName={item.title}
                type={'Collection'}
              />
              {/* <ImageCard
                navigation={props.navigation}
                prodId={item.collection_id}
                custDetails={customerData}
                funcfromChild={fetchChangedId}
                prodName={item.title}
                type={'Collection'}
              /> */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
