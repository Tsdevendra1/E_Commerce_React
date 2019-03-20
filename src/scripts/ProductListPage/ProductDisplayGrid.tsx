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
}

class ProductDisplayGrid extends React.Component<Props, {}> {
    componentDidMount() {
        let productArray = this.props.products;
        if (!productArray.length || !Array.isArray(productArray)){
            const {dispatch} = this.props;
            dispatch(fetchProductsIfNeeded(''));
        } else {
            this.props.handleLoadingFinished(true);
        }
        console.log(productArray);
    }

   componentDidUpdate(prevProps){
        if (prevProps.isFetching !== this.props.isFetching){
            this.props.handleLoadingFinished(!this.props.isFetching);
        }
   }


    createGrid(productItem) {
        return (
            <div key={productItem.description + productItem.product_name + productItem.price + productItem.thumbnail}
                 className="grid-col">
                <div className="grid-col-content">

                    <Link to={`/products/${productItem.id}`}>
                        <ProductDisplay thumbnail={productItem.thumbnail} productName={productItem.product_name}
                                        productPrice={productItem.price}/>
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
    const {isFetching, products} = productList;
    return {
        products,
        isFetching,
    }
}

export default connect(mapStateToProps)(ProductDisplayGrid)
