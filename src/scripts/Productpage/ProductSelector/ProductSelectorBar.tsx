import * as React from 'react';
import OptionSelector from "./OptionSelector";
import SelectOneOptionBox from "./SelectOneOptionBox";
import SelectManyOptionBox from "./SelectManyOptionBox";

interface State {
    activeID: boolean | null;
}

interface selectOptions {
    id: number;
    optionName: string;
    paramType: string;
    paramValue: string;
    optionAmount?:number;
}

interface componentInfo {
    id: number;
    type: string;
    selectorOptions: Array<selectOptions>;
    customComponent: React.ReactElement<any>;
}


export default class ProductSelectorBar extends React.Component<{}, State> {
    readonly components: Array<componentInfo> = [
        {
            id: 1, type: 'Sort', selectorOptions: [
                {id: 1, optionName: 'High to low', paramType: 'ordering', paramValue:'price'},
                {id: 2, optionName: 'Low to high', paramType: 'ordering' ,paramValue:'-price'},
            ], customComponent: <SelectOneOptionBox/>,
        },
        {
            id: 2, type: 'Category', selectorOptions: [
                {id: 1, optionName: 'Tops', optionAmount: 10, paramType: 'product_type', paramValue:'Top'},
                {id: 2, optionName: 'Bottom', optionAmount: 99, paramType: 'product_type', paramValue:'Bottom'},
            ], customComponent: <SelectManyOptionBox/>
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
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
                        selectorType={selectorInfo.type}
                        selectorOptions={selectorInfo.selectorOptions}>{selectorInfo.customComponent}</OptionSelector>
                </div>
            )
        } else {
            throw 'Option select must specify custom component'
        }
    }


    render() {
        return (
            <div className="product-selector">
                <div className="product-selector-content">
                    {this.components.map(this.createOptionSelect)}
                </div>
            </div>
        )
    }
}