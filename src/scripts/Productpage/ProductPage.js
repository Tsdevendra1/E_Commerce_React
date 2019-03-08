import React from 'react';
import ProductSelectorBar from './ProductSelectorBar';

export default class ProductPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="product-page-header">
                    <h3 style={{'margin':'0'}}>New Items</h3>
                </div>
                <ProductSelectorBar/>
            </React.Fragment>
        )
    }
}
