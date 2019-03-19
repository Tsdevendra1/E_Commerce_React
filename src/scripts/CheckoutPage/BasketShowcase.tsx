import * as React from 'react';
import BasketItem from "./BasketItem";


interface Props {
}

interface State {
}

export default class BasketShowcase extends React.Component<Props, State> {
    state: Readonly<State> = {};

    constructor(props) {
        super(props);
    }

    handleClick() {
        let basketElement = (document.getElementsByClassName('basket-container')[0] as HTMLDivElement);
        basketElement.style.left = '-344px';
    }

    render() {
        return (
            <div className="basket-container">
                <div className="basket-showcase">
                    <div className="basket-header">
                        <h4 style={{margin: '0'}}>Order Summary</h4>
                        <div className="flex-align-vertical">
                            <i onClick={this.handleClick} className="close-basket-button fas fa-times"></i>
                        </div>
                    </div>
                    <div className="basket-content">
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                        <BasketItem/>
                    </div>
                    <div className="basket-footer basket-content">
                        <div className="basket-total">
                            Total today
                        </div>
                        <span>
            £0.00
            </span>
                    </div>
                </div>
            </div>
        )
    }


}
