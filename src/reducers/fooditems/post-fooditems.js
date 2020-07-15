export default function postFoodItems
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'POST_FOODITEMS_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'POST_FOODITEMS_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'POST_FOODITEMS_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

