import React from 'react';
import ReactDOM from "react-dom";
import OptionSelectOneRow from "./OptionSelectOneRow";
import {fetchProductsIfNeeded} from "../../Redux/actions/productActions";
import {connect} from 'react-redux';
import OptionSelectManyRow from "./OptionSelectManyRow";

class SelectManyOptionBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.allCategoriesButton = React.createRef();
        this.createOptionRow = this.createOptionRow.bind(this);
        this.state = {
            allButtonClicked: false,
            ignoreParamDispatch: false,
            numSelected: 0,
        }
    }


    createOptionRow(rowInfo) {
        return (
            <OptionSelectManyRow ignoreParamDispatch={this.state.ignoreParamDispatch} paramType={rowInfo.paramType}
                                 paramValue={rowInfo.paramValue} key={rowInfo.id}
                                 optionName={rowInfo.optionName} optionAmount={rowInfo.optionAmount}/>
        )
    }

    handleClick() {


        let currentAllButtonClick = this.state.allButtonClicked;
        this.setState({ignoreParamDispatch: true, allButtonClicked: !currentAllButtonClick}, () => {

            let elements = ReactDOM.findDOMNode(this).parentElement.getElementsByClassName('option-box');
            let currentUrlParams = new URLSearchParams(this.props.currentParams);
            let newUrlParams = new URLSearchParams('');
            for (let element of  elements) {
                let elementParamType = element.getAttribute('data-paramtype');
                let elementParamValue = element.getAttribute('data-paramvalue');
                if (!currentAllButtonClick) {
                    if (!(currentUrlParams.has(elementParamType) && (currentUrlParams.getAll(elementParamType)).includes(elementParamValue))) {
                        element.click();
                    }
                    newUrlParams.append(elementParamType, elementParamValue);
                } else {
                    if ((currentUrlParams.has(elementParamType) && (currentUrlParams.getAll(elementParamType)).includes(elementParamValue))) {
                        element.click();
                    }
                }
            }
            this.setState({ignoreParamDispatch: false});
            this.props.dispatch(fetchProductsIfNeeded(newUrlParams.toString()));
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentParams !== this.props.currentParams) {
            let activeOptions = ReactDOM.findDOMNode(this).parentElement.getElementsByClassName('option-box-active').length;
            this.setState({numSelected: activeOptions});
            if (activeOptions === 0 && this.state.allButtonClicked){
                this.setState({allButtonClicked: false});
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="selector-options-header">
                    <span>{this.state.numSelected} Selected</span>
                    <div ref={this.allCategoriesButton} onClick={this.handleClick} className="select-all-box">
                        <div style={{
                            display: (this.state.allButtonClicked) ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            CLEAR
                        </div>
                        <div style={{display: (this.state.allButtonClicked) ? 'none' : 'flex'}}
                             className="select-all-box-content">
                            <div className="flex-align-vertical">
                                <i className="fas fa-check"></i>
                            </div>
                            <span>
                            ALL
                            </span>
                        </div>
                    </div>
                </div>
                <div className="selector-options-content">
                    {this.props.selectorOptions.map(this.createOptionRow)}
                </div>
            </React.Fragment>
        )
    }
}


function mapStateToProps(state) {
    const {productList} = state;
    const {currentParams} = productList;
    return {
        currentParams,
    }
}

export default connect(mapStateToProps)(SelectManyOptionBox);
