import ProductService from '../../ProductService';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';


function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

function receiveProducts(products: object, searchParams: string) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
        receivedAt: Date.now(),
        searchParams,
    }
}

function fetchProducts(searchParams: string): (dispatch: any) => any {
    return dispatch => {
        dispatch(requestProducts());
        return ProductService.getProducts(searchParams).then(data => {
            dispatch(receiveProducts(data, searchParams))
        });
    }
}

export function fetchProductsIfNeeded(searchParams: string) {
    return dispatch => {
        return dispatch(fetchProducts(searchParams))
    }
}
