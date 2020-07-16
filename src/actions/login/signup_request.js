import axios from 'axios';
import {Config} from "../../Config";
import { errorHandler } from '../../components/shared/helpers/ErrorHandler';
import { addSuccessMessage } from '../successMessage/success_message';
import store from "../../Store";

function _success(success) {
  return {type: 'FETCH_SIGNUP_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_SIGNUP_ERROR', error}
}

function _processing(processing) {
  if (processing)
    return {type: 'ACTIVATE_LOADING'}
  else
    return {type: 'DEACTIVATE_LOADING'}
}

export function getSignupRequest(data) {
  return dispatch => {

    dispatch(_processing(true));

    let base_url = Config.BaseUrl;
    // data["grant_type"] = "password"
    // data["app_type"] = "admin"
    // data["role_id"] = 1
    axios({
      url: base_url + `/user/create`,
      method: "post",
      dataType: 'json',
      data: data,
      headers: {
        // 'Authorization': 'Bearer ' + loginToken
      }
    }).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));

      }).catch(error => {
        console.log(error.response)
        let response = errorHandler(error)
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response.data, title: ``}
        }))
        dispatch(_error(error));
        dispatch(_processing(false));
      });

  }
}

export default getSignupRequest;
