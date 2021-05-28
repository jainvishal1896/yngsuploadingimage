import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {_handleAuthentication} from '../../api/auth';
import RNOtpVerify from 'react-native-otp-verify';
import {isEmpty, unset, set} from 'lodash';
import Button from '../../components/Common/Button';
import EditTextField from '../../components/Form/editTextfield';
import {primaryColor} from '../../styles/variables';
import http from '../../http/index';
import Loader from '../../components/Indicator/Loader';

const {width} = Dimensions.get('window');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: {
        // mobile:"9983394005"
      },
      loading: false,
      hashnum: '',
    };
  }

  componentDidMount() {
    RNOtpVerify.getHash().then(p => this.setState({hashnum: p[0]}));
  }

  otp_validate() {
    let errors = {};
    const {mobile} = this.state.form;
    if (isEmpty(mobile)) set(errors, 'mobile', ['Mobile Number is required']);
    else if (mobile.trim().startsWith('0') || !/^\d{10}$/.test(mobile))
      set(errors, 'mobile', ['Invalid Mobile Number format']);
    return errors;
  }

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  onSave_Otp() {
    let errors = this.otp_validate();
    if (!isEmpty(errors)) {
      return this.setState({errors});
    }
    this.setState({loading: true});

    http
      .post('login/sendOtp', {
        mobile: this.state.form.mobile,
        deviceId: this.state.hashnum,
      })
      .then(res => {
        console.log('resres', res);
        this.setState({loading: false});
        let data = {
          mobile: this.state.form.mobile,
          type: 'login',
        };
        this.props.navigation.navigate('OTP', {data});
      })
      .catch(err => {
        let errors = {};
        if (err && err.status == 422) errors = err.message;
        this.setState({errors, loading: false});
      });
  }
  onForgot() {
    let data = {
      mobile: this.state.form.mobile,
    };
    this.props.navigation.navigate('ForgotPassword', {data});
  }

  getLoginPassword() {
    let data = {
      mobile: this.state.form.mobile,
    };
    this.props.navigation.navigate('LoginWithPassword', {data});
  }

  render() {
    const {form, errors} = this.state;
    return (
      <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        {this.state.loading && <Loader visible={this.state.loading} />}
        <View style={styles.container}>
          <Image
            resizeMode={'contain'}
            style={styles.imageSyle}
            source={require('../../../assets/loginimage.png')}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Login</Text>
          {/* <Text style={{ marginHorizontal: 5 }}>or</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }} >Signup</Text> */}
        </View>
        <View style={{marginBottom: 20}}>
          <EditTextField
            placeholder="Mobile Number"
            name="mobile"
            errors={errors}
            maxLength={10}
            style={{
              textAlignVertical: 'top',
              width: width - 40,
              height: 40,
              marginHorizontal: 2,
            }}
            keyboardType="numeric"
            mobileIcon={true}
            value={form.mobile}
            onRef={ref => (this.mobile = ref)}
            onChange={this.handleChange.bind(this, 'mobile')}
          />

          <Text
            style={{
              marginHorizontal: 5,
              marginVertical: 10,
              color: '#aaa9af',
            }}>
            By continuing, I agree to the{' '}
            <Text style={{color: primaryColor}}>Terms of Use</Text> &{' '}
            <Text style={{color: primaryColor}}>Privacy Policy</Text>
          </Text>

          <Button
            onPress={this.onSave_Otp.bind(this)}
            buttonstyles={{
              borderRadius: 5,
              width: width - 40,
              marginTop: 10,
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
            title="CONTINUE"
          />

          <Text
            onPress={this.getLoginPassword.bind(this)}
            style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
            Having trouble logging in?{' '}
            <Text style={{color: primaryColor}}> Get help</Text>
          </Text>
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
    height: 200,
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },

  imageSyle: {
    height: '100%',
    width: '100%',
  },
});
