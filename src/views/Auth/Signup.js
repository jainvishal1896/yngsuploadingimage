import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {isEmpty, unset, set, isEqual} from 'lodash';
import {Picker, Icon} from 'native-base';
// import Snackbar from '../../component/Common/Snackbar';
import Loader from './../../components/Indicator/Loader';
import Button from '../../components/Common/Button';
import {primaryColor} from '../../styles/variables';
import http from '../../http/index';
import {_handleAuthentication} from '../../api/auth';
import EditTextField from '../../components/Form/editTextfield';
// import StackHeader from '../../components/Header/StackHeader';
const {width, height} = Dimensions.get('window');

const data = ['OPT1', 'Option 1'];

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: {
        // name: "pulkit", email: "pulkit.hasija638@gmail.com",
        // password: "123456789",
        prefix: '+91',
        language: 'english',
        business_type: 'business',
      },
      loading: false,
    };
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    let signupData = this.props.navigation.getParam('data');
    if (this.props.navigation.state.params == null) {
      let form = {...this.state.form, phone: '', token: ''};
      this.setState({form});
    } else {
      let form = {
        ...this.state.form,
        phone: signupData.phone,
        token: signupData.token,
      };
      this.setState({form});
    }
  }

  onChangeMobile(phone) {
    this.setState({mobile: phone, updating: false});
  }
  validate() {
    let errors = {};
    const {name, email, password, language, business_name, business_type} =
      this.state.form;
    if (isEmpty(name)) set(errors, 'name', 'please enter your name.');
    // if (!isEmpty(email)){
    //   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(email)) set(errors, 'email', ['Invalid email format']);
    // }
    if (isEmpty(email)) set(errors, 'email', 'please enter your email.');
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(email))
      set(errors, 'email', ['Invalid email format']);
    if (isEmpty(password))
      set(errors, 'password', 'Please enter your password.');
    if (isEmpty(language)) set(errors, 'language', 'please select language.');
    if (isEmpty(business_type))
      set(errors, 'business_type', 'Please enter business name.');
    return errors;
  }

  handleChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {...this.state.form, [name]: value};
    this.setState({form});
  }

  onValueChange(name, value) {
    let errors = this.state.errors;
    unset(errors, name);
    let form = {
      ...this.state.form,
      [name]: value,
    };
    this.setState({form});
  }

  onSave() {
    let errors = this.validate();
    if (!isEmpty(errors)) {
      return this.setState({errors});
    }
    this.setState({loading: true, errors});
    let form = {
      ...this.state.form,
      confirm: this.state.form.password,
      business_name: this.state.form.business_type,
    };

    console.log('users/new_register', form);
    http
      .post('users/new_register', form)
      .then(res => {
        this.setState({loading: false});
        _handleAuthentication(res.data);
      })
      .catch(err => {
        console.log('login error---', err);
        let errors = {};
        if (err && err.status == 422) errors = err.message;

        this.setState({errors, loading: false});
      });
  }

  render() {
    const {form, errors} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* <StackHeader bgcolor="white" justifyContent={"flex-start"} iconcolor={primaryColor} navigation={this.props.navigation} /> */}
        <Loader visible={this.state.loading} />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
          <View style={styles.container}>
            {/* <Image style={styles.imageSyle} source={require('../../assets/upwrklogo.png')} /> */}
            <Text
              style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>
              Welcome to Upwrk
            </Text>
          </View>

          <View style={{marginVertical: 20}}>
            <EditTextField
              label="Name"
              name="name"
              errors={errors}
              style={{
                textAlignVertical: 'top',
                width: width - 40,
                height: 40,
                marginHorizontal: 2,
              }}
              value={form.name}
              onRef={ref => (this.name = ref)}
              onChange={this.handleChange.bind(this, 'name')}
              onSubmitEditing={() => this.email.focus()}
            />

            <EditTextField
              label="Email (optional)"
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

            <EditTextField
              label="Password"
              name="password"
              errors={errors}
              style={{
                textAlignVertical: 'top',
                width: width - 40,
                height: 40,
                marginHorizontal: 2,
              }}
              value={form.password}
              onRef={ref => (this.password = ref)}
              onChange={this.handleChange.bind(this, 'password')}
            />
            <Text style={{marginBottom: 5, fontSize: 12, color: '#919aaf'}}>
              {' '}
              Select Language
            </Text>
            <View
              style={{
                width: width - 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#e4eaf0',
                justifyContent: 'center',
              }}>
              <Picker
                mode="dropdown"
                placeholder="Select Language"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{color: '#5cb85c'}}
                itemStyle={{
                  backgroundColor: '#d3d3d3',
                }}
                itemTextStyle={{color: '#788ad2'}}
                style={{width: undefined}}
                selectedValue={this.state.form.language}
                onValueChange={this.onValueChange.bind(this, 'language')}>
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Hindi" value="hindi" />
              </Picker>
            </View>
            {!isEmpty(errors) && !isEmpty(errors.language) && (
              <Text style={[styles.helper, {color: 'rgb(213, 0, 0)'}]}>
                {errors.language}
              </Text>
            )}

            <View style={{marginVertical: 6}} />
            <Text style={{marginBottom: 5, fontSize: 12, color: '#919aaf'}}>
              {' '}
              Select Business
            </Text>
            <View
              style={{
                width: width - 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#e4eaf0',
                justifyContent: 'center',
              }}>
              <Picker
                mode="dropdown"
                placeholder="Select Language"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{color: '#5cb85c'}}
                itemStyle={{
                  backgroundColor: '#d3d3d3',
                }}
                itemTextStyle={{color: '#788ad2'}}
                style={{width: undefined}}
                selectedValue={this.state.form.language}
                onValueChange={this.onValueChange.bind(this, 'business_type')}>
                <Picker.Item label="Business" value="business" />
                <Picker.Item label="Individual" value="individual" />
              </Picker>
            </View>

            <View style={{marginTop: 15}} />

            <Text
              style={{
                marginHorizontal: 5,
                marginVertical: 15,
                color: '#aaa9af',
              }}>
              By continuing, i agree to the{' '}
              <Text style={{color: primaryColor}}>Terms of Use</Text> &{' '}
              <Text style={{color: primaryColor}}>Privacy Policy</Text>
            </Text>

            <Button
              onPress={this.onSave.bind(this)}
              buttonstyles={{
                borderRadius: 5,
                width: width - 40,
                marginTop: 10,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
              }}
              title="CONTINUE"
            />
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
    marginTop: 20,
  },
  helper: {
    fontSize: 12,
  },

  imageSyle: {
    height: 100,
    width: 100,
  },
});

// import React, { Component } from 'react';
// import {
//   View, ScrollView, TouchableWithoutFeedback,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { isEmpty, unset, set,isEqual } from 'lodash';
// import Inputfield from '../../component/Form/inputfield';
// import { Picker, Icon } from "native-base";
// import Snackbar from '../../component/Common/Snackbar';
// import Loader from './../../component/Indicator/Loader';
// import { primaryColor } from '../../style/variables';
// import http from '../../http';
// import { _handleAuthentication } from '../../api/auth';
// const { width, height } = Dimensions.get("window")

// export default class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       errors: {},
//       form: {
//         prefix:"+91"
//       },
//       loading: false,
//     };
//     this.onSave = this.onSave.bind(this)
//   }

//   validate() {
//     let errors = {};
//     const { name,email,password,confirm,language,business_name,business_type,prefix,phone} = this.state.form;
//     if (isEmpty(name)) set(errors, 'name', 'please enter your full name.');
//     if (isEmpty(email)) set(errors, 'email', 'please enter your email.');
//     else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(email)) set(errors, 'email', ['Invalid email format']);
//     if (isEmpty(password)) set(errors, 'password', 'Please enter your password.');
//     if (isEmpty(confirm)) set(errors, 'confirm', 'Please enter your confirm.');
//     if (!isEqual(password, confirm)) set(errors, 'confirm', ['password does not match.']);
//     if (isEmpty(language)) set(errors, 'language', 'please select language.');
//     if (isEmpty(business_name)) set(errors, 'business_name', 'plase select business');
//     if (isEmpty(business_type)) set(errors, 'business_type', 'Please enter business name.');
//     if (isEmpty(phone)) set(errors, 'phone', 'please enter phone number');
//     else if (!/^(0|[1-9][0-9]{9})$/i.test(phone)) set(errors, 'mobile', 'Invalid mobile format');
//      return errors;
//   }

//   handleChange(name, value) {
//     let errors = this.state.errors;
//     unset(errors, name);
//     let form = { ...this.state.form, [name]: value };
//     this.setState({ form })
//   }

//   onValueChange(name, value) {
//     let errors = this.state.errors;
//     unset(errors, name);
//     let form = {
//       ...this.state.form,
//       [name]: value
//     };
//     this.setState({ form })
//   }

//   onSave() {
//     let errors = this.validate();
//     if (!isEmpty(errors)) {
//       return this.setState({ errors })
//     }
//     this.setState({ loading: true, errors });

//     http.post("users/new_register",this.state.form).then(res => {
//       this.setState({  loading: false })
//       _handleAuthentication(res.data)
//     }).catch(err => {
//      let errors = {};
//       if (err && err.status == 422) errors = err.message;
//       console.log('login error---', errors)
//       this.setState({ errors, loading: false })

//     })
//   }
//   render() {
//     const { form, errors } = this.state
//     console.log("errors---",errors)
//     return (
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.root}>
//         <Snackbar ref={ref => this._snk = ref} />
//         <Loader visible={this.state.loading} />
//           <View style={styles.container}>
//             <Image style={styles.imageSyle} source={require('../../assets/upwrklogo.png')} />
//             <Text style={{ fontSize: 17, fontWeight: "bold", alignSelf: "center" }}>Welcome to Upwrk</Text>
//           </View>
//           <View style={{ marginHorizontal: 20, marginTop: 50 }}>
//             <Inputfield
//               label="your email address"
//               name='email'
//               errors={errors}
//               keyboardType="email-address"
//               value={form.email}
//               placeholder="your work email"
//               onRef={ref => this.email = ref}
//               onChange={this.handleChange.bind(this,'email')}

//               onSubmitEditing={() => this.password.focus()} />

//             <Inputfield
//               label="Your full Name"
//               placeholder="your full Name"
//               name='name'
//               errors={errors}
//               value={form.name}
//               onRef={ref => this.name = ref}
//               onChange={this.handleChange.bind(this,'name')}
//               onSubmitEditing={() => this.password.focus()} />

//             <Inputfield
//               label="Password"
//               name='password'
//               errors={errors}
//               onRef={ref => this.password = ref}
//               value={form.password}
//               secureTextEntry={true}
//               placeholder="*********"
//               onChange={this.handleChange.bind(this, 'password')}
//               onSubmitEditing={() => this.confirm.focus()}
//             />
//             <Inputfield
//               label="Confirm Password"
//               name='confirm'
//               errors={errors}
//               onRef={ref => this.confirm = ref}
//               value={form.confirm}
//               secureTextEntry={true}
//               placeholder="*********"
//               onChange={this.handleChange.bind(this, 'confirm')}
//               onSubmitEditing={() => this.phone.focus()}
//             />

//             <Text style={{ marginBottom: 10, fontSize: 16 }}> Select Language</Text>
//             <View style={{ width: width - 40, marginBottom: 7, height: 50, borderWidth: 1, borderRadius: 5, borderColor: primaryColor }}>
//               <Picker
//                 mode="dropdown"
//                 placeholder="Select Language"
//                 iosIcon={<Icon name="arrow-down" />}
//                 textStyle={{ color: "#5cb85c" }}
//                 itemStyle={{
//                   backgroundColor: "#d3d3d3",
//                   marginLeft: 0,
//                   paddingLeft: 10
//                 }}
//                 itemTextStyle={{ color: '#788ad2' }}
//                 style={{ width: undefined }}
//                 selectedValue={this.state.form.language}
//                 onValueChange={this.onValueChange.bind(this, 'language')}
//               >
//                 <Picker.Item label="Select Language" value={undefined} />
//                 <Picker.Item label="Hindi" value="hindi" />
//                 <Picker.Item label="English" value="english" />
//               </Picker>
//             </View>
//             {!isEmpty(errors) && !isEmpty(errors.language) && <Text style={[styles.helper, { color: "rgb(213, 0, 0)" }]}>{errors.language}</Text>}

//             <Text style={{ marginBottom: 10, fontSize: 16 }}> Select Business Type</Text>
//             <View style={{ width: width - 40, marginBottom: 7, height: 50, borderWidth: 1, borderRadius: 5, borderColor: primaryColor }}>
//               <Picker
//                 mode="dropdown"
//                 placeholder="Select Business Type"
//                 iosIcon={<Icon name="arrow-down" />}
//                 textStyle={{ color: "#5cb85c" }}
//                 itemStyle={{
//                   backgroundColor: "#d3d3d3",
//                   marginLeft: 0,
//                   paddingLeft: 10
//                 }}
//                 itemTextStyle={{ color: '#788ad2' }}
//                 style={{ width: undefined }}
//                 selectedValue={this.state.form.business_name}
//                 onValueChange={this.onValueChange.bind(this, 'business_name')}
//               >
//                 <Picker.Item label="Select Business Type" value={undefined} />
//                 <Picker.Item label="Individual" value="individual" />
//                 <Picker.Item label="Business" value="business" />
//               </Picker>
//             </View>
//             {!isEmpty(errors) && !isEmpty(errors.language) && <Text style={[styles.helper, { color: "rgb(213, 0, 0)" }]}>{errors.language}</Text>}

//             {!isEmpty(form) && form.business_name=="business" &&
//             <Inputfield
//               label="Business Name"
//               name='business_type'
//               errors={errors}
//               placeholder={"Enter Business Name"}
//               value={form.business_type}
//               onRef={ref => this.business_type = ref}
//               onChange={this.handleChange.bind(this, 'business_type')}

//               onSubmitEditing={() => this.phone.focus()} />
//             }

//             <Text style={{ fontSize: 16 }}> Phone Number</Text>
//             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

//               <View style={{ width: 90, height: 53, borderWidth: 1, borderRadius: 5, borderColor: primaryColor,marginBottom:errors.phone?14:0 }}>
//                 <Picker
//                   mode="dropdown"
//                   textStyle={{ color: "#5cb85c" }}
//                   itemStyle={{
//                     backgroundColor: "#d3d3d3",
//                     marginLeft: 0,
//                   }}
//                   itemTextStyle={{ color: '#788ad2' }}
//                   style={{ width: undefined }}
//                   selectedValue={this.state.form.prefix}
//                   onValueChange={this.onValueChange.bind(this, 'prefix')}
//                 >
//                   <Picker.Item label="+91" value="+91" />
//                 </Picker>

//               </View>

//               <View style={{ flex: 1, marginLeft: 5,marginTop:-20, }}>
//                 <Inputfield
//                   name='phone'
//                   errors={errors}
//                   keyboardType="number-pad"
//                   placeholder={"Phone number"}
//                   value={form.phone}
//                   onRef={ref => this.phone = ref}
//                   onChange={this.handleChange.bind(this, 'phone')}
//                   onSubmitEditing={() => this.password.focus()} />
//               </View>
//             </View>
//           </View>
//           <View style={{ marginHorizontal: 20, marginTop: 10, justifyContent: "flex-end", alignItems: "flex-end" }}>
//             <TouchableWithoutFeedback onPress={this.onSave}>
//               <View style={{ width: 100, height: 40, backgroundColor: "green", justifyContent: "center", alignItems: "center", elevation: 1, borderRadius: 5 }}>
//                 <Text style={{ color: "white" }}>Signup</Text>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//           <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
//             <Text style={{ marginVertical: 5 }} onPress={() => { this.props.navigation.navigate('Login') }}>
//               Already have an account ? Login
//           </Text>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20
//   },
//   helper: {
//     fontSize: 12,
//   },

//   imageSyle: {
//     height: 100,
//     width: 100,
//   }
// });
