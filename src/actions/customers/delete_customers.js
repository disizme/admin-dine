import axios from 'axios';
import { loginToken } from "../../components/shared/helpers/GeneralHelpers";
import { Config } from "../../Config";
import { errorHandler } from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import { addSuccessMessage } from "../successMessage/success_message";

function _success(success) {
  return { type: 'DELETE_CUSTOMERS_SUCCESS', success }
}

function _error(error) {
  return { type: 'DELETE_CUSTOMERS_ERROR', error }
}

function _reset() {
  return {type: 'DELETE_CUSTOMERS_RESET'}
}

function _processing(processing) {
  if (processing)
    return { type: 'ACTIVATE_LOADING' }
  else
    return { type: 'DEACTIVATE_LOADING' }
}

export function deleteCustomers(id) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/customers/${id}`,
      method: "delete",
      headers: {
        'Authorization': 'Bearer ' + loginToken()
      }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));
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

export function deleteCustomersReset() {
  return dispatch => {
    dispatch(_reset());
  }
}

export default deleteCustomers;

