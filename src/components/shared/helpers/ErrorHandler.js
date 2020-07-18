import { tokenInterception } from "./AuthenticationHelper"

export const errorHandler = (error, org) => {
    if (error.response.status === 401 && org !== "login"){
        tokenInterception()
        return { data: "Refreshing Token"}
    }else if (error.toString() === "Error: Network Error" || !error.response) {
        return {
            type: "error",
            data: "Network Error. Please check your internet connection."
        }
    } else {
        if (error.response.data.message || error.response.data.msg || error.response.data.detail) {
            let msg = msgHandler(error.response)
            return {
                type: "error",
                data: msg
            }
        } else {
            let code = error.response.status
            let msg = ""
            switch (code){
                case 401:
                    msg = 'Unauthorised or Invalid User credentials.'
                    break;
                case 408: 
                    msg = 'Request Timeout. Please reload the page'
                    break;
                case 422:
                    msg = 'Validation Error'
                    break;
                case 403:
                    msg = 'Invalid Request'
                    break;
                case 500:
                    if(error.response.config.method === 'post'){
                        msg = 'Backend Error'
                        break;
                    }else {
                        msg = 'Server is down. Please try again in a few minutes.'
                        break;
                    }   
                case 502: 
                    msg = 'Bad Gateway'
                    break;
                case 503:
                    msg = "Service Unavailable. Please try again in a few minutes." 
                    break;
                case 504: 
                    msg = "Gateway Timeout. Please try again in a few minutes." 
                    break;   
                default: 
                    msg = "Something Went Wrong!"
                    break;
            }
            return {
                type: "error",
                data: msg
            }
        }

    }
}


function msgHandler(error){
    if(error.data.message){
        if(error.data.message.length){
            return error.data.message
        }else{
            let m = Object.keys(error.data.message)
            let errormsg = ''
            for(let i=0;i<m.length; i++){
                errormsg = errormsg + error.data.message[`${m[i]}`][0] + '  '
            }
            return errormsg
            }
    }else if(error.data.msg){
       return error.data.msg
    }else if(error.data.detail){
        return error.data.detail
    }else{
        let m = Object.keys(error.data)
        if(m.length<5){
        let errormsg = ''
        for(let i=0;i<m.length; i++){
            errormsg = errormsg + error.data[`${m[i]}`][0] + '  '
        }
        return errormsg
    }else if(error.data && error.data.includes("html")){
        return "Something Went Wrong!"
    }else {
        return "Something Went Wrong!"
    }
}
}