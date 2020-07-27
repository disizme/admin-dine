import axios from 'axios';
import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'FETCH_CUSTOMERS_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_CUSTOMERS_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_CUSTOMERS_PROCESSING', processing }
}

export function fetchCustomers(attribute) {
  let params = {
      offset: new Date().getTimezoneOffset(),
      page: (attribute && attribute.page) || 1,
  }
  // let params = {
  //     limit: (attribute && attribute.limit) || 20,
  //     page: (attribute && attribute.page) || 1,
  //     // q: attribute.q || ``,
  //     sort_field: (attribute && attribute.sort_field) || `messageid`,
  //     sort_by: (attribute && attribute.sort_by) || 'desc'
  // }
  if(attribute && attribute.filter){ 
      Object.keys(attribute.filter).map(i => {
        let item = attribute.filter[i]
        params[`${i}`] = item
        return i
      })
    }
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/customers`,
      method: "get",
      dataType: 'json',
      params,
      headers: {
        'Authorization': 'Bearer ' + loginToken()
      }
    };
    axios(config).then(res => {
        dispatch(_processing(false));

        if(res.data.count <=10){
          res.data["current_page"] = 1
          res.data["last_page"] = 1
          res.data["from"] = 1
          res.data["to"] = res.data.count
        }else{
          if(res.data.previous === null){
            res.data["current_page"] = 1
            res.data["last_page"] = Math.ceil(res.data.count/10)
            res.data["from"] = 1
            res.data["to"] = 10
          }else if(res.data.next === null){
            res.data["current_page"] = Math.ceil(res.data.count/10)
            res.data["last_page"] = Math.ceil(res.data.count/10)
            res.data["from"] = Math.floor(res.data.count/10) * 10 + 1
            res.data["to"] = res.data.count
          }else{
            let nextPage = res.data.next.split("page=")[1]
            res.data["current_page"] = parseInt(nextPage) - 1
            res.data["last_page"] = Math.ceil(res.data.count/10)
            res.data["from"] = (parseInt(nextPage) - 2) * 10 + 1
            res.data["to"] = (parseInt(nextPage) - 2) * 10 + 10
          }
        }

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

export default fetchCustomers;

