import * as React from 'react';
import {enableScroll} from "./CheckoutPage";
import BasketItem from "./BasketItem";
import {connect} from "react-redux";
import AddProductForm from "../AddProductPage/AddProductForm";
import {shoppingBasketInterface} from "../Redux/reducers";
import {ObjectHTMLAttributes} from "react";


interface Props {
    type: string;
    shoppingBasket: shoppingBasketInterface;
}

interface State {
    itemPrices: number;
}

class BasketShowcase extends React.Component<Props, State> {
    state: Readonly<State> = {
        itemPrices: 0,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.showBasketItems = this.showBasketItems.bind(this);
        this.addPriceToTotal= this.addPriceToTotal.bind(this);
    }

    handleClick() {
        if (this.props.type === 'mobile') {
            let basketElement = (document.getElementsByClassName('basket-container-mobile')[0] as HTMLDivElement);
            basketElement.classList.add('basket-left');
            let body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'visible';
            enableScroll();
        }
    }

    showBasketItems(productId) {
        const {shoppingBasket} = this.props;
        const itemInfo = shoppingBasket[productId];
        return (
            <BasketItem addPriceToTotal={this.addPriceToTotal} key={productId} thumbnail={itemInfo.productThumbnailPath} quantity={itemInfo.quantity}
                        productId={productId}/>
        )
    }

    addPriceToTotal(price:number){
        this.setState({itemPrices: (this.state.itemPrices + price)})
    }

    render() {
        let classes = (this.props.type === 'mobile') ? 'basket-container-mobile basket-left' : 'basket-container-desktop';
        return (
            <div className={classes}>
                <div className="basket-showcase">
                    <div className="basket-header">
                        <h4 style={{margin: '0'}}>Order Summary</h4>
                        <div className="flex-align-vertical">
                            <i onClick={this.handleClick} className="close-basket-button fas fa-times"></i>
                        </div>
                    </div>
                    <div className="basket-content">
                        {Object.keys(this.props.shoppingBasket).map(this.showBasketItems)}
                    </div>
                    <div className="basket-footer basket-content">
                        <div className="basket-total">
                            Total today
                        </div>
                        <span>
            £{this.state.itemPrices}
            </span>
                    </div>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    const {shoppingBasket} = state;
    return {
        shoppingBasket
    }
}


export default connect(mapStateToProps)(BasketShowcase);
