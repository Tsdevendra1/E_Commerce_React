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

    render() {
        return (
            <div className="basket-showcase">
                <div className="basket-header">
                    <h4 style={{margin: '0'}}>Order Summary</h4>
                </div>
                <div className="basket-content">
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
        )
    }


}
