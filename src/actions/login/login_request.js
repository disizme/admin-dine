import axios from 'axios';
import {Config} from "../../Config";
import { errorHandler } from '../../components/shared/helpers/ErrorHandler';
import store from "../../Store";
import { addSuccessMessage } from '../successMessage/success_message';

function _success(success) {
  return {type: 'FETCH_LOGIN_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_LOGIN_ERROR', error}
}

function _processing(processing) {
  if (processing)
    return {type: 'ACTIVATE_LOADING'}
  else
    return {type: 'DEACTIVATE_LOADING'}
}

export function getLoginRequest(data) {
  return dispatch => {

    dispatch(_processing(true));

    let base_url = Config.BaseUrl;
    // data["grant_type"] = "password"
    // data["app_type"] = "admin"
    // data["role_id"] = 1
    axios({
      url: base_url + `/login/`,
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
        let response = errorHandler(error)
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response.data, title: ``}
        }))
        dispatch(_error(error));
        dispatch(_processing(false));
      });

  }
}

export default getLoginRequest;
