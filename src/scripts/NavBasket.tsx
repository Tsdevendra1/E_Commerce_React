import * as React from 'react';
import BasketItem from "./CheckoutPage/BasketItem";
import {shoppingBasketInterface} from "./Redux/reducers";
import NavBar from './NavBar';


interface Props {
    shoppingBasket: shoppingBasketInterface;
    itemPrices: number;
    addPriceToTotal: (price: number) => void;
    showBasketItems: (productId: number) => React.ComponentType;
}


export default class NavBasket extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
        this.createMobileBasketItem = this.createMobileBasketItem.bind(this);
    }

    createMobileBasketItem(itemId, index, numItemsInBasket) {
        let itemInfo = this.props.shoppingBasket[itemId];
        let classes = '';
        if (numItemsInBasket > 1 && index !== numItemsInBasket - 1) {
            classes = 'mb-4';
        }
        return (
            <div key={itemId} className={classes}>
                <BasketItem ignoreDefaultMargin={true}
                            thumbnail={itemInfo.productThumbnailPath} quantity={itemInfo.quantity}
                            productId={itemId} addPriceToTotal={this.props.addPriceToTotal}/>
            </div>
        )
    }

    extendBasketShowTime() {
        NavBar.showMobileBasket();
    }


    render() {
        let numBasketItems = Object.keys(this.props.shoppingBasket).length;
        return (
            <div onMouseMove={() => this.extendBasketShowTime()} data-numitems={numBasketItems} id="mobile-basket"
                 className="nav-basket-wrapper desktop-show base-hide-class">
                <div className="nav-basket-header">
                    <strong>My Bag,</strong>
                    <span>{numBasketItems}</span> item{(numBasketItems > 1 || numBasketItems == 0) && <span>s</span>}
                </div>
                <div className="nav-basket-items">
                    {Object.keys(this.props.shoppingBasket).map((item, index) => this.createMobileBasketItem(item, index, numBasketItems))}
                </div>
                <div className="nav-basket-total">
                    Sub-total <span>£<span>{this.props.itemPrices}</span></span>
                </div>
                <div className="nav-basket-footer pt-2">
                    <button type="button" className="nav-basket-button btn btn-success"
                            style={{borderRadius: '0'}}>Checkout
                    </button>
                </div>
            </div>
        )
    }
}
