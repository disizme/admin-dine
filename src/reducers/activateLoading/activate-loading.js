export default function loading
    (state = { flag:false }, action) {

    switch (action.type)
    {
        case 'ACTIVATE_LOADING':
            return {flag:true};

        case 'DEACTIVATE_LOADING':
            return {flag: false};

        default: return state;
    }
}
