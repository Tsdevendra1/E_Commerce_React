import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import ProductService from '../ProductService';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter } from 'react-router-dom';




class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.descriptionRef = React.createRef();
        this.enableFadeText = this.enableFadeText.bind(this);
        this.fadeTextRef = React.createRef();
        this.deleteItemFromDatabase = this.deleteItemFromDatabase.bind(this);
        this.redirectToUpdatePage = this.redirectToUpdatePage.bind(this);
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

    deleteItemFromDatabase(e) {
        e.preventDefault();
        ProductService.deleteProduct(this.props.productId, this.props.accessToken).then(response => {
            console.log(response.data);
            this.props.getProductDataFunction();
        }).catch(e => console.log(e.response));
    }

    redirectToUpdatePage(e) {
        e.preventDefault();
        let path = `/products/update/${this.props.productId}`;
        console.log(path);
        console.log(this.props.history);
        this.props.history.push(path);
    }

    render() {

        return (
            <div className="product">
                <div style={{position: 'relative'}}>
                    {this.props.showExtraProductFunctions &&
                    <React.Fragment>
                        <div onClick={this.deleteItemFromDatabase} className="delete-product center-vertical">
                            <i className="fas fa-times"></i>
                        </div>
                        <div onClick={this.redirectToUpdatePage} className="update-product center-vertical">
                            <i className="fas fa-pen"></i>
                        </div>
                    </React.Fragment>
                    }
                    <div className="aspect-ratio-box">
                        <div className="aspect-ratio-box-inside">
                            <img className="product-img" src={this.props.thumbnail}/>
                        </div>
                    </div>
                </div>
                <div className="product-description-wrapper">
                    <p ref={this.descriptionRef}>{this.props.productName}</p>
                    <div ref={this.fadeTextRef} className="fade-text">
                    </div>
                </div>
                <div className="product-price">
                    £{this.props.productPrice}
                </div>
            </div>
        )
    }
}

ProductDisplay.propTypes = {
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    productId: PropTypes.number.isRequired,
    showExtraProductFunctions: PropTypes.bool.isRequired,
    getProductDataFunction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {jwtToken} = state;
    const {accessToken} = jwtToken;
    return {
        accessToken
    }
}

export default withRouter(connect(mapStateToProps)(ProductDisplay));

