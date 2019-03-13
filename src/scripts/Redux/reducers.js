import {combineReducers} from 'redux';
import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
} from './actions'
import {RECIEVE_TOKEN, REQUEST_TOKEN} from "./tokenActions";


function jwtToken(state = {isFetching: false, accessToken: null, refreshToken: null}, action) {
    switch (action.type) {
        case REQUEST_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECIEVE_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            });
        default:
            return state
    }
}


let initialProductState = {
    isFetching: false,
    products: [],
    lastUpdated: null,
};

function products(
    state = initialProductState,
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
    productList: products,
    jwtToken,
});

export default rootReducer
