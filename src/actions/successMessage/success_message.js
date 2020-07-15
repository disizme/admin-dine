export function addSuccessMessage(message) {
    return dispatch => {
        dispatch({
            type: "ADD_SUCCESS_MESSAGE",
            message
        })
    }
}

export function deleteSuccessMessage() {
    return dispatch => {

        dispatch({
            type: "DELETE_SUCCESS_MESSAGE"
        })
    }
}
