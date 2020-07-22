import axios from 'axios';
import {loggedIn} from "../../components/shared/helpers/GeneralHelpers";
import {Config} from "../../Config";
import { tokenInterception } from '../../components/shared/helpers/AuthenticationHelper';

function _success(success){
    return { type: 'FETCH_LOGGED_IN_USER_SUCCESS', success }
}
function _error(error){
    return { type:'FETCH_LOGGED_IN_USER_ERROR', error }
}
function _processing(processing){
    return { type: 'FETCH_LOGGED_IN_USER_PROCESSING', processing }
}

export function getLoggedInUser(userdata)
{
    if(userdata){
        return dispatch => {
            dispatch(_success({'data': userdata}));
        }
    }else if (loggedIn) {
        return dispatch => {

            dispatch(_processing(true));
            let base_url = Config.BaseUrl;
            let config = { headers: {'Authorization': 'Bearer ' + localStorage.getItem('Bearer') }};
            let request = axios.get(base_url + (`/profile/`), config)

                .then(function(res){
                    let ims = { ...res.data }
                    ims["photo"] = ims.photo ? Config.urlbase+ ims.photo : ims.photo
                    res["data"] = ims
                    // console.log(res)
                    dispatch(_success(res));
                    dispatch(_processing(false));
                }).catch(function(error){
                    dispatch(_error(error));
                    dispatch(_processing(false));
                    if (error && error.response && error.response.status === 401) {
                        tokenInterception()
                    }
                });

            return { type: 'FETCH_LOGGED_IN_USER_SUCCESS', payload: request }
        }
    }
}

export default getLoggedInUser;
