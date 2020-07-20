import axios from 'axios';
// import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
// import {Config} from "../../Config";
// import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import { Config } from '../../../Config';
// import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'FETCH_CATEGORY_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_CATEGORY_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_CATEGORY_PROCESSING', processing }
}

export function fetchCategory(slug) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl+`/${slug}/category`,
      // url: '/api/category.json',
      method: "get",
      dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
    // setTimeout(() => {
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
    // }, 3000);
  }
}

export default fetchCategory;

