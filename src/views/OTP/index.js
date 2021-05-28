import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {
  white,
  textColor,
  texthintColor,
  primaryColor,
} from './../../styles/variables';
import {isEmpty, unset, set} from 'lodash';
import {_register, _login, _handleAuthentication} from '../../api/auth';
import Snackbar from '../../components/Common/Snackbar';
import Loader from '../../components/Indicator/Loader';
import http from '../../http/index';
import CustomButton from '../../components/Common/Button';
import {Icon} from 'native-base';
import UpdateMobile from '../Auth/UpdateMobile';
import RNOtpVerify from 'react-native-otp-verify';
// import StackHeader from '../../components/Header/StackHeader';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const {width} = Dimensions.get('window');

export default class OTPVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mobile: '',
      code: '',
      errors: {},
      otpverified: {},
      updating: false,
      timer: 60,
      isUserExists: false,
      dataotp: '',
    };

    this.onVerify = this.onVerify.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
  }

  componentWillMount() {
    this._ismounted = true;
    let otpverified = this.props.navigation.getParam('data');
    if (this.props.navigation.state.params == null) {
      return this.props.navigation.navigate('Login');
    }
    this.setState({
      mobile: otpverified.mobile,
      token: otpverified.token,
      type: 'login',
      isUserExists: otpverified.isUserExists,
      dataotp: otpverified.otp,
    });
  }

  onChangeMobile(phone) {
    this.setState({mobile: phone, updating: false});
  }

  componentDidMount() {
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
  }

  otpHandler = message => {
    let getmsg = message.split(' ');
    console.log('getmsg', getmsg);
    this.setState({code: getmsg[4]}, () => {
      this.onVerify();
    });
  };

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    this._ismounted = false;
    clearInterval(this.interval);
  }
  onVerify() {
    const {code, isUserExists} = this.state;
    if (isEmpty(code) && code == '' && code.length != 4) {
      return this._snk.show('please enter valid otp,otp must be required');
    }

    this.setState({loading: true});
    http
      .post(`login/loginwithotp`, {
        mobile: this.state.mobile,
        otp: this.state.code,
      })
      .then(res => {
        console.log('res--r', res);

        this.setState({loading: false});
        _handleAuthentication(res.customer_info);
      })
      .catch(err => {
        console.log('err--r', err);
        this.setState({loading: false});
        this._snk.show(err.message.otp[0]);
      });
  }

  onChanged(code) {
    this.setState({code}, () => {
      if (this.state.code.length == 4) {
        this.onVerify();
      }
    });
  }

  resendOtp() {
    this.setState({loading: true, code: ''});
    http
      .post('login/sendOtp', {
        mobile: this.state.mobile,
        token: this.state.token,
      })
      .then(res => {
        console.log('res--resend -in', res);
        this.setState({loading: false});
      })
      .catch(err => {
        console.log('err--resend-in', err);
        this.setState({loading: false});
        this._snk.show(err.message);
      });
  }
  render() {
    const {otpverified, errors} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <StackHeader bgcolor="white" justifyContent={"flex-start"} iconcolor={primaryColor} navigation={this.props.navigation} /> */}

        <Loader visible={this.state.loading} />
        <Snackbar ref={ref => (this._snk = ref)} />
        <View style={{marginHorizontal: 25, marginVertical: 15}}>
          <Text
            numberOfLines={1}
            style={{
              backgroundColor: 'transparent',
              fontSize: 21,
              fontWeight: 'bold',
              marginTop: 10,
              color: primaryColor,
            }}>
            Verify with OTP
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              numberOfLines={1}
              style={{
                backgroundColor: 'transparent',
                fontSize: 12,
                marginTop: 5,
                color: '#aaa9af',
              }}>
              Sent via SMS to {this.state.mobile}
            </Text>
            {this.state.type == 'signup' && (
              <Icon
                onPress={() => this.setState({updating: true})}
                style={{marginLeft: 10, fontSize: 22}}
                type="AntDesign"
                name="edit"
              />
            )}
          </View>
        </View>
        {this.state.loading && <Loader visible={this.state.loading} />}
        <View style={{flex: 1, paddingHorizontal: 25, paddingVertical: 10}}>
          <View style={{height: 60}}>
            <OTPInputView
              style={{width: '65%', height: 60}}
              pinCount={4}
              code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={this.onChanged.bind(this)}
              // autoFocusOnLoad
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                {justifyContent: 'space-between'},
              ]}
              onCodeFilled={code => {
                this.setState({code});
              }}
            />
          </View>

          {this.state.timer != 0 ? (
            <Text
              style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
              Trying to auto-fill OTP 00:{this.state.timer}
            </Text>
          ) : (
            <TouchableWithoutFeedback onPress={this.resendOtp}>
              <Text
                style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
                Did not receive OTP{' '}
                <Text style={{color: primaryColor}}> Resend OTP</Text>
              </Text>
            </TouchableWithoutFeedback>
          )}

          <Text
            onPress={() => {
              this.props.navigation.navigate('LoginWithPassword');
            }}
            style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
            Log in using <Text style={{color: primaryColor}}> Password</Text>
          </Text>
          <Text style={{marginHorizontal: 5, marginTop: 15, color: '#aaa9af'}}>
            Having trouble logging in ?{' '}
            <Text style={{color: primaryColor}}>
              {' '}
              Get Help {this.state.dataotp}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textbottomview: {
    flexDirection: 'row',
    position: 'absolute',
    marginHorizontal: '20%',
    paddingBottom: 10,
  },
  textbottom: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: white,
    fontFamily: 'Poppins',
  },
  textbottom1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: textColor,
    fontFamily: 'Poppins',
  },
  viewbutton: {
    height: 45,
    width: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: textColor,
    marginRight: -10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textbuttontext: {
    color: white,
    fontFamily: 'Poppins',
  },
  buttonicon: {
    color: white,
    fontSize: 20,
    marginTop: 3,
  },
  textforgot: {
    fontSize: 13,
    color: texthintColor,
    fontFamily: 'Poppins',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 35,
    height: 45,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

// import React from 'react';
// import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
// import { white, textColor, texthintColor, primaryColor } from './../../style/variables';
// import { isEmpty, unset, set } from 'lodash';
// import { _register, _login, _handleAuthentication } from '../../api/auth';
// import Snackbar from '../../component/Common/Snackbar';
// import Loader from '../../component/Indicator/Loader';
// import http from '../../http';
// import CustomButton from '../../component/Common/Button';
// import { Icon } from 'native-base';
// import UpdateMobile from '../Auth/UpdateMobile';
// import RNOtpVerify from 'react-native-otp-verify';
// import StackHeader from '../../component/Header/StackHeader';
// import OTPInputView from '@twotalltotems/react-native-otp-input'

// const { width } = Dimensions.get('window');

// export default class OTPVerification extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: false,
//       otp_code: "2345",
//       mobile: "",
//       showOtp: "",
//       errmessages: "",
//       code:"",
//       errors: {},
//       otpverified: {},
//       updating: false
//     }
//     this.onVerify = this.onVerify.bind(this)
//     this.resendOtp = this.resendOtp.bind(this)

//   }

//   componentWillMount() {
//     this._ismounted = true;
//     let otpverified = this.props.navigation.getParam("data")
//      if (this.props.navigation.state.params == null) {
//       return this.props.navigation.navigate("Login")
//     }
//     this.setState({  mobile:otpverified.mobile,token:otpverified.token,type:"login" })
//   }

//   onChangeMobile(phone) {
//     this.setState({ mobile: phone, updating: false })
//   }

//   componentDidMount() {
//     RNOtpVerify.getOtp()
//       .then(p => RNOtpVerify.addListener(this.otpHandler),)
//       .catch(p => console.log(p));
//   }

//   otpHandler = (message) => {
//     let getmsg = message.split(" ")
//     this.setState({ code: getmsg[5] },()=>{
//       this.onVerify()})
//   }

//   componentWillUnmount() {
//     this._ismounted = false;
//   }
//   onVerify() {
//     const { code, otpverified } = this.state
//     console.log("otp_code0", code.length)

//     if (isEmpty(code) && code == "" && code.length != 4) {
//       return this._snk.show('please enter valid otp,otp must be required');
//     }

//     this.setState({ loading: true });
//     console.log("data test", {
//       phone: this.state.mobile,
//       token:this.state.token,
//       otp: this.state.code,

//     })
//     http.post("verify_otp?type=login", {
//       phone: this.state.mobile,
//       token:this.state.token,
//       otp: this.state.code,
//     }).then(res => {
//       console.log("resss",res)
//       _handleAuthentication(res.data)
//       this.setState({ loading: false })

//     }).catch(err => {
//       console.log("err--otp-in", err)
//       this.setState({ loading: false })
//       this._snk.show(err.message);

//     })

//   }

//   resendOtp() {

//     this.setState({ loading: true,code:"" });

//     http.post("get_otp?type=logins&devicetype=phone", {
//       phone: this.state.mobile,
//       token:this.state.token
//     }).then(res => {
//       console.log("res--resend -in", res)
//       this.setState({ loading: false,})

//     }).catch(err => {
//       console.log("err--resend-in", err)
//       this.setState({ loading: false })
//       this._snk.show(err.message);

//     })
//   }
//   render() {
//     const { otpverified, errors } = this.state;
//     console.log("thisss",this.state.code)
//     return (

//       <View style={{ flex: 1, backgroundColor: "#fff" }}>
//         <StackHeader title="Verify Code" justifyContent={"flex-start"} navigation={this.props.navigation} />

//         <Loader visible={this.state.loading} />
//         <Snackbar ref={ref => this._snk = ref} />
//         <View
//           style={{ padding: 15, justifyContent: 'flex-end', alignItems: 'center' }}
//         >
//           <Text
//             numberOfLines={1}
//             style={{
//               backgroundColor: 'transparent',
//               fontSize: 20,
//               fontWeight: "bold",
//               marginTop: 10,
//               color: primaryColor,
//             }}
//           >
//             Verify the authorisation code
//         </Text>
//           <View style={{ flexDirection: "row" }}>
//             <Text
//               numberOfLines={1}
//               style={{
//                 backgroundColor: 'transparent',
//                 fontSize: 15,
//                 marginTop: 3,
//                 textAlign: "left",
//                 color: primaryColor,
//               }}
//             >
//            Sent to {this.state.mobile}
//             </Text>
//             {
//               this.state.type == "signup" &&
//               <Icon onPress={() => this.setState({ updating: true })} style={{ marginLeft: 10, fontSize: 22 }} type="AntDesign" name="edit" />
//             }
//           </View>

//         </View>
//         {
//           this.state.loading && <Loader visible={this.state.loading} />
//         }
//         <View style={{ flex: 1, paddingHorizontal: 25, alignItems: 'center', }}>
//           <View style={{ height: 60 }}>
//             <OTPInputView
//               style={{ width: '80%', height: 60 }}
//               pinCount={4}
//               code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
//               onCodeChanged = {code => { this.setState({code })}}
//               autoFocusOnLoad
//               codeInputFieldStyle={styles.underlineStyleBase}
//               codeInputHighlightStyle={styles.underlineStyleHighLighted}
//               onCodeFilled={code => { this.setState({code })}}
//             />
//           </View>
//           <View style={{ marginTop: 20 }}>
//             <CustomButton title="Verify" buttonstyles={{ borderRadius: 0, width: 150, backgroundColor: "green" }} onPress={this.onVerify} />
//           </View>
//           <TouchableWithoutFeedback onPress={this.resendOtp}>

//             <Text style={styles.footerText}>Resend OTP ?</Text>
//           </TouchableWithoutFeedback>

//         </View>
//         {this.state.updating &&
//           <UpdateMobile
//             phone={this.state.mobile}
//             visible={this.state.updating}
//             onChangeMobile={this.onChangeMobile.bind(this)}
//             onCancel={() => this.setState({ updating: false })} />
//         }
//       </View>

//     );
//   }
// }
// const styles = StyleSheet.create({

//   textbottomview: {
//     flexDirection: "row",
//     position: "absolute",
//     marginHorizontal: "20%",
//     paddingBottom: 10
//   },
//   textbottom: {
//     textAlign: "center",
//     fontWeight: "bold",
//     color: white,
//     fontFamily: "Poppins"
//   },
//   textbottom1: {
//     textAlign: "center",
//     fontWeight: "bold",
//     color: textColor,
//     fontFamily: "Poppins"
//   },
//   viewbutton: {
//     height: 45,
//     width: 150,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//     backgroundColor: textColor,
//     marginRight: -10,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row"
//   },
//   textbuttontext: {
//     color: white,
//     fontFamily: "Poppins"
//   },
//   buttonicon: {
//     color: white,
//     fontSize: 20,
//     marginTop: 3
//   },
//   textforgot: {
//     fontSize: 13,
//     color: texthintColor,
//     fontFamily: "Poppins"
//   },
//   borderStyleBase: {
//     width: 30,
//     height: 45
//   },

//   borderStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },

//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//   },

//   underlineStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },

// })
