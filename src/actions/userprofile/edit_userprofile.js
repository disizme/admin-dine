import axios from 'axios';
import { loginToken } from "../../components/shared/helpers/GeneralHelpers";
import { Config } from "../../Config";
import { errorHandler } from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import { addSuccessMessage } from "../successMessage/success_message";

function _success(success) {
  return { type: 'EDIT_USER_PROFILE_SUCCESS', success }
}

function _error(error) {
  return { type: 'EDIT_USER_PROFILE_ERROR', error }
}

function _userreset(success){
  return { type: 'FETCH_LOGGED_IN_USER_SUCCESS', success }
}

function _processing(processing) {
  if (processing)
    return { type: 'ACTIVATE_LOADING' }
  else
    return { type: 'DEACTIVATE_LOADING' }
}

export function editUserProfile(data) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/profile/create`,
      method: "put",
      data: data,
      headers: {
        'Authorization': 'Bearer ' + loginToken()
      }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));
        dispatch(_userreset(res));
      }).catch(error => {
        let response = errorHandler(error)
          store.dispatch(addSuccessMessage({
            message: { variant: `error`, message: response.data, title: `` }
          }))
          dispatch(_error({ response: { status: 500, data: response.data } }));
        dispatch(_processing(false));
      });
  }
}

export default editUserProfile;

