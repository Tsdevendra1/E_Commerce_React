import * as React from 'react';
import ProductService from '../ProductService';
import ProductPageTopMobile from '../ProductPage/ProductPageTopMobile';
import ProductPageTopDesktop from "./ProductPageTopDesktop";
import {connect} from 'react-redux';
import {singleProductInfo} from "../Redux/reducers";
import {addProductToBasket, updateProductQuantity} from "../Redux/actions/productActions";


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


    componentDidMount() {
        ProductService.getProduct(this.props.match.params.id).then(data => {
            this.setState({productData: data, fetchingProductData: false});
        }).catch(e => {
            console.log(e.response.data)
        })
    }

    handleClick() {
        if (this.state.productData){
            let productId = parseInt(this.props.match.params.id);
            if (this.props.shoppingBasket.hasOwnProperty(productId)){
                this.props.dispatch(updateProductQuantity(productId));
            } else{
                this.props.dispatch(addProductToBasket(productId, this.state.productData.thumbnail, this.state.productData.price))
            }
        } else {
            throw 'In ProductPage.tsx handleClick function, no productData was found';
        }
    }

    createAddBasketButton() {
        return (
            <button onClick={this.handleClick} type="button" className="btn add-basket-btn">ADD TO BASKET</button>
        )
    }

    render() {
        if (this.state.fetchingProductData) {
            return <h1>FETCHING DATA...</h1>
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
