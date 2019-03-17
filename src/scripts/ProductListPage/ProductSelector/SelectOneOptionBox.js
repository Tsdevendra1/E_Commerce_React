import React from 'react';
import ReactDOM from "react-dom";
import OptionSelectOneRow from "./OptionSelectOneRow";
import OptionSelectRow from "./OptionSelectRow";
import OptionSelectManyRow from "./OptionSelectManyRow";

export default class SelectOneOptionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components:[
                        {id: 1, optionName: 'Option 1', optionAmount: 10},
                        {id: 2, optionName: 'Option 2', optionAmount: 99},
                    ],
            activeID: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.createOptionRow = this.createOptionRow.bind(this);
    }

    componentDidUpdate(){
        let currentBox = ReactDOM.findDOMNode(this);
        let currentActiveElements = currentBox.getElementsByClassName('option-box-active');
        for (let element of currentActiveElements){
            let currentElementId = parseInt(element.parentElement.getAttribute('data-id'));
            if (this.state.activeID !== currentElementId){
                let activeCircle = element.querySelector('.fa-circle');
                element.classList.remove('option-box-active');
                activeCircle.classList.remove('fas');
                activeCircle.classList.add('far');
            }
        }
    }

    handleClick(id) {
        this.setState({
            activeID: id
        });
    }

    createOptionRow(rowInfo) {
        return (
            <div data-id={rowInfo.id} key={rowInfo.id} onClick={this.handleClick.bind(this, rowInfo.id)}>
                <OptionSelectOneRow paramType={rowInfo.paramType} paramValue={rowInfo.paramValue} optionName={rowInfo.optionName}/>
            </div>
        )
    }

    render() {
        return (
            <div className="selector-options-content">
                {this.props.selectorOptions.map(this.createOptionRow)}
                {/*{this.state.components.map(this.createOptionRow)}*/}
            </div>
        )
    }
}