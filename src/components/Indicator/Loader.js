import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {primaryColor, white} from '../../styles/variables';

export default Loader = props => {
  if (props.visible === false) return null;
  return (
    <Modal
      onRequestClose={props.onClose.bind(this)}
      visible={props.visible}
      transparent={true}>
      <TouchableWithoutFeedback onPress={props.onClose.bind(this)}>
        <View style={styles.root}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color={primaryColor} />
            <Text style={styles.text}>Loading....</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

Loader.defaultProps = {
  onClose: () => null,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
    height: 75,
    backgroundColor: white,
  },
  text: {
    marginLeft: 30,
    color: primaryColor,
  },
});
