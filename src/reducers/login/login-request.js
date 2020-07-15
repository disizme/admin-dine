export default function getLoginRequest
    (state = {error: null, success: null, processing: ''}, action) {

    switch (action.type) {
        case 'FETCH_LOGIN_SUCCESS':
            return {...state, ...{success: action.success, error: null}};
        case 'FETCH_LOGIN_ERROR':
            return {...state, ...{success: null, error: action.error}};
        case 'FETCH_LOGIN_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        default:
            return state;
    }
}
