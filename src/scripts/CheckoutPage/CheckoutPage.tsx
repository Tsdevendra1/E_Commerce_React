import * as React from 'react';
import CheckoutInformation from "./CheckoutInformation";
import ProductListPage from "../ProductListPage/ProductListPage";
import PaymentInformation from "./PaymentInformation";
import BasketShowcase from "./BasketShowcase";


interface Props {
}

interface State {
}

export default class CheckoutPage extends React.Component<Props, State> {
    state: Readonly<State> = {};

    constructor(props) {
        super(props);
    }

    handleClick(e: React.MouseEvent<HTMLSpanElement>){
        let element = e.currentTarget;
        let basketElement = (document.getElementsByClassName('basket-container')[0] as HTMLDivElement);
        basketElement.style.left = '0px';
    }

    render() {
        return (
            <form method="post" action="http://127.0.0.1:8000/manager/api/checkout/" className="checkout-container">
                {/*<input ref="csrfTokenInput" type="hidden" name="csrfmiddlewaretoken" value=""/>*/}
                <div className="checkout-information-container">
                    <div className="checkout-information-content" style={{margin: '0'}}>
                        <div className="checkout-header"><h6>BILLING INFORMATION</h6><span onClick={this.handleClick} className="show-basket-button">Show Basket</span></div>
                        <CheckoutInformation/>
                        <div className='payment-information-container'>
                            <div className="checkout-header">
                                <h6>PAYMENT INFORMATION</h6>
                            </div>
                            <PaymentInformation/>
                        </div>
                    </div>
                </div>
                {/*<div className="empty-space"></div>*/}
                <BasketShowcase/>
            </form>
        )
    }


}

