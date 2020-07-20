export default function customerCheckin
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'CUSTOMER_CHECKIN_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'CUSTOMER_CHECKIN_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'CUSTOMER_CHECKIN_PROCESSING':
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

