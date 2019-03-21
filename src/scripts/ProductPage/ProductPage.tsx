import * as React from 'react';
import ProductService from '../ProductService';
import ProductPageTopMobile from '../ProductPage/ProductPageTopMobile';
import ProductPageTopDesktop from "./ProductPageTopDesktop";
import {connect} from 'react-redux';
import {singleProductInfo} from "../Redux/reducers";
import {addProductToBasket, updateProductQuantity} from "../Redux/actions/productActions";
import LoadingOverlay from "../LoadingOverlay";


interface Props {
    match: any;
    shoppingBasket: Array<singleProductInfo>;
    dispatch: any;
}

export interface productData {
    id: number;
    price: number;
    description: string;
    product_name: string;
    product_type: string;
    thumbnail: string;
    product_owner: string;
    images: Array<string>;
}

interface State {
    fetchingProductData: boolean;
    productData: productData | null;
}

class ProductPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.createAddBasketButton = this.createAddBasketButton.bind(this)
    }

    state: Readonly<State> = {
        fetchingProductData: true,
        productData: null
    };

    getProductData(productId: number) {
        ProductService.getProduct(productId).then(data => {
            this.setState({productData: data, fetchingProductData: false});
        }).catch(e => {
            console.log(e.response.data)
        })
    }

    componentDidMount() {
        this.getProductData(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        let prevPropsProductId = parseInt(prevProps.match.params.id);
        let productId = parseInt(this.props.match.params.id);
        if (prevPropsProductId !== productId) {
            this.setState({fetchingProductData: true});
            this.getProductData(productId);
        }
    }

    handleClick(e) {
        const currentElement = (e.currentTarget as HTMLButtonElement);
        if (this.state.productData && currentElement.getAttribute('data-justadded') === 'no') {
            e.persist();
            currentElement.setAttribute('data-justadded', 'yes');

            const tick = (currentElement.getElementsByClassName('fas')[0] as HTMLIFrameElement);
            const text = ((currentElement.getElementsByClassName('button-text')[0]) as HTMLSpanElement);
            tick.style.display = 'inline';
            text.innerHTML = 'ADDED';

            setTimeout(function () {
                // currentElement.innerText = 'ADD TO BASKET';
                currentElement.setAttribute('data-justadded', 'no');
                tick.style.display = 'none';
                text.innerHTML = 'ADD TO BASKET';
            }, 2000);
            let productId = parseInt(this.props.match.params.id);
            if (this.props.shoppingBasket.hasOwnProperty(productId)) {
                this.props.dispatch(updateProductQuantity(productId));
            } else {
                this.props.dispatch(addProductToBasket(productId, this.state.productData.thumbnail, this.state.productData.price))
            }
        }
    }

    createAddBasketButton() {
        return (
            <button data-justadded="no" onClick={this.handleClick} type="button" className="btn add-basket-btn">
                <i style={{display: 'none', paddingRight: '10px'}}
                   className="fas fa-check"></i>
                <span className="button-text">
                ADD TO BASKET
                </span>
            </button>
        )
    }

    render() {
        if (this.state.fetchingProductData) {
            return (
                <LoadingOverlay/>
            )

        }
        if (this.state.productData && !this.state.fetchingProductData) {
            return (
                <div className="product-page-header">
                    <ProductPageTopMobile render={this.createAddBasketButton} productData={this.state.productData}/>
                    <ProductPageTopDesktop render={this.createAddBasketButton} productData={this.state.productData}/>
                </div>
            )
        }
    }
}

const mapStateToProps = function (state) {
    const {shoppingBasket} = state;
    return {
        shoppingBasket
    }

};

export default connect(mapStateToProps)(ProductPage)
