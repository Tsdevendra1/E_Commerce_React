import React from 'react';
import OptionSelector from "./OptionSelector";
import SelectOneOptionBox from "./SelectOneOptionBox";

export default class ProductSelectorBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                {id: 1, type: 'Sort', selectorOptions: {}, customComponent:<SelectOneOptionBox/>},
                {id: 2, type: 'Category', selectorOptions: {}, customComponent: null},
            ],
            activeID: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.createOptionSelect = this.createOptionSelect.bind(this);
    }


    handleClick(id) {
        this.setState({
            activeID: id
        });
    }

    createOptionSelect(selectorInfo) {
        if (selectorInfo.customComponent) {
            return (
                <div key={selectorInfo.id}>
                    <OptionSelector
                        handleClick={this.handleClick}
                        componentId={selectorInfo.id}
                        currentActiveComponentId={this.state.activeID}
                        selectorType={selectorInfo.type} selectorOptions={selectorInfo.selectorOptions}>{selectorInfo.customComponent}</OptionSelector>
                </div>
            )
        } else {
            return (
                <div key={selectorInfo.id}>
                    <OptionSelector
                        handleClick={this.handleClick}
                        componentId={selectorInfo.id}
                        currentActiveComponentId={this.state.activeID}
                        selectorType={selectorInfo.type} selectorOptions={selectorInfo.selectorOptions}/>
                </div>
            )
        }
    }


    render() {
        return (
            <div className="product-selector">
                <div className="product-selector-content">
                    {this.state.components.map(this.createOptionSelect)}
                </div>
            </div>
        )
    }
}