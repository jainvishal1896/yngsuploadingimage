import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {Text, Button} from 'native-base';
import {PropTypes} from 'prop-types';
import {primaryColor, secondryColor, white} from '../../styles/variables';
import InputText from '../../components/Form/inputfield';
import {_login} from '../../api/auth';
import {isEmpty, unset, set} from 'lodash';
import Snackbar from '../../components/Common/Snackbar';
import http from './../../http/index';
import {mustPhone} from '../../utils/validations';

class UpdateMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        phone: this.props.phone,
        old: this.props.phone,
      },
      errors: {},
    };
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const {phone, old} = this.state.form;
    let errors = {...mustPhone('phone', phone, 'mobile number')};
    if (old == phone) return this._snk.show('please change in mobile number');
    if (isEmpty(phone)) set(errors, 'phone', ['Mobile number is required.']);
    if (!isEmpty(errors)) return this.setState({errors});
    Keyboard.dismiss();
    this.setState({loading: true});
    http
      .post('update_mobile_number', {
        old_mobile_number: old,
        new_mobile_number: phone,
      })
      .then(responce => {
        this.setState({loading: false, form: {phone: ''}});
        this.props.onChangeMobile(phone);
      })
      .catch(err => {
        let errors = {};
        if (err.status == 422) errors = err.errors;
        this.setState({loading: false, errors});
      });
  }

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {
      ...this.state.form,
      [name]: value,
    };
    this.setState({form});
  }

  onCancel = () => {
    this.props.onCancel();
  };

  render() {
    const {errors, form} = this.state;
    if (!this.props.visible) return null;
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        transparent={true}
        onRequestClose={this.onCancel}>
        <View style={styles.overlay} />

        <Snackbar ref={ref => (this._snk = ref)} />

        <View style={styles.root}>
          <View style={styles.container}>
            {this.state.loading && (
              <View style={styles.loader}>
                <View style={styles.loadercontainer}>
                  <ActivityIndicator size="large" color={primaryColor} />
                  <Text style={styles.text}>Updating mobile number</Text>
                </View>
              </View>
            )}

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Update Mobile Number</Text>
            </View>

            <View style={styles.content}>
              <InputText
                label="Phone Number"
                name="phone"
                iconProps={{ios: 'ios-call', android: 'md-call'}}
                errors={errors}
                value={form.phone}
                keyboardType="number-pad"
                onChange={this.handleChange.bind(this, 'phone')}
                onSubmitEditing={this.onSave}
              />
            </View>

            <View style={styles.actionFooter}>
              <Button transparent onPress={this.onCancel}>
                <Text style={styles.text}>Cancel</Text>
              </Button>
              <Button transparent onPress={this.onSave}>
                <Text style={styles.text}>Change</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

UpdateMobile.defaultProps = {
  transparent: false,
  onChangeMobile: () => null,
  phone: '',
};

UpdateMobile.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChangeMobile: PropTypes.func,
};

export default UpdateMobile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    flexDirection: 'column',
    width: '90%',
    minHeight: 300,
    backgroundColor: white,
    elevation: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 15,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  header: {
    height: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'center',
    color: secondryColor,
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: primaryColor,
    alignSelf: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.6)',
    zIndex: 1200,
  },
  loadercontainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
