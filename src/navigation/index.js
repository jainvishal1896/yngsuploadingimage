import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
// import HomeRoute from './Drawer'
import Home from '../navigation/ScreenNavigators';
import AuthStackNavigation from './Auth/index';
import {setTopLevelNavigator} from './NavigationService';
import {Root, Toast} from 'native-base';
// import {connect} from 'react-redux';
// import {connectionChange} from './../store/Actions/common';
import {Platform, StatusBar, View, StyleSheet, Alert} from 'react-native';
import {primaryColor, secondryColor, white} from '../styles/variables';
// import {_getCartquantity} from '../api/checkout'
import AppInit from './../components/AppInitilization';
// import NetInfo from '@react-native-community/netinfo';
// import {updateCount} from '../store/Actions/cartCount';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const MainNavigation = createSwitchNavigator(
  {
    App: Home,
    Auth: AuthStackNavigation,
    Init: AppInit,
  },
  {
    initialRouteName: 'Init',
    resetOnBlur: true,
  },
);
// let countGlobal = 0;
class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      connection_Status: '',
    };
  }
  //   componentDidMount() {
  //     NetInfo.getConnectionInfo();
  //     NetInfo.addEventListener(
  //       'connectionChange',
  //       this.handleConnectionChange.bind(this),
  //     );
  //   }

  //   handleConnectionChange(connectionInfo) {
  //     let status = true;
  //     if (connectionInfo.type === 'none') {
  //       Alert.alert(
  //         'No Internet',
  //         'Please Check Internet Connection',
  //         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //         {cancelable: false},
  //       );
  //     }
  //     this.props.connectionStatus(status, connectionInfo);
  //     NetInfo.removeEventListener(
  //       'connectionChange',
  //       this.handleConnectionChange.bind(this),
  //     );
  //   }

  //   componentWillUnmount() {
  //     NetInfo.removeEventListener(
  //       'connectionChange',
  //       this.handleConnectionChange.bind(this),
  //     );
  //   }
  //   getCount = () => {
  //     _getCartquantity()
  //       .then(resolve => {
  //         products = resolve;
  //         countGlobal = products.products.length;
  //         this.props.countMethod(countGlobal);
  //       })
  //       .catch(reject => {
  //         console.log(reject);
  //       });
  //   };

  render() {
    // this.getCount();

    return (
      <View style={{flex: 1}}>
        <Root>
          <View style={{height: STATUSBAR_HEIGHT}}>
            <StatusBar
              translucent={true}
              backgroundColor={primaryColor}
              barStyle="default"
            />
          </View>
          <View style={{flex: 1}}>
            <MainNavigation
              ref={navigatoinRef => {
                setTopLevelNavigator(navigatoinRef);
              }}
            />
          </View>
        </Root>
      </View>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   connectionStatus: (status, info) => dispatch(connectionChange(status, info)),
//   countMethod: updateQty => {
//     dispatch(updateCount(updateQty));
//   },
// });

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },

  TextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

// export default connect(null, mapDispatchToProps)(Navigation);
export default Navigation;
