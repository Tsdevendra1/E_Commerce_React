import * as React from 'react';
import BasketItem from "./CheckoutPage/BasketItem";
import {shoppingBasketInterface} from "./Redux/reducers";
import NavBar from './NavBar';

import {Link} from 'react-router-dom';

interface Props {
    shoppingBasket: shoppingBasketInterface;
    itemPrices: number;
    addPriceToTotal: (price: number) => void;
    showBasketItems: (productId: number) => React.ComponentType;
}


interface State {
    mouseInArea: boolean | undefined
    quickClose: boolean;
}

export default class NavBasket extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseLeft = this.mouseLeft.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.createMobileBasketItem = this.createMobileBasketItem.bind(this);
        this.quickClose = this.quickClose.bind(this);
    }

    state: Readonly<State> = {
        mouseInArea: false,
        quickClose: false,
    };

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

    mouseEntered() {
        console.log('entered');
        if (!this.state.quickClose) {
            this.setState({mouseInArea: true}, () => {
                NavBar.showMobileBasket(this.state.mouseInArea, this.state.quickClose)
            });
        }
    }

    mouseLeft(e) {
        console.log(e.target);
        console.log('left', this.state.quickClose);
        if (!this.state.quickClose) {
            this.setState({mouseInArea: false}, () => {
                NavBar.showMobileBasket(this.state.mouseInArea, this.state.quickClose)
            });
        }
    }

    quickClose() {
        this.setState({quickClose: true}, () => {
            NavBar.closeMobileBasket(false, true)
        });
    }

    mouseMove() {
        NavBar.showMobileBasket(this.state.mouseInArea)
    }

    render() {
        let numBasketItems = Object.keys(this.props.shoppingBasket).length;
        return (
            <div data-numitems={numBasketItems} id="mobile-basket"
                // onMouseMove={this.mouseMove}
                 onMouseEnter={this.mouseEntered}
                 onMouseLeave={this.mouseLeft}
                 className="nav-basket-wrapper desktop-show base-hide-class">
                <div className="nav-basket-header"
                     onMouseEnter={this.mouseEntered}
                     onMouseLeave={this.mouseLeft}
                >
                    <strong>My Bag,</strong>
                    &nbsp;
                    <span>{numBasketItems}</span> item{(numBasketItems > 1 || numBasketItems == 0) && <span>s</span>}
                </div>
                <div className="nav-basket-items"
                     onMouseEnter={this.mouseEntered}
                     onMouseLeave={this.mouseLeft}
                >
                    {Object.keys(this.props.shoppingBasket).map((item, index) => this.createMobileBasketItem(item, index, numBasketItems))}
                </div>
                <div className="nav-basket-total"

                     onMouseEnter={this.mouseEntered}
                     onMouseLeave={this.mouseLeft}
                >
                    Sub-total <span>£<span>{this.props.itemPrices}</span></span>
                </div>
                <div className="nav-basket-footer pt-2"
                     onMouseEnter={this.mouseEntered}
                     onMouseLeave={this.mouseLeft}
                >
                    <Link to="/checkout/" onClick={this.quickClose}>
                        <button type="button" className="nav-basket-button btn btn-success"
                                style={{borderRadius: '0'}}>Checkout
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
