export default function addProduct(productName) {
    return {
        type: 'ADD_PRODUCT',
        productName,
    }
}

