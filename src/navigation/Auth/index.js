import {createStackNavigator} from 'react-navigation';
import Login from './../../views/Auth/Login';
import Signup from '../../views/Auth/Signup';
import ForgotPassword from '../../views/Auth/ForgotPassword';
import OTPVerification from '../../views/OTP';
import LoginWithPassword from '../../views/Auth/LoginWithPassword';

const CreateAuthNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
    OTP: {
      screen: OTPVerification,
    },
    LoginWithPassword: {
      screen: LoginWithPassword,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);
export default CreateAuthNavigation;

// import {createStackNavigator} from '@react-navigation/stack';
// import Login from './../../views/Auth/Login';
// import Signup from '../../views/Auth/Signup';
// import ForgotPassword from '../../views/Auth/ForgotPassword';
// import OTPVerification from '../../views/OTP/index';
// import LoginWithPassword from '../../views/Auth/LoginWithPassword';

// const AuthStackNavigator = createStackNavigator();
// export const AuthStackNavigation = () => {
//   return (
//     <AuthStackNavigator.Navigator
//       initialRouteName="Login"
//       screenOptions={{headerShown: false}}>
//       <AuthStackNavigator.Screen name="Login" component={Login} />
//       <AuthStackNavigator.Screen name="Signup" component={Signup} />
//       <AuthStackNavigator.Screen
//         name="ForgotPassword"
//         component={ForgotPassword}
//       />
//       <AuthStackNavigator.Screen name="OTP" component={OTPVerification} />
//       <AuthStackNavigator.Screen
//         name="LoginWithPassword"
//         component={LoginWithPassword}
//       />
//     </AuthStackNavigator.Navigator>
//   );
// };

// export default AuthStackNavigation;
