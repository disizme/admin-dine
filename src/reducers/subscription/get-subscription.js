export default function getSubscription
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'GET_SUBSCRIPTION_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'GET_SUBSCRIPTION_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'GET_SUBSCRIPTION_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        case 'SUBSCRIPTION_RESET':
                    return { error: null, success: null, processing: false };

        default:
            return state;
    }
}

