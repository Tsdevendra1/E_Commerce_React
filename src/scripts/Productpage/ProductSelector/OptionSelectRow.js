import React from 'react';
import {connect} from 'react-redux';
import {fetchProductsIfNeeded} from "../../Redux/actions/productActions";

class OptionSelectRow extends React.Component {
    constructor(props) {
        super(props);
        this.rowRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    setParamAndDispatch() {
        const {paramType, paramValue, dispatch, currentParams} = this.props;
        let currentUrlParams = new URLSearchParams(currentParams);

        if (currentUrlParams.has(paramType)) {
            currentUrlParams.set(paramType, paramValue);
        } else {
            currentUrlParams.append(paramType, paramValue);
        }
        dispatch(fetchProductsIfNeeded((currentUrlParams.toString())));
    }

    handleClick() {
        if (this.props.handleClick){
            this.props.handleClick();
        }
        this.setParamAndDispatch();
        let row = this.rowRef.current;
        row.classList.toggle('option-box-active');
    }

    render() {
        return (
            <div ref={this.rowRef} onClick={this.handleClick} className="option-box option-box-flex">{this.props.optionName}{this.props.children}</div>
        )
    }
}
function mapStateToProps(state) {
    const {productList} = state;
    const {currentParams} = productList;
    return {
        currentParams
    }
}


export default connect(mapStateToProps)(OptionSelectRow)
