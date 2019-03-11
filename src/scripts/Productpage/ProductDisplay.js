import React from 'react';
import ReactDOM from 'react-dom';

export default class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.descriptionRef = React.createRef();
        this.enableFadeText = this.enableFadeText.bind(this);
        this.fadeTextRef = React.createRef();
    }


    static isOverflown(element) {
        let parentBottom = element.parentElement.getClientRects()[0].bottom;
        let elementBottom = element.getClientRects()[0].bottom;
        return elementBottom > parentBottom;
    }

    componentDidMount() {
        window.addEventListener('resize', this.enableFadeText);
        this.enableFadeText();
    }

    componentWillUnmount() {
        // If you don't remove it, the previous descriptionRef is saved on the event listener which causes an error
        window.removeEventListener('resize', this.enableFadeText)
    }

    enableFadeText() {
        let fadeTextElement = this.fadeTextRef.current;
        if (ProductDisplay.isOverflown(this.descriptionRef.current)) {
            fadeTextElement.style.display = 'block';
        } else {
            fadeTextElement.style.display = 'none';
        }
    }


    render() {

        return (
            <div className="product">
                <a href="">
                    <img className="product-img" src="/static/main/images/frown.png"/>
                </a>
                <div className="product-description-wrapper">
                    <p ref={this.descriptionRef}>ASOS DESIGN regular fit underwater sequin printed shirt with revere
                        collar</p>
                    <div ref={this.fadeTextRef} className="fade-text">
                    </div>
                </div>
                <div className="product-price">
                    £432
                </div>
            </div>
        )
    }
}
