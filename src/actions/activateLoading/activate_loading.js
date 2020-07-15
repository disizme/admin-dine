export function activateLoading() {
    return dispatch => {

        dispatch({
            type: "ACTIVATE_LOADING"
        })
    }
}

export function deactivateLoading() {
    return dispatch => {

        dispatch({
            type: "DEACTIVATE_LOADING"
        })
    }
}
