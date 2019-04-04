import * as React from 'react';
import ProductSelectorBar from './ProductSelectorBar';
import ProductDisplayGrid from "./ProductDisplayGrid";
import LoadingOverlay from "../LoadingOverlay";

interface State {
    productSelectorLoadingFinished: boolean;
    productListLoadingFinished: boolean;
}

export default class ProductListPage extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.handleLoadingFinished = this.handleLoadingFinished.bind(this);
    }

    state: Readonly<State> = {
        productSelectorLoadingFinished: false,
        productListLoadingFinished: false,
    };

    handleLoadingFinished(stateKey: string, stateValue: boolean) {
        this.setState({[stateKey]: stateValue} as any);
    }

    render() {
        return (
            <div>
                {!(this.state.productListLoadingFinished && this.state.productSelectorLoadingFinished) &&
                <LoadingOverlay/>}
                <div className="product-list-header">
                    <h3 style={{'margin': '0'}}>New Items</h3>
                </div>
                <ProductSelectorBar
                    loadingHasFinished={this.state.productSelectorLoadingFinished && this.state.productListLoadingFinished}
                    handleLoadingFinished={(value: boolean) => {
                        this.setState({productSelectorLoadingFinished: value})
                    }}/>
                <ProductDisplayGrid showExtraProductFunctions={false} handleLoadingFinished={value => {
                    this.setState({productListLoadingFinished: value})
                }}
                                    loadingHasFinished={this.state.productListLoadingFinished && this.state.productSelectorLoadingFinished}/>
            </div>
        )
    }
}

