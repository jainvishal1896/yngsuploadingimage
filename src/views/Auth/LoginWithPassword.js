import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {_handleAuthentication} from '../../api/auth';
import {isEmpty, unset, set} from 'lodash';
import Button from '../../components/Common/Button';
import EditTextField from '../../components/Form/editTextfield';
import {primaryColor} from '../../styles/variables';
import StackHeader from '../../components/Header/StackHeader';
import http from '../../http/index';
import Loader from '../../components/Indicator/Loader';

const {width} = Dimensions.get('window');
export default class LoginWithPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: {
        // password:"123456789",
      },
      loading: false,
      hashnum: '',
    };
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    let data = this.props.navigation.getParam('data');
    if (this.props.navigation.state.params == null) {
      let form = {...this.state.form, username: ''};
      this.setState({form});
    } else {
      let form = {...this.state.form, username: data.mobile};
      this.setState({form});
    }
  }

  validate() {
    let errors = {};
    const {username, password} = this.state.form;
    if (!isEmpty(username) && username.match(/^\d+/)) {
      if (isEmpty(username))
        set(errors, 'username', ['Mobile Number is required']);
      else if (username.trim().startsWith('0') || !/^\d{10}$/.test(username))
        set(errors, 'username', ['Invalid Mobile Number format']);
    } else {
      if (isEmpty(username))
        set(errors, 'username', ['this field is required']);
      // else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(username))
      //   set(errors, 'username', ['Invalid email format']);
    }
    if (isEmpty(password))
      set(errors, 'password', 'Please enter your password.');
    return errors;
  }

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  onSave() {
    let errors = this.validate();
    if (!isEmpty(errors)) {
      return this.setState({errors});
    }
    this.setState({loading: true, errors});
    http
      .post('login/salesPersonLogin', this.state.form)
      .then(res => {
        console.log('res....', res);
        this.setState({loading: false});
        _handleAuthentication(res.user);
      })
      .catch(err => {
        console.log('err....', err);
        let errors = {};
        if (err && err.status == 422) errors = err.message;
        this.setState({errors, loading: false});
      });
  }

  getForgotPassword() {
    let data = {
      username: this.state.form.username,
    };
    this.props.navigation.navigate('ForgotPassword', {data});
  }

  render() {
    const {form, errors} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StackHeader
          mycart={false}
          bgcolor="white"
          justifyContent={'flex-start'}
          iconcolor={primaryColor}
          navigation={this.props.navigation}
        />
        <Loader visible={this.state.loading} />
        <View
          style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {/* <Image style={styles.imageSyle} source={require('../../assets/upwrklogo.png')} /> */}
            <Text
              style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>
              Login to your account
            </Text>
          </View>

          <View style={{marginVertical: 20}}>
            <EditTextField
              label="Email or Mobile Number"
              name="username"
              errors={errors}
              style={{
                textAlignVertical: 'top',
                width: width - 40,
                height: 40,
                marginHorizontal: 2,
              }}
              keyboardType="email-address"
              value={form.username}
              onRef={ref => (this.username = ref)}
              onChange={this.handleChange.bind(this, 'username')}
              onSubmitEditing={() => this.password.focus()}
            />

            <EditTextField
              label="Password"
              name="password"
              style={{
                textAlignVertical: 'top',
                width: width - 40,
                height: 40,
                marginHorizontal: 2,
              }}
              errors={errors}
              onRef={ref => (this.password = ref)}
              value={form.password}
              secureTextEntry={true}
              onChange={this.handleChange.bind(this, 'password')}
              onSubmitEditing={this.onSave}
            />

            <Button
              onPress={this.onSave}
              buttonstyles={{
                borderRadius: 5,
                width: width - 40,
                marginTop: 10,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
              }}
              title="LOGIN"
            />
            <Text
              onPress={this.getForgotPassword.bind(this)}
              style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
              Forgot Your Password ?{' '}
              <Text style={{color: primaryColor}}> Reset here</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  imageSyle: {
    height: 100,
    width: 100,
  },
});
