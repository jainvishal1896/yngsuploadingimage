import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {isEmpty, unset, set} from 'lodash';
import Button from '../../components/Common/Button';

import Snackbar from '../../components/Common/Snackbar';
import Loader from './../../components/Indicator/Loader';
import {primaryColor, white} from '../../styles/variables';
import http from '../../http/index';
import {_handleAuthentication} from '../../api/auth';
import StackHeader from '../../components/Header/StackHeader';
import EditTextField from '../../components/Form/editTextfield';
const {width} = Dimensions.get('window');

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: {
        email: 'sonia.solanki.udr@gmail.com',
        // password:"123456789",
      },
      loading: false,
    };
    this.onSave = this.onSave.bind(this);
  }

  validate() {
    let errors = {};
    const {email} = this.state.form;

    if (isEmpty(email)) set(errors, 'email', ['this field is required']);
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(email))
      set(errors, 'email', ['Invalid email format']);

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
      .post('login/forgetPassword', this.state.form)
      .then(res => {
        console.log('rso---------', res);
        this.setState({loading: false});
        // this._snk.show(res.success, "success")
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 500);
      })
      .catch(err => {
        console.log('errr---', err);
        let errors = {};
        if (err && err.status == 422) errors = err.message;
        this.setState({errors, loading: false});
        //  this._snk.show(err.message)
      });
  }

  render() {
    const {form, errors} = this.state;
    return (
      <View style={styles.root}>
        <StackHeader
          bgcolor="white"
          justifyContent={'flex-start'}
          iconcolor={primaryColor}
          navigation={this.props.navigation}
        />

        {this.state.loading && <Loader visible={this.state.loading} />}
        <Snackbar ref={ref => (this._snk = ref)} />
        <View
          style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {/* <Image style={styles.imageSyle} source={require('../../assets/upwrklogo.png')} /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Reset password
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              marginHorizontal: 5,
              marginTop: 15,
              color: '#aaa9af',
            }}>
            Enter your email or mobile number and we'll send a link on your
            email to reset your password
          </Text>

          <View style={{marginVertical: 20}}>
            <EditTextField
              label="Email"
              name="email"
              errors={errors}
              style={{
                textAlignVertical: 'top',
                width: width - 40,
                height: 40,
                marginHorizontal: 2,
              }}
              keyboardType="email-address"
              value={form.email}
              onRef={ref => (this.email = ref)}
              onChange={this.handleChange.bind(this, 'email')}
              onSubmitEditing={() => this.password.focus()}
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
              title="SEND LINK"
            />

            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
              Unable to reset password{' '}
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
    marginTop: 40,
  },

  imageSyle: {
    height: 100,
    width: 100,
  },
});
