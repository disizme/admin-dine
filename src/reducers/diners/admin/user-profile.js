export default function userProfile
    (state = {error: null, success: null, processing: false}, action) {
    switch (action.type) {
        case 'USER_PROFILE_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'USER_PROFILE_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'USER_PROFILE_PROCESSING':
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

