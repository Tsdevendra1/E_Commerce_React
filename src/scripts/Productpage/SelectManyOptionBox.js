import React from 'react';
import ReactDOM from "react-dom";
import OptionSelectOneRow from "./OptionSelectOneRow";
import OptionSelectManyRow from "./OptionSelectManyRow";

export default class SelectManyOptionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                {id:1, optionName:'Option 1', optionAmount: 3},
                {id:2, optionName:'Option 2', optionAmount: 9},
            ]
        }
    }

    createOptionRow(rowInfo) {
        return (
            <OptionSelectManyRow key={rowInfo.id} optionName={rowInfo.optionName} optionAmount={rowInfo.optionAmount}/>
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
                    {/*{this.state.components.map(this.createOptionRow)}*/}
                </div>
            </React.Fragment>
        )
    }
}
