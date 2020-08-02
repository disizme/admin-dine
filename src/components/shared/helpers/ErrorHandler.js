import { tokenInterception } from "./AuthenticationHelper"

export const errorHandler = (error, org) => {
    if (error && error.response && error.response.status === 401 && org !== "login"){
        console.log(error.response)
        tokenInterception()
        return { data: "Refreshing Token"}
    }else if (error.toString() === "Error: Network Error" || !error.response) {
        return {
            type: "error",
            data: "Network Error. Please check your internet connection."
        }
    } else {
        if (error.response.data) {
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
    if(error.data.detail){
        let err = error.data.detail
        let returnmsg = ""
        if(Array.isArray(err)){
            let errmsg = err.map(i => {
                let keys = Object.keys(i)
                let msg= ""
                for(let  j =0; j<keys.length; j++){
                    if(keys[j] === "is_verified"){
                        msg = "Please check your email to verify your account."
                    }else if(Array.isArray(i[keys[j]])){
                        msg = msg + " " + i[keys[j]][0]
                    }else if(typeof i[keys[j]] === "object"){
                        let innerVal = Object.values(i[keys[j]])
                        msg = msg + " " + innerVal.join(", ")
                    }else{
                        msg = msg + JSON.stringify(i[keys[j]])
                    }
                }
                return msg
            })
            returnmsg = errmsg.join(", ")
        }else {
            returnmsg = JSON.stringify(err)
        }
        return returnmsg.replace(/\[|\]|\{|\}|\"|\'/g, "").replace(/\:/g," ")
    }else if(error.data && error.data.includes("html")){
        return "Something Went Wrong!"
    }else {
        return "Something Went Wrong!"
    }
}