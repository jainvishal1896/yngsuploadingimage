import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Image} from 'react-native';
import {navigate} from './../navigation/NavigationService';
import {_handleAccess, _getUser} from './../api/auth';
// import { _getCartquantity } from "./../api/checkout";
import SplashScreen from 'react-native-splash-screen';
import {primaryColor} from '../styles/variables';
// import {connect} from 'react-redux';
// import {updateCount} from '../store/Actions/cartCount';

class AppLoadingMain extends React.Component {
  state = {isLoadingComplete: false};

  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);

    _handleAccess()
      .then(responce => {
        navigate('App');
      })
      .catch(error => {
        navigate('Auth');
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="center"
          style={{height: 100, width: 100, alignSelf: 'center'}}
          source={require('../../assets/YNGS_without_name.png')}
        />
        <ActivityIndicator size="large" color={primaryColor} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AppLoadingMain;
