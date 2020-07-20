export default function customerOrder
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'CUSTOMER_ORDER_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'CUSTOMER_ORDER_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'CUSTOMER_ORDER_PROCESSING':
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

