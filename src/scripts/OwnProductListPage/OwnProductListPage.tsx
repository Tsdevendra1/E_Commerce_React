import * as React from 'react';
import ProductDisplayGrid from "../ProductListPage/ProductDisplayGrid";
import LoadingOverlay from "../LoadingOverlay";
import {connect} from "react-redux";

interface Props {
    userId: number;
}

interface State {
    productListLoadingFinished: boolean;
}

class OwnProductListPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleLoadingFinished = this.handleLoadingFinished.bind(this);
    }

    handleLoadingFinished(stateKey: string, stateValue: boolean) {
        this.setState({[stateKey]: stateValue} as any);
    }

    state: Readonly<State> = {
        productListLoadingFinished: false,
    };

    render() {
        return (
            <div>
                {!(this.state.productListLoadingFinished) &&
                <LoadingOverlay/>}
                <div className="product-list-header">
                    <h3 style={{'margin': '0'}}>Your Products</h3>
                </div>
                <ProductDisplayGrid showExtraProductFunctions={true} handleLoadingFinished={value => {
                    this.setState({productListLoadingFinished: value})
                }}
                                    extraParams={{product_owner: `${this.props.userId}`}}
                                    loadingHasFinished={this.state.productListLoadingFinished}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {jwtToken} = state;
    const {userId} = jwtToken;
    return {
        userId,
    }
}

export default connect(mapStateToProps)(OwnProductListPage);
