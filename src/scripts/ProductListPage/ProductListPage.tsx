import * as React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplayGrid from "./ProductDisplayGrid";



export default class ProductListPage extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="product-list-header">
                    <h3 style={{'margin': '0'}}>New Items</h3>
                </div>
                <ProductSelectorBar/>
                <ProductDisplayGrid/>
            </div>
        )
    }
}

