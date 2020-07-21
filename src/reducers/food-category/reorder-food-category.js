export default function reorderFoodCategory
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'REORDER_FOOD_CATEGORY_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'REORDER_FOOD_CATEGORY_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'REORDER_FOOD_CATEGORY_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

