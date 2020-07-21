export default function reorderFoodItems
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'REORDER_FOODITEMS_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'REORDER_FOODITEMS_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'REORDER_FOODITEMS_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

