import * as React from 'react';
import ProductService from '../ProductService';
import {productData} from "./ProductPage";
import ProductPageThumbnail from './ProductPageThumbnail';
import GenericProductPageTop from "./GenericProductPageTop";
import {wrapComponentWithClass} from "./GenericProductPageTop";

export default class ProductPageTopMobile extends GenericProductPageTop {
    constructor(props){
        super(props);
        this.createThumbnail = this.createThumbnail.bind(this);
    }

    createThumbnail(imageSrc){
        return (
            <React.Fragment key={imageSrc}>
                {wrapComponentWithClass(
                    <ProductPageThumbnail thumbnail={imageSrc}
                    />
                    , 'mobile-thumbnail', this.setCurrentMainPic)}
            </React.Fragment>
        )
    }
    render() {
        const {productData} = this.props;
        return (
            <div className="product-page-mobile">
                <div className="aspect-ratio-box">
                    <div className="aspect-ratio-box-inside">
                        <img className="product-page-image" src={this.state.currentActivePictureSrc}/>
                    </div>
                </div>
                <div className="product-page-mobile-thumbnails">
                    {wrapComponentWithClass(
                        <ProductPageThumbnail thumbnail={productData.thumbnail}
                        />
                        , 'mobile-thumbnail', this.setCurrentMainPic)}
                    {productData.images.map(this.createThumbnail)}
                </div>
                <div className="product-page-info">
                    <div className="product-page-name">
                        {productData.product_name}
                    </div>
                    <div className="product-page-price">
                        £{productData.price}
                    </div>
                    <div>
                        <h5 className="product-page-details-header">Product code</h5>
                        <div className="product-page-description">
                            {productData.id}
                        </div>
                    </div>
                    <div>
                        <h5 className="product-page-details-header">Product details</h5>
                        <div className="product-page-description">
                            <ul>
                                <li>
                                    <u>{productData.product_type}</u> by <u>{productData.product_owner}</u>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h5 className="product-page-details-header">Product description</h5>
                        <div className="product-page-description">
                            {productData.description}
                        </div>
                    </div>
                    <div>
                        <h5 className="product-page-details-header">Brand</h5>
                        <div className="product-page-description">
                            PLACEHOLDER FOR BRAND INFORMATION
                        </div>
                    </div>
                    <div>
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
                    {this.props.render()}
                </div>
            </div>
        )
    }
}
