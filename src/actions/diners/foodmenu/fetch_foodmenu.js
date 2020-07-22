import axios from 'axios';
// import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
// import {Config} from "../../Config";
// import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import { Config } from '../../../Config';
// import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'FETCH_FOODMENU_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_FOODMENU_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_FOODMENU_PROCESSING', processing }
}

export function fetchFoodMenu(slug) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl+`/${slug}/menu`,
      // url: "/api/food.json",
      method: "get",
      dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
    // setTimeout(() => {
      axios(config).then(res => {
        dispatch(_processing(false));
        let ims = res.data.results && res.data.results.map(i => {
          i["image"] = Config.urlbase+i.image
          return i
        })
        res.data.results = ims
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

export default fetchFoodMenu;

