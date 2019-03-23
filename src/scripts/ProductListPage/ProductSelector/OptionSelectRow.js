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
            let currentParamTypeValues = new Set(currentUrlParams.getAll(paramType));
            // Check if the exact param value has already been set, in this case we consider it a 'toggle' and delete the parameter
            if (currentParamTypeValues.has(paramValue)) {
                currentParamTypeValues.delete(paramValue);

                // Delete all of the param type values, so than we can re-add the ones that haven't
                currentUrlParams.delete(paramType);
                // Re add all the other parameters to the url
                for (let value of currentParamTypeValues) {
                    currentUrlParams.append(paramType, value);
                }
                // Only allow one type variable value for this parameter
            } else if (this.props.selectType === "one") {
                // Delete all instances of current paramtype
                currentUrlParams.delete(paramType);
                // Append the latest value, as it can only be set to one value
                currentUrlParams.append(paramType, paramValue)
            } else {
                currentUrlParams.append(paramType, paramValue);
            }
        } else {
            currentUrlParams.append(paramType, paramValue);
        }
        dispatch(fetchProductsIfNeeded((currentUrlParams.toString())));
    }

    handleClick() {
        if (this.props.handleClick) {
            this.props.handleClick();
        }
        if (!this.props.ignoreParamDispatch){
            this.setParamAndDispatch();
        }
        let row = this.rowRef.current;
        row.classList.toggle('option-box-active');
    }

    render() {
        return (
            <div data-paramtype={this.props.paramType} data-paramvalue={this.props.paramValue} ref={this.rowRef} onClick={this.handleClick}
                 className="option-box option-box-flex">
                {this.props.selectType === 'one' && this.props.optionName}
                {this.props.children}
                </div>
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
