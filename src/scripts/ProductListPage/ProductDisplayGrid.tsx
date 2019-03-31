import * as React from 'react';
import ProductDisplay from "./ProductDisplay";
import {Link} from 'react-router-dom';
import {
    fetchProductsIfNeeded,
} from '../Redux/actions/productActions'
import {connect} from 'react-redux';
import {routes} from '../routers';


interface Props {
    products: Array<object>;
    isFetching: boolean;
    dispatch: any;
    handleLoadingFinished: (value: boolean) => void;
    loadingHasFinished: boolean;
    currentParams: string;
    showExtraProductFunctions: boolean;
    extraParams?: { [key: string]: string };
}

class ProductDisplayGrid extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
        this.getProductData = this.getProductData.bind(this);
        this.createGrid = this.createGrid.bind(this);
    }

    componentDidMount() {
        this.getProductData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFetching !== this.props.isFetching) {
            this.props.handleLoadingFinished(!this.props.isFetching);
        }
    }

    getProductData() {
        let currentUrlParams = new URLSearchParams(this.props.currentParams);
        let extraParams = this.props.extraParams;
        if (extraParams) {
            for (let param in extraParams) {
                currentUrlParams.append(param, extraParams[param]);
            }
        }
        this.props.dispatch(fetchProductsIfNeeded(currentUrlParams.toString()));
    }

    createGrid(productItem) {
        return (
            <div key={productItem.description + productItem.product_name + productItem.price + productItem.thumbnail}
                 className="grid-col">
                <div className="grid-col-content">
                    <Link to={`/products/${productItem.id}`}>
                        <ProductDisplay showExtraProductFunctions={this.props.showExtraProductFunctions}
                                        getProductDataFunction={this.getProductData} thumbnail={productItem.thumbnail}
                                        productName={productItem.product_name}
                                        productPrice={productItem.price} productId={productItem.id}/>
                    </Link>
                </div>
            </div>
        )
    }


    render() {
        let {products} = this.props;
        if (!this.props.loadingHasFinished) {
            return <h1 style={{height: '100vh'}}></h1>
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
    const {isFetching, products, currentParams} = productList;
    return {
        products,
        isFetching,
        currentParams
    }
}

export default connect(mapStateToProps)(ProductDisplayGrid)
