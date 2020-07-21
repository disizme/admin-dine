import axios from 'axios';
import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'REORDER_FOODITEMS_SUCCESS', success}
}

function _error(error) {
  return {type: 'REORDER_FOODITEMS_ERROR', error}
}

function _processing(processing) {
  return { type: 'REORDER_FOODITEMS_PROCESSING', processing }
}

function _resetorder(success) {
  return {type: 'FETCH_FOODITEMS_SUCCESS', success}
}

export function reorderFooditems(data) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/menuorder`,
      method: "post",
      // dataType: 'json',
      data: data,
      headers: {
        "Content-type": "multipart/form-data",
        'Authorization': 'Bearer ' + loginToken()
      }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));
        dispatch(_resetorder(res));
      }).catch(error => {
        let response = errorHandler(error)
          store.dispatch(addSuccessMessage({
            message: {variant: `error`, message: response.data, title: ``}
          }))
          dispatch(_error({response:{status:500,data:response.data}}));
        dispatch(_processing(false));
      });
  }
}

export default reorderFooditems;
