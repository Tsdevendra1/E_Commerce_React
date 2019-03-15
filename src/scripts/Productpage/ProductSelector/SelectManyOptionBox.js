import React from 'react';
import ReactDOM from "react-dom";
import OptionSelectOneRow from "./OptionSelectOneRow";
import OptionSelectManyRow from "./OptionSelectManyRow";

export default class SelectManyOptionBox extends React.Component {
    constructor(props) {
        super(props);
    }


    createOptionRow(rowInfo) {
        return (
            <OptionSelectManyRow paramType={rowInfo.paramType} paramValue={rowInfo.paramValue} key={rowInfo.id} optionName={rowInfo.optionName} optionAmount={rowInfo.optionAmount}/>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="selector-options-header">
                    PLACEHOLDER
                </div>
                <div className="selector-options-content">
                    {this.props.selectorOptions.map(this.createOptionRow)}
                </div>
            </React.Fragment>
        )
    }
}

