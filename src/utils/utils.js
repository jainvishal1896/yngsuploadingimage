import {Toast} from 'native-base'
import Permissions from 'react-native-permissions';
import {NativeModules,Platform} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings'
   
export default class Utils  {
   openSettings = () => {
      if(Platform.OS == 'ios') Permissions.openSettings();
      else NativeModules.CustomApp.openAppSettings(data => {
         // console.log("datatta",data)
      });
  }

 _accessPermission(permission){
      return new Promise((resolve,reject) => {
          Permissions.request(permission).then(res => {
             
              if(['denied','restricted','blocked','unavailable'].includes(res)) resolve(false);
              else resolve(true);
          }).catch(err => reject(false));   
      })
   }
   openGPSSettings = () => {
      AndroidOpenSettings.locationSourceSettings(data => {
         console.log("datatta",data)
         // NativeModules.DevSettings.reload() ;
      });
  }
   showToast(text='',type='success',duration=5000){
      Toast.show({text,duration,type,textStyle:{fontSize:12}})
   }
}