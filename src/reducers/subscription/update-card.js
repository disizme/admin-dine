export default function updateCard
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'UPDATE_CARD_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'UPDATE_CARD_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'UPDATE_CARD_PROCESSING':
            if (action.processing)
                return {...state, ...{processing: action.processing, success: null, error: null}}
            else
                return {...state, ...{processing: action.processing}};

        case 'UPDATE_CARD_RESET':
                    return { error: null, success: null, processing: false };

        default:
            return state;
    }
}

