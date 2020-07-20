import axios from 'axios';
import { Config } from '../../../Config';
// import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
// import {Config} from "../../Config";
// import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
// import {addSuccessMessage} from "../successMessage/success_message";

function _success(success) {
  return {type: 'USER_PROFILE_SUCCESS', success}
}

function _error(error) {
  return {type: 'USER_PROFILE_ERROR', error}
}

function _processing(processing) {
  return { type: 'USER_PROFILE_PROCESSING', processing }
}
export function userProfile(slug) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl + `/${slug}/profile`,
      method: "get",
      dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
    axios(config).then(res => {
        dispatch(_processing(false));
        console.log("tr", res)
        let ims = res.data
        ims["photo"] = Config.urlbase+ims.photo
        res["data"] = ims
        dispatch(_success(res));

      }).catch(error => {
        let response = error
        //   store.dispatch(addSuccessMessage({
        //     message: {variant: `error`, message: response.data, title: ``}
        //   }))
        console.log("ero", error)
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default userProfile;

