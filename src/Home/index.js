import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {primaryColor, textColor} from '../styles/variables';
import Home from '../Home/Home';
import {createBottomTabNavigator} from 'react-navigation';
import {View, Icon} from 'native-base';
// import NewArrival from '../../views/NewArrival';
// import MyAccount from '../MyAccount';
import Recommend from '../Recommendation/MaterialImages';
import CustomerSelection from '../Recommendation/CustomerSelection';

const styles = StyleSheet.create({
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 22,
    height: 24,
  },
  iconText: {
    color: textColor,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

const bottomNavigation = createBottomTabNavigator(
  {
    Home: {
      index: 0,
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.iconView}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icon/home.png')}
              style={[styles.iconImage, {tintColor}]}
            />
            <Text style={[styles.iconText, {color: tintColor}]}>Home</Text>
          </View>
        ),
      },
    },
    Recommend: {
      index: 1,
      screen: Recommend,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.iconView}>
            <Icon
              type="AntDesign"
              name="appstore-o"
              style={[styles.iconText, {fontSize: 23, color: tintColor}]}
            />
            <Text style={[styles.iconText, {color: tintColor}]}>
              Recommended
            </Text>
          </View>
        ),
      },
    },

    CustomerSelection: {
      //index: 2,
      screen: CustomerSelection,
      //navigationOptions: {
      //   tabBarIcon: ({tintColor}) => (
      //     <View style={styles.iconView}>
      //       <Icon
      //         type="AntDesign"
      //         name="appstore-o"
      //         style={[styles.iconText, {fontSize: 23, color: tintColor}]}
      //       />
      //       <Text style={[styles.iconText, {color: tintColor}]}>Customer</Text>
      //     </View>
      //   ),
      // },
    },
  },

  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: primaryColor,
      inactiveTintColor: 'black',
      showLabel: false,
    },
  },
);

export default bottomNavigation;
