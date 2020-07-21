import axios from 'axios';
import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../Store";
import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'REORDER_FOOD_CATEGORY_SUCCESS', success}
}

function _error(error) {
  return {type: 'REORDER_FOOD_CATEGORY_ERROR', error}
}

function _processing(processing) {
  return { type: 'REORDER_FOOD_CATEGORY_PROCESSING', processing }
}

function _resetorder(success) {
  return {type: 'FETCH_FOOD_CATEGORY_SUCCESS', success}
}

export function reorderFoodCategory(data, original) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/categoryorder`,
      method: "post",
      data: data,
      headers: {
        "Content-type": "multipart/form-data",
        'Authorization': 'Bearer ' + loginToken()
      }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));
        // console.log("res", res.data, original.data)
        original.data.results = res.data
        dispatch(_resetorder(original));
      }).catch(error => {
        // let response = errorHandler(error)
        //   store.dispatch(addSuccessMessage({
        //     message: {variant: `error`, message: response.data, title: ``}
        //   }))
        let response = errorHandler(error)
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response ? response.data : "", title: ``}
        }))
          dispatch(_error({response:{status:500,data:response.data}}));
        dispatch(_processing(false));
      });
  }
}

export default reorderFoodCategory;
