import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from 'native-base';
// import { primaryColor,secondryColor, textColor, texthintColor } from '../../style/variables';
import {isEmpty} from 'lodash';
import {primaryColor} from '../../styles/variables';
export default class Inputfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
    };
  }

  handleFocus = () => this.setState({hasFocus: true});
  handleBlur = () => this.setState({hasFocus: false});

  _getColor = () => {
    const {errorColor, tintColor, baseColor, errors, value, name} = this.props;
    const {hasFocus} = this.state;

    if (!isEmpty(errors) && !isEmpty(errors[name])) {
      return errorColor;
    }
    if (hasFocus || (!hasFocus && !isEmpty(value))) {
      return tintColor;
    }
    return baseColor;
  };

  _getLineStyleVariant = () => {
    const {errors, name} = this.props;
    const {hasFocus} = this.state;

    return (!isEmpty(errors) && !isEmpty(errors[name])) || hasFocus
      ? {borderBottomWidth: 2, paddingBottom: 1}
      : {borderBottomWidth: 0.8, paddingBottom: 2.5};
  };

  render() {
    const {
      errorColor,
      marginBottom,
      fontSize,
      tintColor,
      baseColor,
      value,
      name,
      borderWidth,
      label,
      onRef,
      errors,
      placeholder,
      iconProps,
      showIcon,
      onChange,
      ...textInputProps
    } = this.props;
    const {hasFocus} = this.state;

    return (
      <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize, paddingLeft: 5, marginBottom}}>{label}</Text>
        </View>
        <View
          style={{
            marginTop: 1,
            borderBottomWidth: borderWidth,
            borderColor: '#e4eaf0',
            borderRadius: 5,
          }}>
          <TextInput
            ref={onRef.bind(this)}
            style={style.inputcontainer}
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            returnKeyType="next"
            {...textInputProps}
            disableFullscreenUI={true}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange.bind(this)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            selectionColor={baseColor}
            placeholderTextColor="#A9A9A9"
          />
        </View>
        <View style={{marginBottom: 10}}>
          {!isEmpty(errors) && !isEmpty(errors[name]) && (
            <Text style={[style.helper, {color: errorColor}]}>
              {errors[name]}
            </Text>
          )}
        </View>
      </>
    );
  }
}

Inputfield.defaultProps = {
  name: 'email',
  errors: [],
  errorColor: 'rgb(213, 0, 0)',
  tintColor: 'red',
  baseColor: 'green',
  onChange: () => null,
  onRef: () => null,
  showIcon: true,
  value: null,
  borderWidth: 1,
  marginBottom: 0,
  fontSize: 16,
};

const style = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: '100%',
  },

  inputcontainer: {
    color: '#A9A9A9',
    fontSize: 20,
  },
  helper: {
    fontSize: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    height: 22,
    padding: 0,
    paddingLeft: 5,
    color: 'pink',
  },
  icon: {
    position: 'relative',
    bottom: 5,
    color: 'pink',
    fontSize: 25,
  },
});
