export default function getLoggedInUserReducer
    (state = {error: null, success: null, processing: ''}, action) {

    switch (action.type) {

        case 'FETCH_LOGGED_IN_USER_SUCCESS':
            return {...state, ...{success: action.success, error: null,}};
        case 'FETCH_LOGGED_IN_USER_ERROR':
            return {...state, ...{success: null, error: action.error}};
        case 'FETCH_LOGGED_IN_USER_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        default:
            return state;
    }
}