export default function postFoodCategory
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'POST_FOOD_CATEGORY_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'POST_FOOD_CATEGORY_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'POST_FOOD_CATEGORY_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

