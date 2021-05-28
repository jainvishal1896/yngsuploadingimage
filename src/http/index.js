import {API_URL, HOST_URL} from '../config';
import axios from 'axios';
import {_getAcessToken, _getUser} from '../api/auth';

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
let client = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: false,
});
client.interceptors.request.use(async config => {
  let token = await _getUser()
    .then(res => res.api_token)
    .catch(err => console.log('errr'));
  config.headers['Authorization'] = `${token}`;
  console.log('token---', token);
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (res) {
    const {response} = res;
    return Promise.reject({status: response.status, ...response.data});
  },
);

export default {
  get: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .get(url, {params: data})
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  post: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .post(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  patch: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .patch(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  put: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .put(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete: async function (url, data) {
    console.log('url,data', url, data);
    return new Promise((resolve, reject) => {
      client
        .delete(url, data)
        .then(res => {
          console.log('resss delete', res);
          resolve(res);
        })
        .catch(error => {
          console.log('error delete', error);
          reject(error);
        });
    });
  },
  fetch: options => client(options),
};
