import {combineReducers} from 'redux';
import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
} from './actions/productActions'
import {
    RECIEVE_TOKEN,
    REQUEST_TOKEN,
    RECIEVE_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    RESET_REFRESH_TOKEN
} from "./actions/tokenActions";


function jwtToken(state = {isFetching: false, accessToken: null, refreshToken: null}, action) {
    switch (action.type) {
        case RESET_REFRESH_TOKEN:
            return Object.assign({}, state, {
                refreshToken: null,
            });
        case SET_REFRESH_TOKEN:
            return Object.assign({}, state, {
                refreshToken: action.refreshToken,
            });
        case RECIEVE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.accessToken,
            });
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
