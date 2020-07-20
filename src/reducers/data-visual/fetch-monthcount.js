export default function fetchMonthCount
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'FETCH_MONTH_COUNT_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'FETCH_MONTH_COUNT_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'FETCH_MONTH_COUNT_PROCESSING':
            // if (action.processing)
            //     return {...state, ...{processing: action.processing, success: null, error: null}}
            // else
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

