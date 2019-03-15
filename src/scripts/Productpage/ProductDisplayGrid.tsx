import * as React from 'react';
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

class ProductDisplayGrid extends React.Component<Props, {}> {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProductsIfNeeded(''));
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
                <div className="grid-wrapper">
                    <div className="grid-row">
                        {products.map(this.createGrid)}
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

export default connect(mapStateToProps)(ProductDisplayGrid)
