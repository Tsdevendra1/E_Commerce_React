import * as React from 'react';
import CheckoutInformation from "./CheckoutInformation";
import ProductListPage from "../ProductListPage/ProductListPage";
import PaymentInformation from "./PaymentInformation";
import BasketShowcase from "./BasketShowcase";


interface Props {
}

interface State {
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    let basket = document.getElementsByClassName('basket-container-mobile')[0];
    let basketContainsEventTarget = basket.contains(e.target);
    console.log(basketContainsEventTarget);

    e = e || window.event;
    if (!basketContainsEventTarget){
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    let body = document.getElementsByTagName('body')[0];
    if (body.addEventListener) // older FF
        body.addEventListener('DOMMouseScroll', preventDefault, false);
    body.onwheel = preventDefault; // modern standard
    body.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

export function enableScroll() {
    let body = document.getElementsByTagName('body')[0];
    if (body.removeEventListener)
        body.removeEventListener('DOMMouseScroll', preventDefault, false);
    body.onwheel = null;
    body.ontouchmove = null;
    document.onkeydown = null;
}

export default class CheckoutPage extends React.Component<Props, State> {


    componentDidMount(){
        let body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'visible';
    }


    handleClick() {
        let basketElement = (document.getElementsByClassName('basket-container-mobile')[0] as HTMLDivElement);
        basketElement.classList.remove('basket-left');
        disableScroll();
    }

    render() {
        return (
            <form method="post" action="http://127.0.0.1:8000/manager/api/checkout/" className="checkout-container">
                <div className="checkout-information-container">
                    <div className="checkout-information-content" style={{margin: '0'}}>
                        <div className="checkout-header"><h6>BILLING INFORMATION</h6><span onClick={this.handleClick}
                                                                                           className="show-basket-button">Show Basket</span>
                        </div>
                        <CheckoutInformation/>
                        <div className='payment-information-container'>
                            <div className="checkout-header">
                                <h6>PAYMENT INFORMATION</h6>
                            </div>
                            <PaymentInformation/>
                        </div>
                    </div>
                </div>
                <BasketShowcase type="mobile" />
                <BasketShowcase type="desktop" />
            </form>
        )
    }


}

