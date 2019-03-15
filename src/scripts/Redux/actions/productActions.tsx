import ProductService from '../../ProductService';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';


function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

function receiveProducts(products: object) {
    return {
        type: RECEIVE_PRODUCTS,
        products,
        receivedAt: Date.now()
    }
}

function fetchProducts(searchParams:string): (dispatch: any) => any {
    return dispatch => {
        dispatch(requestProducts());
        return ProductService.getProducts(searchParams).then(data => {
            dispatch(receiveProducts(data))
        });
    }
}

function shouldFetchProducts(state) {
    const products: Array<any> = state.productList.products;
    return products.length === 0;
}

export function fetchProductsIfNeeded(searchParams:string) {
    return (dispatch, getState) => {
        if (shouldFetchProducts(getState())) {
            return dispatch(fetchProducts(searchParams))
        }
    }
}
