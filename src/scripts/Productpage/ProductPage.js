import React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplay from "./ProductDisplay";
import PropTypes from 'prop-types'
import {
    fetchProductsIfNeeded,
} from '../Redux/actions/productActions'
import {connect} from 'react-redux';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProductsIfNeeded());
    }

    createGrid(productItem) {
        return (
            <div key={productItem.product_name} className="grid-col">
                <div className="grid-col-content">
                    <ProductDisplay productDescription={productItem.description} productPrice={productItem.price}/>
                </div>
            </div>
        )
    }


    render() {
        let {products, isFetching} = this.props;
        if (isFetching) {
            return <h1>FETCHING DATA...</h1>
        } else {
            return (
                <div>
                    <div className="product-page-header">
                        <h3 style={{'margin': '0'}}>New Items</h3>
                    </div>
                    <ProductSelectorBar/>
                    <div className="grid-wrapper">
                        <div className="grid-row">
                            {products.map(this.createGrid)}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

ProductPage.propTypes = {
    products: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    const {productList} = state;
    const {isFetching, lastUpdated, products} = (productList.products.length === 0) ? {
        isFetching: true,
        products: []
    } : productList;
    return {
        products,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(ProductPage)

