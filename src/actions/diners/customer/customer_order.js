import axios from 'axios';
// import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
// import {Config} from "../../Config";
// import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../../store";
// import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'CUSTOMER_ORDER_SUCCESS', success}
}

function _error(error) {
  return {type: 'CUSTOMER_ORDER_ERROR', error}
}

function _processing(processing) {
  if (processing)
    return { type: 'ACTIVATE_LOADING', text: "Ordering Your Food" }
  else
    return { type: 'DEACTIVATE_LOADING' }
}

export function customerOrder(data) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: "/api/order.json",
      method: "post",
      dataType: 'json',
      data: data,
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));

      }).catch(error => {
        let response = error
        //   store.dispatch(addSuccessMessage({
        //     message: {variant: `error`, message: response.data, title: ``}
        //   }))
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default customerOrder;

