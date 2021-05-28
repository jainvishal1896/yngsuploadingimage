import React from 'react';
import RecommendScreen from '../Recommendation/MaterialImages';
import CustomerSelection from '../Recommendation/CustomerSelection';
import {createStackNavigator} from 'react-navigation';

const RecommendNavigation = createStackNavigator(
  {
    Recommend: {
      screen: RecommendScreen,
    },
    CustomerSelection: {
      screen: CustomerSelection,
    },
  },
  {
    initialRouteName: 'CustomerSelection',
    headerMode: 'none',
  },
);

export default RecommendNavigation;
