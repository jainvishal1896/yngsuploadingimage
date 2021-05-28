import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyTabs} from '../navigation/ScreenNavigators';
import {AuthStackNavigation} from './Auth/index';
import React, {useEffect} from 'react';
import {_getUser} from '../api/auth';
const localStorageName = 'app-token';
let Navigation;
const MainNavigator = () => {
  useEffect(() => {
    Navigation = (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="center"
          style={{height: 100, width: 100, alignSelf: 'center'}}
          source={require('../assets/YNGS_without_name.png')}
        />
        <ActivityIndicator size="large" color={primaryColor} />
      </SafeAreaView>
    );
    fetchData();
  }, []);
  const fetchData = () => {
    _getUser()
      .then(res => {
        let data = res;
        Navigation = <MyTabs />;
      })
      .catch(rej => {
        let data = rej;
        Navigation = <AuthStackNavigation />;
      });
  };

  useEffect(() => {}, []);

  return <NavigationContainer>{Navigation}</NavigationContainer>;
};

export default MainNavigator;
