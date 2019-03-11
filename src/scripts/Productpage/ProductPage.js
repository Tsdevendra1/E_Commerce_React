import React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplay from "./ProductDisplay";

export default class ProductPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let createProductGrid = function () {
        };
        return (
            <React.Fragment>
                <div className="product-page-header">
                    <h3 style={{'margin': '0'}}>New Items</h3>
                </div>
                <ProductSelectorBar/>
                <div className="grid-wrapper">
                    <div className="grid-row">
                        <div className="grid-col">
                            <div className="grid-col-content">
                                <ProductDisplay/>
                            </div>
                        </div>
                        <div className="grid-col">
                            <div className="grid-col-content">
                                <ProductDisplay/>
                            </div>
                        </div>
                        <div className="grid-col">
                            <div className="grid-col-content">
                                <ProductDisplay/>
                            </div>
                        </div>
                        <div className="grid-col">
                            <div className="grid-col-content">
                                <ProductDisplay/>
                            </div>
                        </div>
                    </div>
                    {/*<div className="product-row">*/}
                    {/*<div className="product-col">*/}
                    {/*<ProductDisplay/>*/}
                    {/*</div>*/}
                    {/*<div className="product-col">*/}
                    {/*<ProductDisplay/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </React.Fragment>
        )
    }
}
