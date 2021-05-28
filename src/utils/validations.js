import {isEmpty,set} from 'lodash';
export const required = field => value => value  ? undefined : `${field} is required`

export const maxLength = max => value =>
  value && value.length > max ? `must be ${max} characters or less` : undefined

export const minLength = min => value =>
  value && value.length < min ? `must be ${min} characters or more` : undefined

export const number = value =>
  value && isNaN(Number(value)) ? 'must be a number' : undefined

export const mustEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'invalid email address'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'only alphanumeric characters'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'invalid phone number, must be 10 digits'
    : undefined

export const numeric = value =>
value && /[^0-9]/i.test(value)
  ? 'only numeric or digit characters are allowed'
  : undefined    
export const confirmPassword = value => allValues => value && value !== allValues.password ? "Passwords don't match" : undefined;
export const passwordsMustMatch = (value, allValues) =>  value !== allValues.password ? 'Passwords do not match' :undefined
export const match = matchName => (value, allValues, props) =>
  value !== allValues[matchName]
    ? `This field must match with ${matchName} field`
    : undefined;
    export const minValue = min => value => value && Number(value) < min ? `must be greater then ${min}`:undefined;

export const maxValue = max => value => value && Number(value) > max ? `must be less then ${max}`:undefined;

export const validFormat = value => value && !/(0[1-9]|1[0-2])\/\d{4}/.test(value) ? 'date format must be mm/yyyy':undefined;

export const integer = value => value && !Number.isInteger(Number(value)) ? 'Must be an integer':undefined;

export const  mustValidation = (key,value,min=1,max=100) => {
  let inputKey = key.replace('_',' ')
  let errors = [];
  if(isEmpty(value)){
    set(errors,`${key}.messages`,`Please enter ${inputKey}`);
  }else if(value.length < min){
    set(errors,`${key}.messages`,`${inputKey} must be greater then ${min} character`);
  }else if(value.length > max){
    set(errors,`${key}.messages`,` ${inputKey} must be less then ${max} character`);
  }
  return errors;
}
