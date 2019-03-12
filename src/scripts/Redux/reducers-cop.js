import {combineReducers} from 'redux'

function products(state=[], action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                {
                    productName: action.productName,
                }
            ];
        default:
            return state
    }
}


const productApp = combineReducers({
    products,
});

export default productApp;