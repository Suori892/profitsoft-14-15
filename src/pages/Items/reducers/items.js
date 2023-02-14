const initialState = {
    isLoading: false,
    isError: false,
    list: [],
    name: "Item from backend"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVE_ITEMS_FAIL' : {
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        }
        case 'REQUEST_ITEMS': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'RECEIVE_ITEMS': {
            const {
                items
            } = action;
            return {
                ...state,
                isLoading: false,
                list: items,
                isError: false
            };
        }
        default:
            return state;
    }
}