import axios from 'axios';
import {Config} from "../../Config";
import { errorHandler } from '../../components/shared/helpers/ErrorHandler';
import { addSuccessMessage } from '../successMessage/success_message';
import store from "../../Store";

export function verifyUserAccount(token, history){
  let data = { 
    key: token
  }
  return dispatch => {
      axios.post(Config.BaseUrl+`/user/verify-email/`,data)
      .then(res => {
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: "Your account is verified. Please Login to continue.", title: ``}
        }))
        history.push('/login')
      })
      .catch(error => {
        let response = errorHandler(error, "login")
        store.dispatch(addSuccessMessage({
          message: {variant: `error`, message: response.data, title: ``}
        }))
      })
  }
}


// export function changePassword(data){
//   return dispatch => {
//       axios.post(Config.baseUrl +'/update-password',data)
//       .then(res =>{
//           dispatch(fetchSuccessMsg(res.data))
//       })
//       .catch(error => {
//           dispatch(fetchError(error))
//       })
//   }
// }

// export function sendMail(data){
//   return dispatch => {
//       axios.post(Config.baseUrl+'/forgot-password', data)
//       .then(res => {
//           dispatch(fetchSuccessMsg(res.data))
//       })
//       .catch(error => {
//           dispatch(fetchError(error))
//       })
// }
// }

