import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate, resetNavigation} from '../navigation/NavigationService';
import http from '../http';
// import {
//   setUser,
//   setColor,
//   setTimeZone,
//   setBgImage,
//   setClockColor,
//   setProfileImage,
// } from '../store/Actions/common';
// import store from './../store';
import {isEmpty} from 'lodash';
const localStorageName = 'app-token';

export function _handleAuthentication(data) {
  return new Promise((resolve, reject) => {
    _setLocalData(data)
      .then(res => {
        resolve(_handleAuthUser());
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function _setLocalData(data) {
  return new Promise((resolve, reject) => {
    AsyncStorage.clear();
    AsyncStorage.setItem(localStorageName, JSON.stringify(data))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function _handleAuthUser() {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        const {user} = res;
        if (!res) {
          navigate('Auth');
          resolve(true);
        } else {
          navigate('App');
          resolve(true);
        }
      })
      .catch(err => {
        navigate('Auth');
        reject(false);
      });
  });
}
export function _handleAccess() {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        console.log('res', res);
        const {user} = res;
        if (isEmpty(res)) {
          navigate('Auth');
          resolve(true);
        } else {
          resolve(true);
        }
      })
      .catch(err => {
        navigate('Auth');
        reject(false);
      });
  });
}
export function _updateLocalData(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(localStorageName)
      .then(res => {
        let dd = JSON.parse(res);
        AsyncStorage.setItem(
          localStorageName,
          JSON.stringify({
            ...dd,
            ...data,
          }),
        )
          .then(res => {
            console.log('resss', res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function _setUser(user) {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(d => {
        AsyncStorage.setItem(localStorageName, JSON.stringify(d))
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function _getUser() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(localStorageName)
      .then(res => {
        let data = res.user;
        resolve(JSON.parse(res));
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function _isAuth() {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        if (res == null) {
          // console.log("dfkjkjs")
        }
        resolve(res);
      })
      .catch(err => reject(navigate('Auth')));
  });
}

export function _getAcessToken() {
  return new Promise((resolve, reject) => {
    _getUser()
      .then(res => {
        if (!isEmpty(res)) {
          resolve(res.api_token);
        } else {
          resolve(navigate('Auth'));
        }
      })
      .catch(err => {
        reject(navigate('Auth'));
      });
  });
}

export function _updateUser(object) {
  console.log('sdksdobject', object);
  return new Promise((resolve, reject) => {
    _getUser()
      .then(data => {
        let newData = object;
        console.log('newData---', newData);
        resolve(_setUser(newData));
      })
      .catch(err => {
        console.log('err---', err);
        reject(err);
      });
  });
}

export function _logout() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(localStorageName)
      .then(res => {
        AsyncStorage.clear();
        navigate('Auth');
        resolve(true);
      })
      .catch(err => reject(err));
  });
}
