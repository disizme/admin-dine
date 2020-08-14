import axios from 'axios';
import {Config} from "../../Config";
import { errorHandler } from '../../components/shared/helpers/ErrorHandler';
import { addSuccessMessage } from '../successMessage/success_message';
import store from "../../Store";

function _processing(processing) {
  if (processing)
    return {type: 'ACTIVATE_LOADING'}
  else
    return {type: 'DEACTIVATE_LOADING'}
}

export function verifyUserAccount(token, history){
  let data = { 
    key: token
  }
  return dispatch => {
    dispatch(_processing(true));
      axios.post(Config.BaseUrl+`/user/verify-email/`,data)
      .then(res => {
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: "Your account is verified. Please Login to continue.", title: ``}
        }))
        dispatch(_processing(false));
        history.push('/login')
      })
      .catch(error => {
        let response = errorHandler(error, "login")
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response.data, title: ``}
        }))
        dispatch(_processing(false));
      })
  }
}

export function changePassword(data, history) {
  return dispatch => {
  dispatch(_processing(true));
    axios.post(Config.BaseUrl + '/password/reset', data)
      .then(res => {
        dispatch(_processing(false));
        store.dispatch(addSuccessMessage({
          message: { variant: `success`, message: "Your Password is changed. Please Login to continue.", title: `` }
        }))
        history.push('/login')
      })
      .catch(error => {
        dispatch(_processing(false));
        // let response = errorHandler(error, "login")
        store.dispatch(addSuccessMessage({
          message: { variant: `error`, message: "Something went wrong! Please Try Again.", title: `` }
        }))
      })
  }
}

export function sendMail(data){
  return dispatch => {
    dispatch(_processing(true));
      axios.post(Config.BaseUrl+'/password/reset-request', data)
      .then(res => {
        console.log(res)
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: "Please check your mail for password recovery.", title: ``}
        }))
        dispatch(_processing(false));
      })
      .catch(error => {
        console.log(error)
        let response = errorHandler(error, "login")
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response.data, title: ``}
        }))
        dispatch(_processing(false));
      })
}
}

