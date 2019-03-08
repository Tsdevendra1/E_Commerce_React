import React from 'react';
import OptionSelectOneRow from "./OptionSelectOneRow";
import OptionSelectRow from "./OptionSelectRow";
import OptionSelectManyRow from "./OptionSelectManyRow";

export default class SelectOneOptionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                {id: 1, optionName: 'Option 1'},
                {id: 2, optionName: 'Option 2'},
            ],
            activeID: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.createOptionRow = this.createOptionRow.bind(this);
    }

    handleClick(id) {
        console.log(id);
        this.setState({
            activeID: id
        });
    }

    createOptionRow(rowInfo){
        return (
            <div key={rowInfo.id} onClick={this.handleClick.bind(this, rowInfo.id)}>
                <OptionSelectOneRow optionName={rowInfo.optionName}/>
            </div>
        )
    }

    render() {
        return (
            <div className="selector-options-content">
                {this.state.components.map(this.createOptionRow)}
                <OptionSelectOneRow optionName="Option 1"/>
                <OptionSelectOneRow optionName="Option 2"/>
                <OptionSelectManyRow optionName="Option 3" optionAmount="4"/>
            </div>
        )
    }
}