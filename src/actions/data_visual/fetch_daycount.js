import axios from 'axios';
import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'FETCH_DAY_COUNT_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_DAY_COUNT_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_DAY_COUNT_PROCESSING', processing }
}

export function fetchDayCount() {
  // let params = {
  //     limit: (attribute && attribute.limit) || 20,
  //     page: (attribute && attribute.page) || 1,
  //     // q: attribute.q || ``,
  //     sort_field: (attribute && attribute.sort_field) || `messageid`,
  //     sort_by: (attribute && attribute.sort_by) || 'desc'
  // }
  // if(attribute && attribute.filter){ 
  //     Object.keys(attribute.filter).map(i => {
  //       let item = attribute.filter[i]
  //       params[`filter[${i}]`] = item
  //       return i
  //     })
  //   }
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/dailycount`,
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
          // store.dispatch(addSuccessMessage({
          //   message: {variant: `error`, message:  response ? response.data : "", title: ``}
          // }))
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default fetchDayCount;

