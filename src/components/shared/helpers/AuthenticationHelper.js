import jwt_decode from "jwt-decode"
import {Config} from "../../../Config";
import axios from "axios/index";

export const checkTokenExpiry = () => {
    let decoded = jwt_decode(localStorage.getItem("Bearer"))
    let token_date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    token_date.setUTCSeconds(decoded.exp);
    let current_date = new Date(Date.now() + 1000 * 0.5)
    return current_date > token_date ? true : false;
};

export const tokenInterception = () => {
    return new Promise((resolve, reject) => {
        let config = {
            url: Config.BaseUrl + `/token/refresh`,
            method: "post",
            dataType: 'json',
            data: {
                refresh: localStorage.getItem("rt")
            },
            headers: {}
        };
        axios(config).then(res => {
            localStorage.setItem('Bearer', res.data.access);
            localStorage.setItem('rt', res.data.refresh);
            console.log("token refreshed")
            resolve(res)
        }).catch(error => {
            localStorage.clear()
            window.location.reload()
            reject(error)
        });

    })
}

export const interceptor = () => {
    return new Promise((resolve, reject) => {
        let config = {
            url: Config.AuthUrl + `/users/refresh-token`,
            method: "post",
            dataType: 'json',
            data: {
                refresh_token: localStorage.getItem("rt")
            },
            headers: {}
        };
        if(checkTokenExpiry()){
            axios(config).then(res => {
                localStorage.setItem('Bearer', res.data.access_token);
                localStorage.setItem('rt', res.data.refresh_token);
                console.log("token refreshed")
                resolve(res)
            }).catch(error => {
                reject(false)
            });
        }else{
            resolve(true)
        }
    })
}

export const setHost = () => {
    let hostname = window.location.hostname
    let hostArray = hostname.split(".").reverse()
    let message =(hostArray.length < 3) ?"local":hostArray[2]
    if (message !== "beta" && message !== "dev" && message !== "local") {
        message = "production"
    }
    let reloader = localStorage.getItem("host")
    localStorage.setItem("host", message)
    if(!reloader) window.location.reload()
}




