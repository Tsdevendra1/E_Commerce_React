import * as React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplayGrid from "./ProductDisplayGrid";



export default class ProductPage extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="product-page-header">
                    <h3 style={{'margin': '0'}}>New Items</h3>
                </div>
                <ProductSelectorBar/>
                <ProductDisplayGrid/>
            </div>
        )
    }
}

