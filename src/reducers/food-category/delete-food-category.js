export default function deleteFoodCategory
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'DELETE_FOOD_CATEGORY_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'DELETE_FOOD_CATEGORY_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'DELETE_FOOD_CATEGORY_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};
        
        case 'DELETE_FOOD_CATEGORY_RESET':
            return { error: null, success: null, processing: false }
        
        default:
            return state;
    }
}

