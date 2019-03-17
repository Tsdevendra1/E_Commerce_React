import * as React from 'react';
import ProductService from '../ProductService';
import ProductPageMobile from '../ProductPage/ProductPageMobile';
import ProductPageDesktop from "./ProductPageDesktop";

interface Props {
    match: any;
}

export interface productData {
    id: number;
    price: number;
    description: string;
    product_name: string;
    product_type: string;
    thumbnail: string;
    product_owner: string;
}

interface State {
    fetchingProductData: boolean;
    productData: productData | null;
}

export default class ProductPage extends React.Component<Props, State> {
    state: Readonly<State> = {
        fetchingProductData: true,
        productData: null
    };


    componentDidMount() {
        ProductService.getProduct(this.props.match.params.id).then(data => {
            this.setState({productData: data});
            this.setState({fetchingProductData: false})
        }).catch(e => {
            console.log(e.response.data)
        })
    }

    render() {
        if (this.state.fetchingProductData) {
            return <h1>FETCHING DATA...</h1>
        }
        if (this.state.productData && !this.state.fetchingProductData) {
            return (
                <div className="product-page-header">
                    <ProductPageMobile productData={this.state.productData}/>
                    <ProductPageDesktop productData={this.state.productData}/>
                </div>
            )
        }
    }
}
