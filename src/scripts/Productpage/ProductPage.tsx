import * as React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplay from "./ProductDisplay";
import ProductDisplayGrid from "./ProductDisplayGrid";
import {
    fetchProductsIfNeeded,
} from '../Redux/actions/productActions'
import {connect} from 'react-redux';


interface Props {
    products: Array<object>;
    isFetching: boolean;
    dispatch: any;
}

export default class ProductPage extends React.Component<Props, {}> {

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

