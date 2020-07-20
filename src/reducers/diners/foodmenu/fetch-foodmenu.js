export default function fetchFoodMenu
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'FETCH_FOODMENU_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'FETCH_FOODMENU_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'FETCH_FOODMENU_PROCESSING':
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

