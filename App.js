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
  ToastAndroid,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  Button,
  Modal,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import SearchDropDown from './src/components/MaterialSearchDropDown';
import store from './src/store';
import Toast from 'react-native-toast-message';
import MainNavigation from './src/navigation/index';
import {Provider} from 'react-redux';
// let itemss = [];
const App = props => {
  console.disableYellowBox = true;
  return (
    <>
      <Toast ref={ref => Toast.setRef(ref)} />
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  );
};
export default App;
