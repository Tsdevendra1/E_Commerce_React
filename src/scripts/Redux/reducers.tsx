import {combineReducers} from 'redux';
import {
    REQUEST_PRODUCTS,
    ADD_PRODUCT_BASKET,
    UPDATE_PRODUCT_QUANTITY,
    RECEIVE_PRODUCTS,
} from './actions/productActions'
import {
    RECIEVE_TOKEN,
    REQUEST_TOKEN,
    RECIEVE_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    RESET_REFRESH_TOKEN
} from "./actions/tokenActions";


export interface singleProductInfo {
    productThumbnailPath: string;
    price: number
    quantity: number
}

export interface shoppingBasketInterface {
    [key: number]: singleProductInfo
}


function shoppingBasket(state: shoppingBasketInterface = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT_BASKET:
            return Object.assign({}, state, {
                ...state,
                [action.productId]: {
                    productThumbnailPath: action.productThumbnailPath,
                    price: action.price,
                    quantity: 1
                },
            });
        case UPDATE_PRODUCT_QUANTITY:
            return Object.assign({}, state, {
                ...state,
                [action.productId]: Object.assign({}, state[action.productId], {quantity: (state[action.productId].quantity + 1)}),
            });
        default:
            return state
    }
}


function jwtToken(state = {isFetching: false, accessToken: null, refreshToken: null, expiresAt: null}, action) {
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
                expiresAt: (new Date).getTime() + 300000,
            });
        case REQUEST_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECIEVE_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                expiresAt: (new Date).getTime() + 300000,
            });
        default:
            return state
    }
}


let initialProductState = {
    isFetching: false,
    products: [],
    lastUpdated: null,
    currentParams: '',
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
                lastUpdated: action.receivedAt,
                currentParams: action.searchParams,
            });
        default:
            return state
    }
}


const rootReducer = combineReducers({
    productList: products,
    jwtToken,
    shoppingBasket
});

export default rootReducer
