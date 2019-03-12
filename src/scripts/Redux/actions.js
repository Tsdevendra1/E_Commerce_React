import ProductService from '../ProductService';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';


function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
        receivedAt: Date.now()
    }
}

function fetchProducts() {
    return dispatch => {
        dispatch(requestProducts());
        return ProductService.getProducts().then(data=>{
            dispatch(receiveProducts(data))
        });
    }
}

function shouldFetchProducts(state) {
    const products = state.productList.products;
    if (products.length === 0) {
        return true;
    } else if (products.isFetching) {
        return false;
    }
    return false;
}

export function fetchProductsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchProducts(getState())) {
            return dispatch(fetchProducts())
        }
    }
}
