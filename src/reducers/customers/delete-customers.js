export default function deleteEvemsg
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'DELETE_CUSTOMERS_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'DELETE_CUSTOMERS_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'DELETE_CUSTOMERS_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        
        case 'DELETE_CUSTOMERS_RESET':
            return { error: null, success: null, processing: false }
        
        default:
            return state;
    }
}

