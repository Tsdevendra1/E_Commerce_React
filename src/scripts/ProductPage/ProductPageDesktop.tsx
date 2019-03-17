import * as React from 'react';
import ProductService from '../ProductService';
import {productData} from "./ProductPage";


interface Props {
    productData: productData;
}

interface State {
}

export default class ProductPageDesktop extends React.Component<Props, State> {
    render() {
        const {productData} = this.props;
        return (
            <div className="product-page-desktop">
                <div className="product-desktop-content">
                    <div className="product-page-desktop-tophalf mb-5">
                        <div className="product-page-desktop-thumbnails">
                            <div className="aspect-ratio-box">
                                <div className="aspect-ratio-box-inside">
                                    <img className="product-page-image" src={productData.thumbnail}/>
                                </div>
                            </div>
                        </div>
                        <div className="product-page-image-desktop">
                            <div className="aspect-ratio-box">
                                <div className="aspect-ratio-box-inside">
                                    <img className="product-page-image" src={productData.thumbnail}/>
                                </div>
                            </div>
                        </div>
                        <div className="product-page-info-desktop">
                            <div className="product-page-name">
                                {productData.product_name}
                            </div>
                            <div className="product-page-price">
                                £{productData.price}
                            </div>
                            <button type="button" className="btn add-basket-btn">ADD TO BASKET</button>
                        </div>
                    </div>
                    <div className="product-page-desktop-bottomhalf">
                        <div className="product-page-desktop-info-col">
                            <h5 className="product-page-details-header">Product details</h5>
                            <div className="product-page-description">
                                <ul>
                                    <li>
                                        <u>{productData.product_type}</u> by <u>{productData.product_owner}</u>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="product-page-desktop-info-col">
                            <h5 className="product-page-details-header">Product code</h5>
                            <div className="product-page-description">
                                {productData.id}
                            </div>
                            <h5 className="product-page-details-header">Brand</h5>
                            <div className="product-page-description">
                                PLACEHOLDER FOR BRAND INFORMATION
                            </div>
                        </div>
                        <div className="product-page-desktop-info-col">
                            <h5 className="product-page-details-header">Product description</h5>
                            <div className="product-page-description">
                                {productData.description}
                            </div>
                            <h5 className="product-page-details-header">LOOK AFTER ME</h5>
                            <div className="product-page-description">
                                <div>
                                You know the drill.
                                </div>
                                <div>
                                Always check the label.
                                </div>
                                Separate your colours, etc.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
