import * as React from 'react';
import {Subtract} from 'utility-types';
import {connect, Omit} from "react-redux";
import BasketShowcase from "./CheckoutPage/BasketShowcase";
import NavBasket from "./NavBasket";
import {shoppingBasketInterface} from "./Redux/reducers";
import BasketItem from "./CheckoutPage/BasketItem";


// Props the resulting component to take (besides the props of the wrapped component)
interface ExternalProps {
    shoppingBasket: shoppingBasketInterface;
}


// Props the HOC adds to the wrapped component
export interface InjectedProps {
    itemPrices: number;
    showBasketItems: (productId: number)=> React.ComponentType;
    addPriceToTotal: (price: number) => void;
    shoppingBasket: shoppingBasketInterface;
}

interface State {
    itemPrices: number;
}

function basketHoc<P extends InjectedProps>(WrappedComponent: React.ComponentType<P & InjectedProps>) {

    return class extends React.Component<Subtract<P, InjectedProps> & ExternalProps, State> {
        state: Readonly<State> = {
            itemPrices: 0,
        };

        constructor(props) {
            super(props);
            this.addPriceToTotal = this.addPriceToTotal.bind(this);
            this.showBasketItems = this.showBasketItems.bind(this);
        }

        addPriceToTotal(price: number) {
            this.setState({itemPrices: (this.state.itemPrices + price)})
        }

        showBasketItems(productId: number) {
            const {shoppingBasket} = this.props;
            const itemInfo = shoppingBasket[productId];
            return (
                <BasketItem addPriceToTotal={this.addPriceToTotal} key={productId}
                            thumbnail={itemInfo.productThumbnailPath} quantity={itemInfo.quantity}
                            productId={productId}/>
            )
        }

        render() {
            return (
                <WrappedComponent itemPrices={this.state.itemPrices} showBasketItems={this.showBasketItems}
                                  addPriceToTotal={this.addPriceToTotal} {...this.props as P} />
            )
        }
    };
}

function mapStateToProps(state) {
    const {shoppingBasket} = state;
    return {
        shoppingBasket
    }
}


// export const CheckoutBasket = connect(mapStateToProps)(basketHoc(BasketShowcase));
export const MobileBasket = connect(mapStateToProps)(basketHoc(NavBasket));
