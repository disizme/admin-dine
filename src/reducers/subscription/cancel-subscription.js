export default function cancelSubscription
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'CANCEL_SUBSCRIPTION_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'CANCEL_SUBSCRIPTION_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'CANCEL_SUBSCRIPTION_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        
        case 'CANCEL_SUBSCRIPTION_RESET':
            return { error: null, success: null, processing: false }

        default:
            return state;
    }
}

