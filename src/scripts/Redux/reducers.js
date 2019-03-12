import {combineReducers} from 'redux';
import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS
} from './actions'

let initialState = {
    isFetching: false,
    products: [],
    lastUpdated: null,
};


function products(
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: false,
                products: action.products,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}


const rootReducer = combineReducers({
    productList: products
});

export default rootReducer
