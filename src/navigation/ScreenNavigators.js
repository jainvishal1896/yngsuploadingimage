import React from 'react';
import HomePage from '../Home/index';
import {createStackNavigator} from 'react-navigation';

// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeNavigation = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

HomeNavigation.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
    };
  }

  return {
    tabBarVisible,
  };
};

export default HomeNavigation;
