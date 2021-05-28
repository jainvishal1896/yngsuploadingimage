import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {primaryColor} from '../../styles/variables';

export default BottomIndicator = props => (
  <View style={styles.root}>
    <ActivityIndicator size="large" color={primaryColor} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginVertical: 5,
  },
});
