import axios from 'axios';
import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'FETCH_PLANS_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_PLANS_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_PLANS_PROCESSING', processing }
}

export function fetchPlans() {

  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/payment/plans/`,
      method: "get",
      dataType: 'json',
      // params,
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
            message: {variant: `error`, message:  response ? response.data : "", title: ``}
          }))
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default fetchPlans;

