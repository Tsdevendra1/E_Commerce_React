import {connect} from 'react-redux'
import React from 'react';

const ProductThing = (products) => (
<h1>{products.products[0].productName}</h1>
);

const mapStateToProps = state => {
    return {
        products: state.products,
    }
};


const ProductConnection = connect(
    mapStateToProps,
)(ProductThing);

export default ProductConnection;