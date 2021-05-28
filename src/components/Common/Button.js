import React from 'react';
import {StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Text, View} from 'native-base';
import {primaryColor, secondryColor, white} from '../../styles/variables';

const {width} = Dimensions.get('window');
const button = ({title, onPress, buttonstyles, textsyles}) => (
  <TouchableWithoutFeedback onPress={onPress.bind(this)}>
    <View style={[styles.button, buttonstyles]}>
      <Text style={[styles.text, textsyles]}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

button.defaultProps = {
  title: 'click here',
  onPress: () => null,
  buttonstyles: {},
  textsyles: {},
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: white,
  },
  button: {
    width: 200,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
    height: 45,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default button;
