import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {error, success, warning} from '../../styles/variables';
import Toast from 'react-native-toast-message';

class ToastMessage extends React.Component {
  constructor() {
    super();
  }

  show(message = '', type = 'error', duration = 3000, position = 'top') {
    if (type == 'success') backgroundColor = success;
    else if (type == 'error') backgroundColor = error;
    else if (type == 'warning') backgroundColor = warning;
    console.log('Snackbar show');
    Toast.show({
      text1: message,
      type,
      position,
    });
  }

  render() {
    return null;
  }
}

class Snackbar extends React.Component {
  constructor() {
    super();
    this.state = {
      opacity: new Animated.Value(0.0),
      message: '',
      hidden: true,
      backgroundColor: error,
    };
  }

  show(message = '', type = 'error', duration = 3000) {
    let backgroundColor = error;
    if (type == 'success') backgroundColor = success;
    else if (type == 'error') backgroundColor = error;
    else if (type == 'warning') backgroundColor = warning;
    console.log('Snackbar show');
    this.setState({message, hidden: false, backgroundColor});
    clearTimeout(this._timeOut);
    this.state.opacity.setValue(0);
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 255,
      useNativeDriver: true,
    }).start(({finished}) => {
      const isInfinity =
        duration === Number.POSITIVE_INFINITY ||
        duration === Number.NEGATIVE_INFINITY;
      if (finished && !isInfinity) {
        this._timeOut = setTimeout(this.hide, duration);
      }
    });
  }

  hide = (onDismiss = false) => {
    clearTimeout(this._timeOut);
    const {action} = this.props;
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        this.setState({hidden: true});
        onDismiss && action();
      }
    });
  };

  _onPress = () => {
    this.hide(true);
  };

  render() {
    const {hidden, backgroundColor} = this.state;
    const {color, actionText} = this.props;
    if (hidden) return null;

    return (
      <SafeAreaView pointerEvents="box-none" style={styles.swrapper}>
        <Animated.View
          pointerEvents="box-none"
          accessibilityLiveRegion="polite"
          style={[
            styles.scontainer,
            {
              backgroundColor,
              opacity: this.state.opacity,
              transform: [
                {
                  scale: !hidden
                    ? this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
          ]}>
          <Text
            style={[
              styles.scontent,
              {marginRight: actionText ? 0 : 16, color},
            ]}>
            {this.state.message}
          </Text>
          {actionText ? (
            <TouchableWithoutFeedback onPress={this._onPress}>
              <View style={styles.actionRoot}>
                <View style={styles.actionContainer}>
                  <Text numberOfLines={1} style={styles.actionText}>
                    {actionText.toUpperCase()}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </Animated.View>
      </SafeAreaView>
    );
  }
}
Snackbar.defaultProps = {
  onDismiss: () => null,
  duration: 2000,
  backgroundColor: '#022859',
  color: 'white',
  action: () => null,
  actionText: 'ok',
};
const styles = StyleSheet.create({
  swrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200000,
  },
  scontainer: {
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 4,
  },
  scontent: {
    color: 'white',
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
    fontSize: 12,
  },
  actionText: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
    color: 'white',
  },
  actionRoot: {
    minWidth: 64,
    maxWidth: 100,
    borderStyle: 'solid',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Snackbar;
