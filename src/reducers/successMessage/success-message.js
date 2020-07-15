export default function successMessage
    (state = { message:null }, action) {

    switch (action.type)
    {
        case 'ADD_SUCCESS_MESSAGE':
            return {...state, ...{message: action.message }};

        case 'DELETE_SUCCESS_MESSAGE':
            return {...state, ...{ message: null }};

        default: return state;
    }
}