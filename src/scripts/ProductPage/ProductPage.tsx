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
    currentActivePictureSrc: string;
}

class ProductPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.createAddBasketButton = this.createAddBasketButton.bind(this);
        this.setCurrentMainPic = this.setCurrentMainPic.bind(this);
    }

    state: Readonly<State> = {
        fetchingProductData: true,
        productData: null,
        currentActivePictureSrc: '',
    };

    setCurrentMainPic(e: React.MouseEvent<HTMLImageElement>) {
        if (e.currentTarget.parentElement) {
            // let elems = (e.currentTarget.parentElement.getElementsByClassName('active-pic') as HTMLCollectionOf<HTMLElement>);
            // for (let el of elems) {
            //     el.classList.remove("active-pic");
            // }
            // e.currentTarget.classList.add('active-pic');
            let image = (e.currentTarget.querySelector('img') as HTMLImageElement);
            this.setState({currentActivePictureSrc: image.src})
        }
    }

    getProductData(productId: number) {
        ProductService.getProduct(productId).then(data => {
            console.log(data);
            this.setState({
                productData: data,
                fetchingProductData: false,
                currentActivePictureSrc: data.thumbnail,
            });
        }).catch(e => {
            if (e.response){
                console.log(e.response);
                // console.log(e.response.data)
            }
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
                    <ProductPageTopMobile render={this.createAddBasketButton} setCurrentMainPic={this.setCurrentMainPic}
                                          productData={this.state.productData}
                                          currentActivePictureSrc={this.state.currentActivePictureSrc}/>
                    <ProductPageTopDesktop setCurrentMainPic={this.setCurrentMainPic} render={this.createAddBasketButton} productData={this.state.productData}
                                           currentActivePictureSrc={this.state.currentActivePictureSrc}/>
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
