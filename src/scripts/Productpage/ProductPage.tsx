import * as React from 'react';
import ProductSelectorBar from './ProductSelector/ProductSelectorBar';
import ProductDisplay from "./ProductDisplay";
import {
    fetchProductsIfNeeded,
} from '../Redux/actions/productActions'
import {connect} from 'react-redux';


interface Props {
    products: Array<object>;
    isFetching: boolean;
    dispatch: any;
}

class ProductPage extends React.Component<Props, null> {
    componentDidMount() {
        const {dispatch} = this.props;
        let currentUrl = new URL(window.location.href);
        let searchParams = new URLSearchParams(currentUrl.search);
        searchParams.append('product_type', 'Bottom');
        dispatch(fetchProductsIfNeeded(searchParams.toString()));
        // dispatch(fetchProductsIfNeeded(null));
    }

    public createGrid(productItem) {
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

function mapStateToProps(state) {
    const {productList} = state;
    const {isFetching, products} = productList;
    return {
        products,
        isFetching,
    }
}

export default connect(mapStateToProps)(ProductPage)

