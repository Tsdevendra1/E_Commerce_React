import * as React from 'react';
import BasketItem from "./CheckoutPage/BasketItem";
import {shoppingBasketInterface} from "./Redux/reducers";


interface Props {
    shoppingBasket: shoppingBasketInterface;
    itemPrices: number;
    addPriceToTotal: (price: number) => void;
    showBasketItems: (productId: number) => React.ComponentType;
}


export default class NavBasket extends React.Component<Props, {}> {
    render() {
        return (
            <div className="nav-basket-wrapper desktop-show">
                <div className="nav-basket-header py-2">
                    <strong>My Bag,</strong> <span>0</span> items
                </div>
                <div className="nav-basket-items py-2">
                    <div className="nav-basket-item">
                        <BasketItem ignoreDefaultMargin={true}
                                    thumbnail="/static/main/images/animal-avian-beak-1200857.jpg" quantity={3}
                                    productId={35} addPriceToTotal={this.props.addPriceToTotal}/>
                    </div>
                    <div className="nav-basket-item">
                        <BasketItem ignoreDefaultMargin={true}
                                    thumbnail="/static/main/images/animal-avian-beak-1200857.jpg" quantity={3}
                                    productId={35} addPriceToTotal={this.props.addPriceToTotal}/>
                    </div>
                </div>
                <div className="nav-basket-total py-2">
                    Sub-total <span>£<span>0</span></span>
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
